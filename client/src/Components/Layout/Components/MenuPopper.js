import React, { Component } from 'react'
import {
    ClickAwayListener, Divider, Grow, IconButton, List, ListItem, ListItemText, ListSubheader,
    MenuItem, Paper, Popper
} from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'
import { ListItemDarkmodeToggle, LoginDialog } from './'
import { Dummy } from 'Components'
import { AuthService } from 'Auth/'

import { withStyles } from '@material-ui/core/styles';
import getStyles from '../styles'
const useStyles = (theme) => getStyles(theme);

class MenuPopper extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            dialogOpen: false,
        }
    }

    componentDidUpdate(oldProps, oldState)
    {
        if (oldProps !== this.props)
        {
            this.setState({
                ...this.props
            })

            // console.log('got new info:', this.state.userData) //DEBUG
        }
    }

    handleThemeChange = (e) => {
        this.props.setTheme(e.currentTarget.checked ? 'dark' : 'light')
    }

    handleLoginDialogOpen = (e, open) => {
        this.handleMenuToggle(null) //close menu popover
        this.setState({
            dialogOpen: open === 'open', //open => ['open' || 'close']
            username: '',
            password: '',
            submitErrors: {},
        })

        // console.log(this.usernameFieldRef)
        // this.usernameFieldRef.current.focus()
    }

    handleLogout = (e) => {
        this.handleMenuToggle(null) //close menu popover
        this.props.setUserData(null)
        AuthService.logout()
    }

    handleMenuToggle = (target) => {
        this.setState({
            menuAnchor: target,
        })
    }

    handleSignupClick = (e) => {
        this.handleMenuToggle(null)
        this.props.history.push('/signup')
    }

    render()
    {
        const {classes} = this.props

        return (
            <Dummy>
                <IconButton
                    aria-controls = {'optionsMenu'}
                    aria-haspopup = {'true'}
                    onClick = { (e) => this.handleMenuToggle(e.currentTarget) }
                >
                    <MenuIcon className={classes.appBarIcon} />
                </IconButton>
                <Popper
                    open = {!!this.state.menuAnchor}
                    anchorEl = {this.state.menuAnchor}
                    onClose = {(e) => this.handleMenuToggle(null)}
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
                                    onClickAway = { (e) => this.handleMenuToggle(null) }
                                >
                                    <List>
                                        {/* ACCOUNT */}
                                        <ListSubheader>Account</ListSubheader>
                                        {
                                            this.state.userData
                                            ? ( //if
                                                <Dummy>
                                                    <ListItem>
                                                        <ListItemText>
                                                            Welcome <b>{this.state.userData.username}</b>
                                                        </ListItemText>
                                                    </ListItem>
                                                    <MenuItem onClick={this.handleLogout}>
                                                        <ListItemText>
                                                            Logout
                                                        </ListItemText>
                                                    </MenuItem>
                                                </Dummy>
                                            )
                                            : ( //else
                                                <Dummy>
                                                    <MenuItem onClick={(e) => this.handleLoginDialogOpen(e, 'open')}>
                                                        <ListItemText>
                                                            Login
                                                        </ListItemText>
                                                    </MenuItem>
                                                    <MenuItem onClick={this.handleSignupClick}>
                                                        <ListItemText>
                                                            Sign up
                                                        </ListItemText>
                                                    </MenuItem>
                                                </Dummy>
                                            )
                                        }
                                        {/* ACCOUNT */}

                                        <Divider />

                                        {/* SETTINGS */}
                                        <ListSubheader>Settings</ListSubheader>
                                        <ListItemDarkmodeToggle
                                            classes = {classes}
                                            handleChange = {this.handleThemeChange.bind(this)}
                                            text = {'Darkmode'}
                                            trigger = {{
                                                value: this.props.themeType,
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
                
                <LoginDialog
                    dialogOpen = {this.state.dialogOpen}
                    handleMenuToggle = {this.handleMenuToggle}
                    handleLoginDialogOpen = {this.handleLoginDialogOpen}
                    setUserData = {this.props.setUserData}
                    {...this.state}
                />
            </Dummy>
        )
    }
}

export default withStyles(useStyles)(MenuPopper)