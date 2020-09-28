import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './index.css';
import './App.css'
import { Layout, Main, DraftsimMain } from './Components'
import { CssBaseline } from '@material-ui/core';
import 'fontsource-roboto';
// import { Dashboard } from './Components/'
// import * as serviceWorker from './serviceWorker';

let txt = 'mtg-draftsim'

ReactDOM.render(
    (
        <div>
            <CssBaseline />

            <Router>
                <Switch>
                    <Layout text={txt}>
                        <Route exact
                            path = "/"
                            render = {
                                () => <Main />
                            }
                        />
                        <Route
                            path = "/draftsim"
                            render = {
                                () => <DraftsimMain />
                            }
                        />
                        {/* <Route path="/collection" component={MyCollection} parent={this} /> */}
                    </Layout>
                </Switch>
            </Router>
        </div>
    )
    ,document.getElementById('root')
);

/*
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */

// serviceWorker.unregister();
// serviceWorker.register();