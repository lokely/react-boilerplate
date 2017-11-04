import 'babel-polyfill';
import Koa from 'koa';
import serve from 'koa-static';
import { logger } from './utils/logger';
import { renderPage } from './utils/render';

const app = new Koa();
app.use(serve('./static', { gzip: process.env.ENV !== 'local' }));
app.use(logger());

app.use(async (ctx, next) => {
  const start = Date.now();
  const { html } = await renderPage(ctx);
  ctx.body = `${html} <!-- ${Date.now() - start}ms to render using koa -->`;
  next();
});

app.listen(3000);
