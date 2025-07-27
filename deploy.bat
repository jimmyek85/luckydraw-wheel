@echo off
echo ========================================
echo 1602 Lucky Draw Firebase 部署脚本
echo ========================================
echo.

echo 检查 Firebase CLI 是否已安装...
firebase --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Firebase CLI 未安装，正在安装...
    npm install -g firebase-tools
    if %errorlevel% neq 0 (
        echo 安装失败，请手动安装 Firebase CLI
        echo 运行: npm install -g firebase-tools
        pause
        exit /b 1
    )
)

echo Firebase CLI 已就绪
echo.

echo 登录到 Firebase...
firebase login
if %errorlevel% neq 0 (
    echo 登录失败，请重试
    pause
    exit /b 1
)

echo.
echo 初始化 Firebase 项目...
firebase init

echo.
echo 部署到 Firebase Hosting...
firebase deploy

echo.
echo ========================================
echo 部署完成！
echo ========================================
echo.
echo 您的应用现在可以通过以下链接访问：
echo 主页: https://your-project-id.web.app
echo 管理后台: https://your-project-id.web.app/admin.html
echo 数据可视化: https://your-project-id.web.app/dashboard.html
echo.
pause