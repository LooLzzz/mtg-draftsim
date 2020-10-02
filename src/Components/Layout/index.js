import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { AppBar, ClickAwayListener, Fade, Grid, Grow, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader, MenuItem, MenuList, Paper, Popper, Switch, Tab, Tabs, Typography } from '@material-ui/core';
import getStyles from './styles'
import {
    Menu as MenuIcon,
    Brightness3 as DarkmodeIcon,
    BrightnessHigh as LightmodeIcon,
} from '@material-ui/icons'

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
                                                <List
                                                    id = 'optionsMenu'
                                                    subheader = {<ListSubheader>Settings</ListSubheader>}
                                                >
                                                    <ListItem>
                                                        <ListItemIcon
                                                            className = {classes.ListItemIcon}
                                                        >
                                                            <span>
                                                                <Fade
                                                                    in = {this.props.activeThemeType === 'light'}
                                                                    style = {{
                                                                        display: this.props.activeThemeType !== 'light' ? 'none': '',
                                                                        height:'100%',
                                                                    }}
                                                                >
                                                                    <LightmodeIcon />
                                                                </Fade>
                                                                <Fade
                                                                    in = {this.props.activeThemeType === 'dark'}
                                                                    style = {{
                                                                        display: this.props.activeThemeType !== 'dark' ? 'none': '',
                                                                        height: '100%',
                                                                    }}
                                                                >
                                                                    <DarkmodeIcon />
                                                                </Fade>
                                                            </span>
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary = 'Darkmode'
                                                            className = {classes.listItemText}
                                                        />
                                                        <ListItemSecondaryAction>
                                                            <Switch
                                                                edge = 'end'
                                                                checked = {this.props.activeThemeType === 'dark'}
                                                                onChange = { (event) => this.handleThemeChange(event) }
                                                            />
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
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
