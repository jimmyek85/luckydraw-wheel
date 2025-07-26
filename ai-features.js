// AI Features Module - Enhanced Gemini AI Integration
// 增强的 Gemini AI 集成模块

class GeminiAI {
    constructor() {
        this.isInitialized = false;
        this.retryCount = 0;
        
        // 安全地初始化配置对象
        this.config = window.API_CONFIG || {
            ENABLE_AI_FEATURES: false,
            GEMINI_API_KEY: '',
            GEMINI_API_URL: '',
            GEMINI_API_URL_FALLBACK: ''
        };
        
        this.aiFeatures = window.AI_FEATURES || {
            BEER_RECOMMENDATION: false,
            PERSONALIZED_MESSAGES: false,
            CREATIVE_IDEAS: false,
            USER_ANALYTICS: false
        };
        
        this.requestConfig = window.REQUEST_CONFIG || {};
        
        // 设置默认值
        this.maxRetries = this.requestConfig.MAX_RETRIES || 3;
        this.retryDelay = this.requestConfig.RETRY_DELAY || 1000;
        this.timeout = this.requestConfig.TIMEOUT || 10000;
        
        // 知识库内容
        this.knowledgeBase = `
1602 Craft Beer 是马来西亚领先的精酿啤酒品牌，致力于为客户提供高品质的啤酒体验。

我们的产品线包括：
- Pale Ale: 清爽果香，适合初次尝试精酿啤酒的用户
- Extra Dark: 浓郁麦香，口感丰富，适合喜欢浓烈口味的用户  
- Lager: 经典原味，清爽易饮，适合大众口味

当前活动：1602 幸运轮盘抽奖
- 用户可以通过注册获得免费抽奖机会
- 奖品包括：现金券、线上代金券、免费啤酒、纪念品等
- 鼓励用户分享活动可获得额外奖励

品牌理念：与你相遇是缘分，扫码送礼结情分
官网：1602craftbeer.com
`;
    }

    // 初始化 AI 功能
    async initialize() {
        if (!this.config.ENABLE_AI_FEATURES) {
            console.log('AI features are disabled in configuration');
            return false;
        }

        if (!this.config.GEMINI_API_KEY || this.config.GEMINI_API_KEY === "your-gemini-api-key-here") {
            console.warn('Gemini API key not configured');
            return false;
        }

        try {
            // 测试 API 连接
            await this.testConnection();
            this.isInitialized = true;
            console.log('Gemini AI initialized successfully');
            return true;
        } catch (error) {
            console.error('Failed to initialize Gemini AI:', error);
            return false;
        }
    }

    // 测试 API 连接
    async testConnection() {
        const testPrompt = "Hello, please respond with 'OK' if you can hear me.";
        const response = await this.callGemini(testPrompt);
        if (!response || response.includes('error') || response.includes('Error')) {
            throw new Error('API connection test failed');
        }
        return true;
    }

    // 核心 Gemini API 调用方法
    async callGemini(prompt, options = {}) {
        if (!this.isInitialized && !await this.initialize()) {
            return this.getFallbackResponse(prompt, options.language || 'en');
        }

        const {
            language = 'en',
            maxTokens = 1000,
            temperature = 0.7,
            useKnowledgeBase = true
        } = options;

        // 构建完整的提示词
        let fullPrompt = prompt;
        if (useKnowledgeBase) {
            fullPrompt = `${this.knowledgeBase}\n\n---\n\n${prompt}`;
        }

        const payload = {
            contents: [{
                role: "user",
                parts: [{ text: fullPrompt }]
            }],
            generationConfig: {
                temperature: temperature,
                maxOutputTokens: maxTokens,
                topP: 0.8,
                topK: 40
            }
        };

        return await this.makeRequest(payload, language);
    }

    // 发送请求到 Gemini API
    async makeRequest(payload, language = 'en') {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);

        try {
            const apiUrl = `${this.config.GEMINI_API_URL}?key=${this.config.GEMINI_API_KEY}`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                return await this.handleApiError(response, language, payload);
            }

