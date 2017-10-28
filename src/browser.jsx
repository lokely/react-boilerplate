import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app';

ReactDOM.render(
  <App router={Router} />,
  /*global document*/
  document.getElementById('root'),
);
