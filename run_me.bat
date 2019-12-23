@echo off
cd SERVER
start npm run start
cd ../UI
start npm run serve
exit