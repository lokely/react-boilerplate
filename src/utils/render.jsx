import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import App from '../App';
import matchUrl from './matchUrl';

const viewPort = 'width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0';
const render = (component, data) => (
  `<!DOCTYPE><html>
  <head>
    <title>${(data.meta.title || '').replace(/\{[^}]+?\}/g, '').slice(0, 72)}${data.meta.title.lenght > 72 ? '...' : ''}</title>
    <meta charset="utf-8" />
    <meta name="description" content="${data.meta.description}" />
    <meta name="twitter:card" value="${data.meta.socialText}" />
    <meta name="twitter:image" content="${data.meta.image}" />
    <meta property="fb:page_id" content="361089737403816" />
    <meta property="og:title" content="${data.meta.title}" />
    <meta property="og:image" content="${data.meta.image}" />
    ${
  data.meta.imageHeight ?
    `<meta property="og:image:height" content="${data.meta.imageHeight}" />\n` : ''
  }${
    data.meta.imageWidth ?
      `<meta property="og:image:width" content="${data.meta.imageWidth}" />\n` : ''
  }<meta property="og:url" content="https://lokely.co${data.session.url}" />
    <meta property="og:description" content="${data.meta.description}" />
    <meta name="viewport" content="${viewPort}" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="shortcut icon" type="image/x-icon" href="/images/favicon.ico" />
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
      const preload = match.meta.preload && await match.meta.preload(match);
      const pageData = Object.assign(
        {},
        match,
        preload
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