            const result = await response.json();
            this.retryCount = 0; // 重置重试计数

            return result.candidates?.[0]?.content?.parts?.[0]?.text || 
                   this.getFallbackResponse('', language);

        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error.name === 'AbortError') {
                console.error('Request timeout');
                return language === 'zh' ? 
                    'AI 响应超时，请稍后再试。' : 
                    'AI response timeout, please try again.';
            }

            console.error('Gemini API Error:', error);
            
            // 重试机制
            if (this.retryCount < this.maxRetries) {
                this.retryCount++;
                console.log(`Retrying request (${this.retryCount}/${this.maxRetries})...`);
                await this.delay(this.retryDelay);
                return await this.makeRequest(payload, language);
            }

            return this.getFallbackResponse('', language);
        }
    }

    // 处理 API 错误
    async handleApiError(response, language, payload) {
        const errorText = await response.text();
        console.error(`Gemini API Error: ${response.status} - ${errorText}`);

        switch (response.status) {
            case 403:
                return language === 'zh' ? 
                    'API 密钥无效或已过期，请检查配置。' : 
                    'API key is invalid or expired. Please check configuration.';
            
            case 429:
                // 尝试使用备用端点
                if (this.config.GEMINI_API_URL_FALLBACK && this.retryCount === 0) {
                    console.log('Rate limited, trying fallback endpoint...');
                    const fallbackUrl = `${this.config.GEMINI_API_URL_FALLBACK}?key=${this.config.GEMINI_API_KEY}`;
                    
                    try {
                        const fallbackResponse = await fetch(fallbackUrl, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(payload)
                        });
                        
                        if (fallbackResponse.ok) {
                            const result = await fallbackResponse.json();
                            return result.candidates?.[0]?.content?.parts?.[0]?.text || 
                                   this.getFallbackResponse('', language);
                        }
                    } catch (fallbackError) {
                        console.error('Fallback endpoint also failed:', fallbackError);
                    }
                }
                
                return language === 'zh' ? 
                    'API 调用次数已达上限，请稍后再试。' : 
                    'API rate limit exceeded. Please try again later.';
            
            case 400:
                return language === 'zh' ? 
                    'AI 请求格式错误，请稍后再试。' : 
                    'Invalid AI request format, please try again.';
            
            default:
                return language === 'zh' ? 
                    'AI 服务暂时不可用，请稍后再试。' : 
                    'AI service temporarily unavailable. Please try again later.';
        }
    }

    // 获取备用响应
    getFallbackResponse(prompt, language) {
        const fallbacks = {
            zh: [
                'AI 正在休息中，请稍后再试！',
                'AI 助手暂时不可用，但您的抽奖依然有效！',
                '感谢您的参与，AI 功能将很快恢复！'
            ],
            en: [
                'Our AI is taking a break, please try again later!',
                'AI assistant is temporarily unavailable, but your lottery is still valid!',
                'Thank you for participating, AI features will be back soon!'
            ]
        };
        
        const messages = fallbacks[language] || fallbacks.en;
        return messages[Math.floor(Math.random() * messages.length)];
    }

    // 延迟函数
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // 啤酒推荐功能
    async getBeerRecommendation(flavorPreference, language = 'en') {
        if (!this.aiFeatures.BEER_RECOMMENDATION) {
            return this.getFallbackResponse('beer', language);
        }

        const prompt = language === 'zh' ? 
            `作为1602精酿啤酒的专业品鉴师，用户选择了"${flavorPreference}"口味偏好。请为用户推荐最适合的1602啤酒产品，并详细介绍其特点、口感和最佳饮用场景。请用中文回答，语气要专业但友好。` :
            `As a professional beer sommelier for 1602 Craft Beer, the user has chosen "${flavorPreference}" flavor preference. Please recommend the most suitable 1602 beer product and describe its characteristics, taste profile, and best drinking scenarios. Please respond in English with a professional but friendly tone.`;

        return await this.callGemini(prompt, { 
            language, 
            temperature: 0.8,
            maxTokens: 500 
        });
    }

    // 个性化中奖消息
    async getPersonalizedWinMessage(prize, userName, language = 'en') {
        if (!this.aiFeatures.PERSONALIZED_MESSAGES) {
            return this.getFallbackResponse('win', language);
        }

        const prompt = language === 'zh' ? 
            `用户${userName}在1602幸运轮盘中抽中了"${prize}"。请写一段个性化的祝贺消息，要求：1. 恭喜用户 2. 鼓励分享给朋友获得额外RM2现金券 3. 暗示1602即将推出新产品，参与活动可能获得优先体验机会。语气要热情友好，用中文回答。` :
            `User ${userName} won "${prize}" in the 1602 Lucky Draw. Please write a personalized congratulatory message that: 1. Congratulates the user 2. Encourages sharing with friends to get an extra RM2 cash voucher 3. Hints that 1602 is launching new products soon and participating might give early access. Use an enthusiastic and friendly tone in English.`;

        return await this.callGemini(prompt, { 
            language, 
            temperature: 0.9,
            maxTokens: 300 
        });
    }

    // 创意建议功能
    async getCreativeSuggestion(language = 'en') {
        if (!this.aiFeatures.CREATIVE_IDEAS) {
            return this.getFallbackResponse('idea', language);
        }

        const prompt = `You are a cheerful AI assistant for '1602'. A user didn't win. To cheer them up, give a fun, short, creative suggestion. IMPORTANTLY, you must also tell them they can get another chance by spending RM60, and that big prizes are still waiting to be won. Language: ${language === 'zh' ? 'Chinese' : 'English'}.`;
        
        try {
            return await this.callGemini(prompt, { 
                language, 
                temperature: 1.0,
                maxTokens: 400 
            });
        } catch (error) {
            console.error('Creative suggestion error:', error);
            return this.getFallbackResponse('idea', language);
        }
    }

    // 用户数据分析（管理面板用）
    async analyzeUserData(userData, language = 'en') {
        if (!this.aiFeatures.USER_ANALYTICS) {
            return this.getFallbackResponse('analytics', language);
        }

        const prompt = language === 'zh' ? 
            `作为数据分析师，请分析以下1602幸运轮盘的用户数据并提供洞察：${JSON.stringify(userData)}。请提供：1. 用户参与模式分析 2. 奖品分布趋势 3. 营销建议 4. 用户留存策略。用中文回答。` :
            `As a data analyst, please analyze the following 1602 Lucky Draw user data and provide insights: ${JSON.stringify(userData)}. Please provide: 1. User participation pattern analysis 2. Prize distribution trends 3. Marketing recommendations 4. User retention strategies. Respond in English.`;

        return await this.callGemini(prompt, { 
            language, 
            temperature: 0.3,
            maxTokens: 800 
        });
    }

    // 获取配置状态
    getStatus() {
        return {
            initialized: this.isInitialized,
            apiConfigured: !!(this.config.GEMINI_API_KEY && this.config.GEMINI_API_KEY !== "your-gemini-api-key-here"),
            featuresEnabled: this.aiFeatures,
            retryCount: this.retryCount,
            maxRetries: this.maxRetries
        };
    }
}

// 创建全局 AI 实例
window.geminiAI = new GeminiAI();

// 兼容性函数 - 保持与现有代码的兼容性
async function callGemini(prompt, loadingElement, contentElement, language = 'en') {
    if (loadingElement) loadingElement.classList.remove('hidden');
    if (contentElement) contentElement.classList.add('hidden');

    try {
        const response = await window.geminiAI.callGemini(prompt, { language });
        return response;
    } catch (error) {
        console.error('AI call failed:', error);
        return window.geminiAI.getFallbackResponse(prompt, language);
    } finally {
        if (loadingElement) loadingElement.classList.add('hidden');
        if (contentElement) contentElement.classList.remove('hidden');
    }
}

// 导出功能
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GeminiAI, callGemini };
}