import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { AuthService } from 'Auth';
import { Layout, Main, Draftsim, CardCollection, Lost, Signup } from './Components'
import { darkTheme, lightTheme } from 'Themes'
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import 'fontsource-roboto';

class CustomRouter extends Component
{
    constructor(props)
    {
        super(props)
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

    componentDidUpdate(oldProps, oldState)
    {
        if (oldProps.routerRef !== this.props.routerRef)
        {
            this.setState({
                routerRef: this.props.routerRef
            })
        }
    }

    isLoggedIn = (e) => {
        const userData = AuthService.getCurrentUserData()
        if (userData)
            this.setUserData(userData)
        
        return userData
    }

    setUserData = ( (data) => {
        this.setState({
            userData: data,
        })
        // console.log('set user data:', data) //DEBUG
    })
    
    setActiveTab = ( (tabName) => {
        this.setState({
            activeTab: tabName,
        })
    })

    setTheme = ( (themeType) => (
        this.setState({
            themeType: themeType,
            theme: themeType === 'light' ? lightTheme : darkTheme,
        })
    ))

    render()
    {
        const passedProps = {
            routerRef: this.state.routerRef,
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
            { path: '/',
              Component: Main },
            { path: '/main',
              to: '/',
              Component: Redirect },
            { path: '/draftsim',
              Component: Draftsim },
            { path: '/collection',
              Component: CardCollection },
            { path: '/signup',
              Component: Signup },
            { path: '/lost',
              Component: Lost },
        ]

        return (
            <ThemeProvider theme={this.state.theme}>
                <Router>
                    <Layout { ...passedProps } >
                        <Switch>
                            { routes.map((item, i) => (
                                <Route exact
                                    key = {i}
                                    path = {item.path}
                                    render = {
                                        () => <item.Component {...item.to} {...passedProps} />
                                    }
                                />
                            )) }
                            <Redirect to='/lost' /> {/* all else will be sent to '/lost' */}
                        </Switch>
                    </Layout>
                </Router>
            </ThemeProvider>
        )
    }
}

class RouterDummy extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            routerRef: null,
        }
    }

    componentDidMount()
    {
        this.setState({
            routerRef: this.routerRef.current,
        })
    }

    routerRef = React.createRef()
    render()
    {    
        return(
            <CustomRouter forwardRef={true} ref={this.routerRef} routerRef={this.state.routerRef} />
        )
    }
}

ReactDOM.render(
    (
        <div>
            <CssBaseline />
            <RouterDummy />
        </div>
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