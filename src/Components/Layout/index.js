import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { AppBar, Button, Grid, Switch, Tab, Tabs, Toolbar, Typography } from '@material-ui/core';
import getStyles from './styles'
// import { List, Drawer, Divider, IconButton, ListItemIcon, ListItemText } from '@material-ui/core';
// import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import ListItem from '@material-ui/core/ListItem';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
// import MenuIcon from '@material-ui/icons/Menu';
// import { Link } from 'react-router-dom';

const useStyles = (theme) => getStyles(theme);

class Layout extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {...props}
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

    handleThemeChange(event)
    {
        this.props.setTheme(event.target.checked ? 'dark' : 'light')
    }

    render()
    {
        const {classes} = this.props;
        let items = [
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

        return (
            <div className={classes.root}>
                <AppBar className = {classes.appBar} >
                    <Grid container alignItems='center'>
                        <Grid item xs={11}>
                            <Tabs value={this.tabNameToIndex(this.props.activeTab)} >
                                {items.map((item, i) => (
                                    <Tab
                                        key = { i }
                                        label = { item.label }
                                        onClick = { () => this.handleTabClick(item.url) }
                                    />
                                ))}
                            </Tabs>
                        </Grid>
                        <Grid item>
                            <Switch
                                checked = {this.props.activeThemeType === 'dark'}
                                onChange = { (event) => this.handleThemeChange(event) }
                                />
                        </Grid>
                        <Grid item>
                            Darkmode
                        </Grid>
                    </Grid>
                </AppBar>
                <main className={classes.content} >
                    <div className={classes.contentSpacer} /> {/*top spacer*/}
                    { this.props.children }
                </main>
            </div>
        );
    }
}

export default withRouter(withStyles(useStyles)(Layout))
