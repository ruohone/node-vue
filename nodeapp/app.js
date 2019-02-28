'use strict';

const path = require('path');
const Koa = require('koa');
const logger = require('koa-logger');
const koaStatic = require('koa-static');
const body = require('koa-body');

const router = require('./router/index.js');

const app = new Koa();

// app.use(serve(path.join(__dirname, '../websrc/static')));

app.use(koaStatic(path.resolve('../websrc/dist'))); // 将 webpack 打包好的项目目录作为 Koa 静态文件服务的目录

app.use(body());
app.use(router);

app.use(logger());
app.listen(8083);
