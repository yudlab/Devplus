@echo off
cd SERVER
start nodemon index.js
cd ../UI
start npm run serve
timeout>nul /t 10
start http://localhost:8080
exit