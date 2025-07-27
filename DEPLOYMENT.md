# 1602 Lucky Draw - Firebase 部署指南

## 🚀 快速部署

### 前提条件
- Node.js (版本 14 或更高)
- npm 或 yarn
- Firebase 账户

### 自动部署 (推荐)
1. 双击运行 `deploy.bat` 文件
2. 按照提示完成 Firebase 登录和项目配置
3. 等待部署完成

### 手动部署步骤

#### 1. 安装 Firebase CLI
```bash
npm install -g firebase-tools
```

#### 2. 登录 Firebase
```bash
firebase login
```

#### 3. 初始化项目
```bash
firebase init
```
选择以下选项：
- ✅ Firestore: Configure security rules and indexes files
- ✅ Hosting: Configure files for Firebase Hosting

配置选项：
- Firestore Rules: 使用现有的 `firestore.rules`
- Firestore Indexes: 使用现有的 `firestore.indexes.json`
- Public Directory: 选择当前目录 (.)
- Single Page App: Yes
- GitHub Auto-Deploy: No (可选)

#### 4. 部署应用
```bash
firebase deploy
```

## 📊 应用访问地址

部署完成后，您可以通过以下地址访问：

- **主应用**: `https://your-project-id.web.app/`
- **管理后台**: `https://your-project-id.web.app/admin.html`
- **数据可视化**: `https://your-project-id.web.app/dashboard.html`

## 🔧 配置说明

### Firebase 配置
应用已配置使用以下 Firebase 项目：
- Project ID: `deductive-smile-408711`
- 如需更改，请修改 `index.html`、`admin.html` 和 `dashboard.html` 中的 `firebaseConfig`

### 安全规则
- Firestore 规则已配置为允许匿名访问
- 生产环境建议加强安全规则

### 功能特性
- ✅ 轮盘抽奖功能
- ✅ 用户注册管理
- ✅ 奖品管理
- ✅ AI 啤酒推荐
- ✅ 实时数据可视化
- ✅ 管理后台
- ✅ 多语言支持 (中文/英文)

## 📱 移动端优化
- 响应式设计，支持手机和平板
- PWA 支持 (可添加到主屏幕)
- 触摸友好的界面

## 🔍 监控和分析

### 数据可视化仪表板
访问 `/dashboard.html` 查看：
- 实时用户统计
- 抽奖活动趋势
- 奖品分布分析
- 24小时活动热力图
- 最新用户活动

### Firebase Analytics
可在 Firebase 控制台查看详细分析数据

## 🛠️ 本地开发

### 启动本地服务器
```bash
firebase serve
```
或
```bash
npm start
```

访问: `http://localhost:5000`

### 文件结构
```
├── index.html          # 主应用页面
├── admin.html          # 管理后台
├── dashboard.html      # 数据可视化
├── firebase.json       # Firebase 配置
├── firestore.rules     # 数据库安全规则
├── firestore.indexes.json # 数据库索引
├── package.json        # 项目配置
└── deploy.bat         # 部署脚本
```

## 🔒 安全注意事项

1. **生产环境安全规则**: 当前配置允许匿名访问，生产环境请加强安全规则
2. **API 密钥**: Firebase 配置中的 API 密钥是公开的，这是正常的
3. **管理后台**: 建议为管理后台添加身份验证

## 📞 技术支持

如遇到部署问题，请检查：
1. Firebase CLI 版本是否最新
2. 网络连接是否正常
3. Firebase 项目权限是否正确

## 🎯 下一步优化建议

1. 添加用户身份验证
2. 实现推送通知
3. 添加数据导出功能
4. 集成支付系统
5. 添加更多数据分析功能