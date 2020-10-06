import React, { Component } from 'react';
import {
    AppBar, Button, ClickAwayListener, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Grow, IconButton, List, ListItemText,
    ListSubheader, MenuItem, Paper, Popper, Tab, Tabs, Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import getStyles from './styles'
import { Menu as MenuIcon } from '@material-ui/icons'
import ListItemDarkmodeToggle from './ListItemDarkmodeToggle';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { AuthService } from 'Auth/';

const useStyles = (theme) => getStyles(theme);

class Layout extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            dialogOpen: false,
            ...props,
        }

        // console.log('props', props) //DEBUG
    }

    handleLoginFormChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    handleLoginSubmit = (e) =>
    {
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
                        this.props.history.push('/profile')
                    else
                        this.setState({
                            badLogin: true
                        })
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

    componentDidUpdate(oldProps, oldState)
    {
        if (oldProps.routerRef !== this.props.routerRef)
            this.setState({
                routerRef: this.props.routerRef
            })
    }

    handleLoginDialogOpen = (e, changeDialogState) => {
        if (changeDialogState)
            this.setState({
                username: '',
                password: '',
            })
        
        this.handleMenuToggle(null) //close menu popover
        this.setState({
            dialogOpen: changeDialogState === 'open',
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
                                                        <ListItemText onClick={(e) => this.handleLoginDialogOpen(e, 'open')}>
                                                            Login
                                                        </ListItemText>
                                                    </MenuItem>
                                                    <MenuItem>
                                                        <ListItemText>
                                                            {/*//TODO create signup page*/}
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
                <ValidatorForm
                    onSubmit = {this.handleLoginSubmit}
                    onError = {this.handleLoginError}
                    instantValidate = {false}
                    ref = { (r) => this.formRef=r }
                >
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
                        <DialogContent>
                            <TextValidator
                                label = 'Username'
                                name = 'username'
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
                                value = {this.state.password}
                                onChange = { this.handleLoginFormChange }
                                validators = {['required', 'minStringLength:5']}
                                errorMessages = {['Password is required', 'Password is too short']}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button variant='contained' type='submit'>
                                Login
                            </Button>
                            <Button onClick={(e) => this.handleLoginDialogOpen(e, 'close')}>
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </ValidatorForm>
                <main className={classes.content} >
                    <div className={classes.contentSpacer} /> {/*top spacer*/}
                    { this.props.children }
                </main>
            </div>
        )
    }
}

export default withRouter(withStyles(useStyles)(Layout))