import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../app';
import matchUrl from './matchUrl';

const viewPort = 'width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0';
const render = (component, data) => (
  `<!DOCTYPE html>
<html>
  <head>
    <title>${(data.title || '').replace(/\{[^}]+?\}/g, '').slice(0, 72)}${data.title.lenght > 72 ? '...' : ''}</title>
    <meta charset="utf-8" />
    <meta name="description" content="${data.description}" />
    <meta name="twitter:card" value="${data.socialText}" />
    <meta name="twitter:image" content="${data.image}" />
    <meta property="og:title" content="${data.title}" />
    <meta property="og:image" content="${data.image}" />
    <meta property="og:description" content="${data.description}" />
    <meta name="viewport" content="${viewPort}" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
    <link rel="stylesheet" href="${process.env.ENV === 'local' ? 'http://localhost:8080' : ''}/index.css" />
  </head>
  <body>
    <div id="root">${renderToStaticMarkup(component)}</div>
    <script>window.INITIAL_STATE = ${JSON.stringify(data)};</script>
    <script src="${process.env.ENV === 'local' ? 'http://localhost:8080' : ''}/bundle.js" async></script>
  </body>
</html>`
);

export const renderPage = async (ctx) => {
  try {
    const match = matchUrl(ctx.url);
    if (!match) {
      const initialState = {
        meta: {
          title: 'Page not found'
        }
      };
      return {
        status: 404,
        initialState,
        html: render(
          <App router={StaticRouter} location={ctx.url} statusCode={404} />,
          initialState
        )
      };
    } else {
      const preload = match.preload && await match.preload(match);
      const pageData = Object.assign(
        {},
        match,
        preload,
        { env: process.env.ENV || 'production' }
      );
      return {
        status: 200,
        initialState: pageData,
        html: render(
          <App router={StaticRouter} location={ctx.url} statusCode={200} {...pageData} />,
          pageData
        )
      };
    }
  } catch (e) {
    console.log('Error: ', e.message);
    const initialState = {
      meta: {
        title: 'Internal error'
      }
    };
    return {
      status: 500,
      initialState,
      html: render(
        <App router={StaticRouter} location={ctx.url} statusCode={500} error={e.message} />,
        initialState
      )
    }
  }
};
