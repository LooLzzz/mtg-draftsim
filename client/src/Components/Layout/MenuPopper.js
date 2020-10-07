import React, { Component } from 'react'
import {
    Button, CircularProgress, ClickAwayListener, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grow, IconButton,
    InputAdornment, List, ListItem, ListItemText, ListSubheader, MenuItem, Paper, Popper, Typography
} from '@material-ui/core'
import {
    AccountCircle as AccountCircleIcon, Menu as MenuIcon
} from '@material-ui/icons'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import ListItemDarkmodeToggle from './ListItemDarkmodeToggle'
import { AuthService } from 'Auth/'

import { withStyles } from '@material-ui/core/styles';
import getStyles from './styles'
import { Dummy } from '..'

const useStyles = (theme) => getStyles(theme);

class MenuPopper extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            dialogOpen: false,
            loading: false,
            badLogin: false,
        }
    }

    componentDidUpdate(oldProps, oldState)
    {
        if (oldProps !== this.props)
            this.setState({
                ...this.props
            })
    }

    handleThemeChange(event)
    {
        this.props.setTheme(event.currentTarget.checked ? 'dark' : 'light')
    }

    handleLoginFormChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    handleLogout = (e) => {
        this.handleMenuToggle(null) //close menu popover
        this.props.setUserData(null)
        AuthService.logout()
    }

    handleLoginSubmit = (e) =>
    {
        this.setState({
            badLogin: false
        })

        this.formRef.isFormValid(true).then( (isFormValid) => {
            if (isFormValid)
            {
                this.setState({
                    loading: true,
                })

                const {username, password} = this.state
                AuthService.login(username, password).then( (res) => {
                    this.setState({
                        loading: false,
                    })

                    if (res)
                    {
                        this.setState({
                            dialogOpen: false,
                        })
                        this.props.setUserData(res.user)
                        this.props.setCollectionData(res.collection)
                        
                        // console.log('got user data', res) //DEBUG
                    }
                    else
                    {
                        this.setState({
                            badLogin: true
                        })
                    }
                })
            }
        })
    }

    handleLoginError = (e) =>
    {
        this.setState({
            badLogin: false,
        })
    }

    handleLoginDialogOpen = (e, changeDialogState) => {
        if (changeDialogState)
            this.setState({
                username: '',
                password: '',
                badLogin: false,
            })
        
        this.handleMenuToggle(null) //close menu popover
        this.setState({
            dialogOpen: changeDialogState === 'open',
        })

        // console.log(this.usernameFieldRef)
        // this.usernameFieldRef.current.focus()
    }

    handleMenuToggle(target)
    {
        this.setState({
            menuAnchor: target,
        })
    }

    render()
    {
        const {classes, history} = this.props

        return (
            <Dummy>
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
                                                    <MenuItem onClick={(e) => history.push('/signup')}>
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

                <Dialog
                    open = {this.state.dialogOpen}
                    onClose = {(e) => this.handleLoginDialogOpen(e, 'close')}
                >
                    <DialogTitle style={{paddingBottom:'0px'}}>
                        <Typography variant='h5' style={{paddingBottom:'0.4em'}}>
                            Login
                        </Typography>
                        <Typography variant='subtitle2' >
                            Login to your account
                        </Typography>
                    </DialogTitle>
                    <ValidatorForm
                        onSubmit = {this.handleLoginSubmit}
                        onError = {this.handleLoginError}
                        instantValidate = {false}
                        ref = { (r) => this.formRef=r }
                    >
                        <DialogContent>
                            <TextValidator
                                label = 'Username'
                                name = 'username'
                                color = 'secondary'
                                size = 'small'
                                InputProps = {{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <AccountCircleIcon />
                                      </InputAdornment>
                                    ),
                                }}
                                value = {this.state.username}
                                onChange = { this.handleLoginFormChange }
                                validators = {['required']}
                                errorMessages = {['Username is required']}
                            />
                        </DialogContent>
                        <DialogContent>
                            <TextValidator 
                                type = 'password'
                                label = 'Password'
                                name = 'password'
                                color = 'secondary'
                                size = 'small'
                                value = {this.state.password}
                                onChange = { this.handleLoginFormChange }
                                validators = {['required', 'minStringLength:5']}
                                errorMessages = {['Password is required', 'Password is too short']}
                            />
                        </DialogContent>
                        <DialogContent style={{display: this.state.badLogin ? '': 'none'}}>
                            <Typography
                                variant = 'subtitle2'
                                color = 'error'
                            >
                                Bad login info
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button type = 'submit'
                                variant = 'contained'
                                color = 'primary'
                            >
                                Login
                            </Button>
                            <Button
                                onClick = {(e) => this.handleLoginDialogOpen(e, 'close')}
                                variant = 'outlined'
                            >
                                Cancel
                            </Button>
                        </DialogActions>
                    </ValidatorForm>
                </Dialog>
                <Dialog open={this.state.loading}>
                    <DialogContent>
                        <CircularProgress className={classes.circle} />
                    </DialogContent>
                </Dialog>
            </Dummy>
        )
    }
}

export default withStyles(useStyles)(MenuPopper)