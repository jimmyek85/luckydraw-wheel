# Gemini Code Assist 项目上下文

## 项目概述
这是一个基于 HTML/JavaScript 的幸运轮盘抽奖系统，名为"1602 Lucky Draw"。项目使用 Firebase 作为后端服务，支持用户注册、抽奖功能和管理面板。

## 技术栈
- **前端**: HTML5, JavaScript (ES6+), CSS3
- **样式框架**: TailwindCSS (CDN)
- **后端服务**: Firebase (Firestore, Authentication)
- **动画库**: Canvas Confetti
- **字体**: Google Fonts (Poppins)

## 核心功能
1. **用户注册系统**: 支持姓名、电话、邮箱、地址信息收集
2. **幸运轮盘**: Canvas 绘制的可旋转轮盘，支持自定义奖品
3. **多语言支持**: 英文/中文切换
4. **管理面板**: 用户管理、活动公告、AI知识库配置
5. **AI集成**: 使用 Gemini API 提供智能推荐和总结功能

## 文件结构
```
luckydraw-wheel/
├── index.html          # 主页面 - 用户端抽奖界面
├── admin.html          # 管理面板
├── README.md           # 项目说明
├── SECURITY.md         # 安全说明
└── .gemini/           # Gemini Code Assist 配置
    ├── config.json     # 主配置文件
    └── context.md      # 项目上下文说明
```

## 代码特点
- 使用 ES6 模块化导入 Firebase SDK
- 响应式设计，支持移动端
- 使用 Canvas API 绘制轮盘动画
- 实现了完整的 CRUD 操作与 Firestore 集成
- 支持实时数据同步

## Firebase 配置
项目已配置 Firebase 项目 ID: `deductive-smile-408711`
- Firestore 集合: `users`, `settings`, `knowledge`
- 匿名认证和自定义令牌认证

## 开发注意事项
1. 所有 Firebase 操作都使用 v9 模块化 SDK
2. 使用 TailwindCSS 类进行样式设计
3. 支持国际化，文本内容通过 `data-lang-*` 属性管理
4. Canvas 动画使用 CSS transitions 和 JavaScript 控制

## AI 功能集成
- 啤酒推荐系统
- 用户数据智能总结
- 活动建议生成
- 知识库问答系统