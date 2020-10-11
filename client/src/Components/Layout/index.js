import React, { Component } from 'react';
import { AppBar, Grid, Tab, Tabs } from '@material-ui/core';
import { MenuPopper } from './Components'

import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import getStyles from './styles'

const useStyles = (theme) => getStyles(theme);

class Layout extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            ...props,
        }
    }
    
    componentDidUpdate(oldProps, oldState)
    {
        if (oldProps !== this.props)
        {
            this.setState({
                ...this.props
            })
            // console.log('updating layout') //DEBUG
        }
    }

    tabNameToIndex(name)
    {
        switch (name) {
            default:
                return false
                
            case 'main':
                return 0
            
            case 'draftsim':
                return 1
        
            case 'collection':
                return 2
        }
    }

    render()
    {
        const {classes, history} = this.props;
        const items = [
            {
                label: 'Main',
                url: '/',
            },
            {
                label: 'Draftsim',
                url: '/draftsim',
            },
            {
                label: 'Collection',
                url: '/collection',
            },
        ]

        return (
            <div className={classes.root}>
                <AppBar className = {classes.appBar} >
                    <Grid container
                        style = {{
                            justifyContent: 'space-between',
                        }}
                    >
                        <Grid item xs = {9}>
                            <Tabs
                                // ref = {(r) => this.tabsRef=r}
                                value = { this.tabNameToIndex(this.state.activeTab) }
                            >
                                {
                                    items.map((item, i) => (
                                        <Tab
                                            key = { i }
                                            label = { item.label }
                                            onClick = { () => history.push(item.url) }
                                        />
                                    ))
                                }
                            </Tabs>
                        </Grid>
                        <Grid item>
                            <MenuPopper
                                {...this.props}
                            />
                        </Grid>
                    </Grid>
                </AppBar>
                <main className={classes.content} >
                    <div className={classes.contentSpacer} /> {/*top spacer*/}
                    { this.props.children }
                </main>
            </div>
        )
    }
}

export default withRouter(withStyles(useStyles)(Layout))