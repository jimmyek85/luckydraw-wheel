// API Configuration
// 请在这里设置您的 Gemini API 密钥
// 您可以从 Google AI Studio 获取免费的 API 密钥: https://aistudio.google.com/app/apikey

const API_CONFIG = {
    // 请将 'YOUR_GEMINI_API_KEY_HERE' 替换为您的实际 API 密钥
    GEMINI_API_KEY: 'AIzaSyDEpz7tsqqZ6-9YBXUovTczOfrm5ny7rbk',
    
    // Gemini API 端点
    GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    
    // 是否启用 AI 功能（如果没有 API 密钥，可以设置为 false）
    ENABLE_AI_FEATURES: true
};

// 检查 API 密钥是否已设置
function isApiKeyConfigured() {
    return API_CONFIG.GEMINI_API_KEY && 
           API_CONFIG.GEMINI_API_KEY !== 'AIzaSyDEpz7tsqqZ6-9YBXUovTczOfrm5ny7rbk' && 
           API_CONFIG.GEMINI_API_KEY.trim() !== '';
}

// 导出配置（用于模块化）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { API_CONFIG, isApiKeyConfigured };
}