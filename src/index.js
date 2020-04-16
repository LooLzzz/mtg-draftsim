import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Main, Header, Footer } from './Components/'
// import { Dashboard } from './Components/'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  (
    <React.StrictMode>
      {/* <Dashboard />*/}

      <Header className="header" />
      <Main className="main" />
      <Footer className="footer" />
    </React.StrictMode>
  ), document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
