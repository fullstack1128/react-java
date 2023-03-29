pm2 delete RB_WEB

rm -rf C:/deployment/app/gdlog_web

cp -rf . C:/deployment/app/gdlog_web
cd C:/deployment/app/gdlog_web

npm install

cp -rf env.test.js app/

npm run build

mkdir -p C:/deployment/app/gdlog_web_build

cp -rf build/* C:/deployment/app/gdlog_web_build

cd C:/deployment/app/gdlog_web_build
