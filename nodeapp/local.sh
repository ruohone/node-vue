cd ../websrc
node build/build.js
cd ../nodeapp
node app.js --port=8083 DEBUG=koa-views
