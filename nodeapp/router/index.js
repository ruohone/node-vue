'use strict';
const Router = require('koa-66');
const router = new Router();

router.post('/test', async (ctx, next) => {
    console.log(ctx.request.body.t1);
    ctx.body = {
        name: 'hho'
    };
    await next();
});

module.exports = router.routes();
