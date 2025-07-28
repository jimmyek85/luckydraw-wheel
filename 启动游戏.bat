@echo off
title 1602 幸运轮盘启动器
echo.
echo ========================================
echo           1602 幸运轮盘
echo        离线版启动器 v1.0
echo ========================================
echo.
echo 正在启动游戏...
echo.

REM 检查文件是否存在
if not exist "offline-index.html" (
    echo 错误：找不到 offline-index.html 文件！
    echo 请确保此批处理文件与 offline-index.html 在同一文件夹中。
    echo.
    pause
    exit /b 1
)

REM 尝试用默认浏览器打开
start "" "offline-index.html"

echo 游戏已在浏览器中启动！
echo.
echo 提示：
echo - 如果游戏没有自动打开，请手动双击 offline-index.html 文件
echo - 支持所有现代浏览器（Chrome、Firefox、Edge等）
echo - 完全离线运行，无需网络连接
echo.
echo 按任意键关闭此窗口...
pause >nul