import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout, Main, Draftsim, CardCollection } from './Components'
import { CssBaseline } from '@material-ui/core';
import 'fontsource-roboto';
import './index.css';
import './App.css'

class CustomRouter extends Component
{
    // const [title, setTitle ] = useState('mtg-draftsim')
    constructor(props)
    {
        super()
        this.state = {
            title: 'Main',
        }
    }

    /**
     * set active tab in title
     */
    setTitle = ( (newTitle) =>
    {
        this.setState({title: newTitle})
        return newTitle
    })
    
    render() {
        return (
        <Router>
            <Switch>
                <Layout
                    setTitle = { this.setTitle }
                    currentTab = { this.state.title }
                >
                    <Route exact
                        path = "/"
                        render = {
                            () => <Main setTitle={this.setTitle} />
                        }
                    />
                    <Route
                        path = "/main"
                        render = {
                            () => <Main setTitle={this.setTitle} />
                        }
                    />
                    <Route
                        path = "/draftsim"
                        render = {
                            () => <Draftsim setTitle={this.setTitle} />
                        }
                    />
                    <Route
                        path = "/collection"
                        render = {
                            () => <CardCollection setTitle={this.setTitle} />
                        }
                    />
                </Layout>
            </Switch>
        </Router>
    )}
}

ReactDOM.render((
        <div>
            <CssBaseline />
            <CustomRouter />
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