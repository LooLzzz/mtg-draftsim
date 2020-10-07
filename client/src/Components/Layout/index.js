import React, { Component } from 'react';
import { AppBar, Grid, Tab, Tabs } from '@material-ui/core';
import MenuPopper from './MenuPopper'

import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import getStyles from './styles'

const useStyles = (theme) => getStyles(theme);

class Layout extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {...props}

        // console.log('props', props) //DEBUG
    }
    
    componentDidUpdate(oldProps, oldState)
    {
        if (oldProps !== this.props)
            this.setState({
                ...this.props
            })
    }

    tabNameToIndex(name)
    {
        switch (name) {
            default: //defaults to Main
                return 0;
            
            case 'draftsim':
                return 1;
        
            case 'collection':
                return 2;
        }
    }

    handleTabClick(url)
    {
        this.props.setActiveTab(url)
        this.props.history.push('/'+url)
    }

    usernameFieldRef = React.createRef()

    render()
    {
        const {classes} = this.props;
        const items = [
            {
                label: 'Main',
                url: '',
            },
            {
                label: 'Draftsim',
                url: 'draftsim',
            },
            {
                label: 'Collection',
                url: 'collection',
            },
        ]
        const menuProps = {
            ...this.props,
        }

        return (
            <div className={classes.root}>
                <AppBar className = {classes.appBar} >
                    <Grid container
                        style = {{
                            justifyContent: 'space-between',
                        }}
                    >
                        <Grid item xs = {9}>
                            <Tabs value={this.tabNameToIndex(this.props.activeTab)} >
                                {
                                    items.map((item, i) => (
                                        <Tab
                                            key = { i }
                                            label = { item.label }
                                            onClick = { () => this.handleTabClick(item.url) }
                                        />
                                    ))
                                }
                            </Tabs>
                        </Grid>
                        <Grid item>
                            <MenuPopper
                                {...menuProps}
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