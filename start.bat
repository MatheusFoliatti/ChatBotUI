@echo off
echo 🚀 Iniciando Backend...
start cmd /k "cd /d C:\PersonalProject\ChatBotUI && .\venv\Scripts\activate && python backend_example.py"

timeout /t 3

echo 🚀 Iniciando Frontend...
start cmd /k "cd /d C:\PersonalProject\ChatBotUI && npm start"

echo ✅ Ambos os servidores estão iniciando!
pause