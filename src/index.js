import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css'
import { Main, Layout } from './Components'
// import { Dashboard } from './Components/'
import * as serviceWorker from './serviceWorker';
import { CssBaseline } from '@material-ui/core';


ReactDOM.render(
    (
        <div>
            <CssBaseline />

            <Layout title="mtg-draftsim">
                <Main setId='iko' />
            </Layout>
        </div>
    )
    ,document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();