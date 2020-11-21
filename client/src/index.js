import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { Button, CssBaseline, ThemeProvider } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import { Layout, Main, Draftsim, CardCollection, Lost, Signup } from './Components'
import { UserService } from 'Auth';
import { darkTheme, lightTheme } from 'Themes'

import 'fontsource-roboto';

class CustomRouter extends Component
{
    constructor(props)
    {
        super(props)
    
        // CONSTS
        // this.routerRef = React.createRef()
        this.notistackRef = React.createRef()
        // CONSTS

        this.state = {
            activeTab: 'Main',
            themeType: 'dark',
            theme: darkTheme,
            userData: null,
        }
    }

    componentDidMount()
    {
        this.isLoggedIn()
    }

    isLoggedIn = async (e) =>
    {
        const userData = await UserService.getCurrentUserData()
        if (userData)
            this.setUserData(userData)
        
        return !!userData
    }

    setUserData = ( (data) =>
    {
        this.setState({
            userData: data,
        })
        // console.log('set user data:', data) //DEBUG
    })
    
    setActiveTab = ( (tabName) =>
    {
        this.setState({
            activeTab: tabName,
        })
    })

    setTheme = ( (themeType) => 
    {
        this.setState({
            themeType: themeType,
            theme: themeType === 'light' ? lightTheme : darkTheme,
        })
    })

    notistackDismissButton = (key) =>
    (
        <Button onClick={ e => this.notistackRef.current.closeSnackbar(key)} endIcon={<CloseIcon />}>
            Dismiss
        </Button>
    )

    render()
    {
        const passedProps = {
            activeTab: this.state.activeTab,
            setActiveTab: this.setActiveTab,
            themeType: this.state.themeType,
            theme: this.state.theme,
            setTheme: this.setTheme,
            setUserData: this.setUserData,
            userData: this.state.userData,
            isLoggedIn: this.isLoggedIn,
        }

        const routes = [
            { path: '/main',
              exact: true,
              Component: Main },
            { path: '/',
              to: '/main',
              exact: true},
            { path: '/draftsim',
              exact: true,
              Component: Draftsim },
            { path: '/collection',
              exact: false,
              Component: CardCollection },
            { path: '/signup',
              exact: true,
              Component: Signup },
            { path: '/lost',
              exact: true,
              Component: Lost },
            { path: '*',
              to: '/lost',
              exact: false},
        ]

        return (
            <>
                <Helmet>
                    <title>Draftsim</title>
                    <link href="//cdn.jsdelivr.net/npm/keyrune@latest/css/keyrune.css" rel="stylesheet" type="text/css" /> {/* keyrun */}
                    <link href="//cdn.jsdelivr.net/npm/mana-font@latest/css/mana.css" rel="stylesheet" type="text/css" /> {/* mana */}
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" /> {/* material-icons */}
                </Helmet>
                
                <ThemeProvider theme={this.state.theme}>
                    <CssBaseline />
                    <SnackbarProvider
                        ref = {this.notistackRef}
                        // onContextMenu = {this.handleSnackbarContextMenu.bind(this)}
                        autoHideDuration = {3250}
                        maxSnack = {3}
                        action = { key => this.notistackDismissButton(key) }
                    >
                        <Router /*ref={this.routerRef}*/ >
                            <Layout { ...passedProps } >
                                <Switch>
                                {
                                    routes.map((item, i) => (
                                        item.to
                                        ? <Redirect
                                            key = {i}
                                            exact = {item.exact}
                                            path = {item.path}
                                            to = {item.to}
                                        />
                                        : <Route
                                            key = {i}
                                            exact = {item.exact}
                                            path = {item.path}
                                            render = { () => 
                                                <item.Component {...passedProps} />
                                            }
                                        />
                                    ))
                                }

                                {/* <Redirect exact
                                    path = '/'
                                    to = '/main'
                                />
                                <Redirect
                                    path = '*'
                                    to = '/lost'
                                /> */}
                                </Switch>
                            </Layout>
                        </Router>
                    </SnackbarProvider>
                </ThemeProvider>
            </>
        )
    }
}

ReactDOM.render(
    (
        <CustomRouter />
    )
    ,document.getElementById('root')
)

/*
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */

// serviceWorker.unregister();
// serviceWorker.register();