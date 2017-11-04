import 'babel-polyfill';
import Koa from 'koa';
import Router from 'koa-router';
import fs from 'fs';
import path from 'path';
import serve from 'koa-static';
import { logger } from './utils/logger';
import { renderPage } from './utils/render';

const app = new Koa();
const router = new Router();
app.use(serve('./static', { gzip: process.env.ENV !== 'local' }));
app.use(logger());

router.get('/api/portfolio', async (ctx) => {
  const files = fs.readdirSync(path.join(__dirname, '../static/img/portfolio'));
  ctx.body = {
    files: files.filter(name => name !== '.DS_Store')
  };
  ctx.status = 200;
});

router.get('*', async (ctx, next) => {
  if (ctx.url === '/api/portfolio') {
    return;
  }
  const start = Date.now();
  const { html, status } = await renderPage(ctx);
  ctx.status = status;
  ctx.body = `${html} <!-- ${Date.now() - start}ms to render using koa -->`;
  next();
});

app.use(router.routes());
app.listen(3000);
