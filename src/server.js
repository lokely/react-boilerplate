import 'babel-polyfill';
import Koa from 'koa';
import fs from 'fs';
import path from 'path';
import serve from 'koa-static';
import { logger } from './utils/logger';
import { renderPage } from './utils/render';

const app = new Koa();
app.use(serve('./static', { gzip: process.env.ENV !== 'local' }));
app.use(logger());

const IGNORE_FILES = ['.DS_Store'];

app.use(async (ctx, next) => {
  if (ctx.url === '/api/portfolio') {
    const files = fs.readdirSync(path.join(__dirname, '../static/img/portfolio'));
    ctx.status = 200;
    ctx.body = {
      images: files.filter(file => !IGNORE_FILES.includes(file))
    };
  }
  next();
});

app.use(async (ctx, next) => {
  const start = Date.now();
  const { html, status } = await renderPage(ctx);
  ctx.status = status;
  ctx.body = `${html} <!-- ${Date.now() - start}ms to render using koa -->`;
  next();
});

app.listen(3000);
