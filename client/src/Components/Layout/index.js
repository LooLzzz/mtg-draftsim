import React, { Component } from 'react';
import {
    AppBar, Box, ClickAwayListener, Divider, Grid, Grow, IconButton, List, ListItemText,
    ListSubheader, MenuItem, Paper, Popper, Tab, Tabs
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import getStyles from './styles'
import { Menu as MenuIcon } from '@material-ui/icons'
import ListItemDarkmodeToggle from './ListItemDarkmodeToggle';

const useStyles = (theme) => getStyles(theme);

class Layout extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {...props}

        // console.log('props', props) //DEBUG
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
        this.props.setTheme(event.currentTarget.checked ? 'dark' : 'light')
    }

    handleMenuToggle(target)
    {
        this.setState({
            menuAnchor: target,
        })
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
                            <IconButton
                                aria-controls = {'optionsMenu'}
                                aria-haspopup = {'true'}
                                onClick = { (event) => this.handleMenuToggle(event.currentTarget) }
                            >
                                <MenuIcon className={classes.appBarIcon} />
                            </IconButton>
                            <Popper
                                open = {!!this.state.menuAnchor}
                                anchorEl = {this.state.menuAnchor}
                                onClose = {(event) => this.handleMenuToggle(null)}
                                transition
                                disablePortal
                            >
                                { ({TransitionProps, placement}) => (                                  
                                    <Grow
                                        {...TransitionProps}
                                        style = {{
                                            transformOrigin:
                                                placement === "bottom"
                                                    ? "center top"
                                                    : "center bottom",
                                        }}
                                    >
                                        <Paper>
                                            <ClickAwayListener
                                                onClickAway = { (event) => this.handleMenuToggle(null) }
                                            >
                                                <List id = 'optionsMenu'>
                                                    {/* ACCOUNT */}
                                                    <ListSubheader>Account</ListSubheader>
                                                    <MenuItem>
                                                        <ListItemText>
                                                            Login
                                                        </ListItemText>
                                                    </MenuItem>
                                                    <MenuItem>
                                                        <ListItemText>
                                                            Sign up
                                                        </ListItemText>
                                                    </MenuItem>
                                                    {/* ACCOUNT */}

                                                    <Divider />

                                                    {/* SETTINGS */}
                                                    <ListSubheader>Settings</ListSubheader>
                                                    <ListItemDarkmodeToggle
                                                        classes = {classes}
                                                        handleChange = {this.handleThemeChange.bind(this)}
                                                        text = {'Darkmode'}
                                                        trigger = {{
                                                            value: this.props.activeThemeType,
                                                            on: 'dark',
                                                            off: 'light',
                                                        }}
                                                    />
                                                    {/* SETTINGS */}
                                                </List>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
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