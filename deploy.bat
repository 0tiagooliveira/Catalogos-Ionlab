@echo off
echo ===================================================
echo   ATUALIZACAO AUTOMATICA: GITHUB E SITE (FIREBASE)
echo ===================================================
echo.

echo 1. Enviando alteracoes para o GitHub...
call git add .
call git commit -m "Atualizacao do catalogo"
call git push
echo.

echo 2. Construindo o projeto (npm run build)...
call npm run build
if %errorlevel% neq 0 (
    echo Erro ao fazer o build. Verifique seu codigo.
    pause
    exit /b %errorlevel%
)
echo Build concluido com sucesso!
echo.

echo 3. Fazendo o deploy (npx firebase deploy)...
REM O Firebase ja mantem a conta salva, nao precisa relogar!
call npx firebase deploy
if %errorlevel% neq 0 (
    echo.
    echo Erro no Deploy! Verifique o console acima.
    pause
    exit /b %errorlevel%
)

echo.
echo ===================================================
echo   TUDO CONCLUIDO COM SUCESSO! (GITHUB E SITE)
echo ===================================================
pause
