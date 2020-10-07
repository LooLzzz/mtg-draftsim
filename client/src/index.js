import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { Layout, Main, Draftsim, CardCollection, Lost, Signup } from './Components'
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { darkTheme, lightTheme } from 'Themes'
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

    componentDidUpdate(oldProps, oldState)
    {
        if (oldProps.routerRef !== this.props.routerRef)
        {
            this.setState({
                routerRef: this.props.routerRef
            })
        }
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
        let passedProps = {
            routerRef: this.state.routerRef,
            activeTab: this.state.activeTab,
            setActiveTab: this.setActiveTab,
            themeType: this.state.themeType,
            theme: this.state.theme,
            setTheme: this.setTheme,
            setUserData: this.setUserData,
            userData: this.state.userData
        }

        return (
            <ThemeProvider theme={this.state.theme}>
                <Router>
                    <Layout { ...passedProps } >
                        <Switch>
                            <Route exact
                                path = "/"
                                render = {
                                    () => <Main {...passedProps} />
                                }
                            />
                            <Route exact
                                path = "/draftsim"
                                render = {
                                    () => <Draftsim {...passedProps} />
                                }
                            />
                            <Route exact
                                path = "/collection"
                                render = {
                                    () => <CardCollection {...passedProps} />
                                }
                            />
                            <Route exact
                                path = "/collection"
                                render = {
                                    () => <CardCollection {...passedProps} />
                                }
                            />
                            <Route exact
                                path = '/signup'
                                render = {
                                    () => <Signup {...passedProps} />
                                }
                            />
                            <Route
                                path = '/lost'
                                render = {
                                    () => <Lost {...passedProps} />
                                }
                            />
                            <Redirect to='/lost' />
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