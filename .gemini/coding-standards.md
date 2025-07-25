# 代码规范和最佳实践

## JavaScript 编码规范

### 1. 模块导入
```javascript
// 使用 ES6 模块化导入 Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
```

### 2. 异步操作
```javascript
// 使用 async/await 处理异步操作
async function loadUsers() {
    try {
        const querySnapshot = await getDocs(usersCollection);
        // 处理数据
    } catch (error) {
        console.error('Error loading users:', error);
    }
}
```

### 3. DOM 操作
```javascript
// 使用现代 DOM API
const element = document.getElementById('element-id');
element.addEventListener('click', handleClick);
```

### 4. 错误处理
```javascript
// 总是包含错误处理
try {
    await firebaseOperation();
} catch (error) {
    console.error('Firebase operation failed:', error);
    showErrorMessage('操作失败，请重试');
}
```

## HTML 结构规范

### 1. 语义化标签
```html
<main class="container">
    <section class="wheel-section">
        <header class="section-header">
            <h2>幸运轮盘</h2>
        </header>
    </section>
</main>
```

### 2. 响应式设计
```html
<div class="w-full max-w-md mx-auto sm:max-w-lg lg:max-w-xl">
    <!-- 内容 -->
</div>
```

### 3. 多语言支持
```html
<span data-lang-en="English Text" data-lang-zh="中文文本">English Text</span>
```

## CSS/TailwindCSS 规范

### 1. 响应式类
```html
<div class="text-sm sm:text-base lg:text-lg">
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
```

### 2. 状态类
```html
<button class="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400">
```

### 3. 自定义动画
```css
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
```

## Firebase 操作规范

### 1. 数据读取
```javascript
const docRef = doc(db, 'users', userId);
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
    const userData = docSnap.data();
}
```

### 2. 数据写入
```javascript
await setDoc(doc(db, 'users', userId), {
    name: userName,
    phone: userPhone,
    createdAt: new Date().toISOString()
});
```

### 3. 实时监听
```javascript
const unsubscribe = onSnapshot(usersCollection, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
            // 处理新增数据
        }
    });
});
```

## 项目特定规范

### 1. 轮盘绘制
```javascript
function drawWheel(canvas, segments) {
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    
    // 绘制逻辑
}
```

### 2. 多语言切换
```javascript
function switchLanguage(lang) {
    document.querySelectorAll('[data-lang-en]').forEach(element => {
        element.textContent = element.getAttribute(`data-lang-${lang}`);
    });
}
```

### 3. 模态框管理
```javascript
function showModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
}

function hideModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}
```