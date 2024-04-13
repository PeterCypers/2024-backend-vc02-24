// index.js
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => { // 👈 1 en 2
  ctx.body = 'Hello World';
  await next();
});

app.use(async (ctx, next) => { // 👈 3
  console.log(ctx);
  await next();
});

app.listen(9000);
