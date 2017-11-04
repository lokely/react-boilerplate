import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app';

const state = window.INITIAL_STATE;
delete window.INITIAL_STATE;

ReactDOM.render(
  <App router={Router} {...state} />,
  /*global document*/
  document.getElementById('root'),
);
