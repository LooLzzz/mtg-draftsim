import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout, Main, Draftsim, CardCollection } from './Components'
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { darkTheme, lightTheme } from 'Themes'
import 'fontsource-roboto';
import './index.css';
import './App.css'

class CustomRouter extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            activeTab: 'Main',
            activeThemeType: 'dark',
            theme: darkTheme,
        }
    }

    /**
     * set active tab in title
     * @param tabName ['main' or '', 'draftsim', 'collection']
     */
    setActiveTab = ( (tabName) => (
        this.setState({activeTab: tabName})
    ))

    /**
     * set new theme for the application.
     * options are 'light' or 'dark'
     * @param newTheme ['light', 'dark']
     */
    setTheme = ( (themeType) => (
        this.setState({
            activeThemeType: themeType,
            theme: themeType === 'light' ? lightTheme : darkTheme,
        })
    ))

    render()
    {
        let passedProps = {
            activeTab: this.state.activeTab,
            setActiveTab: this.setActiveTab,
            activeThemeType: this.state.activeThemeType,
            setTheme: this.setTheme,
        }

        return (
            <ThemeProvider theme={this.state.theme}>
                <Router>
                    <Switch>
                        <Layout { ...passedProps } >
                            <Route exact
                                path = "/"
                                render = {
                                    () => <Main {...passedProps} />
                                }
                            />
                            <Route
                                path = "/main"
                                render = {
                                    () => <Main {...passedProps} />
                                }
                            />
                            <Route
                                path = "/draftsim"
                                render = {
                                    () => <Draftsim {...passedProps} />
                                }
                            />
                            <Route
                                path = "/collection"
                                render = {
                                    () => <CardCollection {...passedProps} />
                                }
                            />
                        </Layout>
                    </Switch>
                </Router>
            </ThemeProvider>
        )
    }
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