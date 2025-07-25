# API 参考文档

## Firebase Firestore 集合结构

### users 集合
```javascript
{
  id: "auto-generated-id",
  name: "用户姓名",
  phone: "用户电话",
  email: "用户邮箱 (可选)",
  address: "用户地址 (可选)",
  chances: 1,                    // 剩余抽奖次数
  joinDate: "2024-01-01",        // 加入日期
  prizes: [                      // 获奖记录
    {
      prize: "奖品名称",
      date: "2024-01-01T10:00:00Z",
      claimed: false
    }
  ],
  countryCode: "+86"             // 国家代码
}
```

### settings 集合
```javascript
{
  announcement: {
    content: "公告内容",
    enabled: true,
    lastUpdated: "2024-01-01T10:00:00Z"
  },
  wheelConfig: {
    segments: [
      {
        text: "奖品1",
        color: "#FF6B6B",
        probability: 0.1
      }
    ]
  }
}
```

### knowledge 集合
```javascript
{
  content: "AI 知识库内容",
  lastUpdated: "2024-01-01T10:00:00Z",
  version: 1
}
```

## 常用 Firebase 操作

### 用户管理
```javascript
// 添加新用户
async function addUser(userData) {
  const docRef = await addDoc(collection(db, 'users'), {
    ...userData,
    joinDate: new Date().toISOString(),
    chances: 1,
    prizes: []
  });
  return docRef.id;
}

// 更新用户抽奖次数
async function updateUserChances(userId, increment) {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    chances: increment(increment)
  });
}

// 记录用户获奖
async function recordPrize(userId, prize) {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    prizes: arrayUnion({
      prize: prize,
      date: new Date().toISOString(),
      claimed: false
    })
  });
}
```

### 设置管理
```javascript
// 更新公告
async function updateAnnouncement(content) {
  const settingsRef = doc(db, 'settings', 'announcement');
  await setDoc(settingsRef, {
    content: content,
    enabled: content.trim() !== '',
    lastUpdated: new Date().toISOString()
  });
}

// 获取轮盘配置
async function getWheelConfig() {
  const configRef = doc(db, 'settings', 'wheelConfig');
  const configSnap = await getDoc(configRef);
  return configSnap.exists() ? configSnap.data() : getDefaultWheelConfig();
}
```

## Gemini API 集成

### 基础配置
```javascript
const GEMINI_API_KEY = 'your-api-key';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';

async function callGeminiAPI(prompt, context = '') {
  const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `${context}\n\n${prompt}`
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      }
    })
  });
  
  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}
```

### AI 功能实现
```javascript
// 生成啤酒推荐
async function generateBeerRecommendation(userPreferences) {
  const prompt = `基于用户偏好推荐1602啤酒产品: ${userPreferences}`;
  const context = await getKnowledgeBase();
  return await callGeminiAPI(prompt, context);
}

// 生成活动总结
async function generateEventSummary(userData) {
  const prompt = `分析以下用户数据并生成活动总结: ${JSON.stringify(userData)}`;
  return await callGeminiAPI(prompt);
}
```

## Canvas 轮盘 API

### 轮盘绘制
```javascript
class LuckyWheel {
  constructor(canvas, segments) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.segments = segments;
    this.currentAngle = 0;
  }
  
  draw() {
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    
    this.segments.forEach((segment, index) => {
      this.drawSegment(segment, index, centerX, centerY, radius);
    });
  }
  
  spin(duration = 5000) {
    const finalAngle = Math.random() * 360 + 1440; // 至少转4圈
    this.canvas.style.transform = `rotate(${finalAngle}deg)`;
    
    return new Promise(resolve => {
      setTimeout(() => {
        const winningIndex = this.getWinningSegment(finalAngle);
        resolve(this.segments[winningIndex]);
      }, duration);
    });
  }
}
```

## 多语言系统

### 语言切换
```javascript
const translations = {
  en: {
    'welcome': 'Welcome',
    'spin': 'SPIN',
    'chances-left': 'chances left'
  },
  zh: {
    'welcome': '欢迎',
    'spin': '开始抽奖',
    'chances-left': '次机会剩余'
  }
};

function switchLanguage(lang) {
  document.querySelectorAll('[data-lang-key]').forEach(element => {
    const key = element.getAttribute('data-lang-key');
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
}
```

## 错误处理

### 标准错误处理模式
```javascript
async function safeFirebaseOperation(operation) {
  try {
    return await operation();
  } catch (error) {
    console.error('Firebase operation failed:', error);
    
    if (error.code === 'permission-denied') {
      showError('权限不足，请联系管理员');
    } else if (error.code === 'unavailable') {
      showError('网络连接失败，请检查网络');
    } else {
      showError('操作失败，请重试');
    }
    
    throw error;
  }
}
```