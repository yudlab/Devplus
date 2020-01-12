@echo off
cd SERVER
start npm run start
cd ../UI
start npm run serve
start http://localhost:8080
exit