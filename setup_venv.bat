@echo off
REM =====================================================
REM Script para criar e configurar venv com Python 3.11
REM Projeto: ChatBotUI
REM =====================================================

echo.
echo ==========================================
echo  Criando ambiente virtual (Python 3.11)
echo ==========================================
echo.

REM Verifica se o Python 3.11 está disponível
py -3.11 --version >nul 2>&1
if errorlevel 1 (
    echo ERRO: Python 3.11 nao encontrado.
    echo Instale o Python 3.11 antes de continuar.
    pause
    exit /b
)

REM Cria o venv se nao existir
if not exist venv (
    py -3.11 -m venv venv
    echo Ambiente virtual criado com sucesso.
) else (
    echo Ambiente virtual ja existe.
)

echo.
echo ==========================================
echo  Ativando ambiente virtual
echo ==========================================
echo.

call venv\Scripts\activate

REM Atualiza o pip
echo.
echo Atualizando pip...
python -m pip install --upgrade pip

REM Instala dependencias
if exist requirements.txt (
    echo.
    echo Instalando dependencias...
    pip install -r requirements.txt
) else (
    echo.
    echo ATENCAO: requirements.txt nao encontrado.
)

echo.
echo ==========================================
echo  Ambiente configurado com sucesso!
echo ==========================================
echo.
echo Para ativar o venv novamente use:
echo venv\Scripts\activate
echo.

pause
