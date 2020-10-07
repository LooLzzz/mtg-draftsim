import React, { Component } from 'react'
import { Dummy } from 'Components/'
import { AuthService } from 'Auth/'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, Typography } from '@material-ui/core'
import { AccountCircle as AccountCircleIcon } from '@material-ui/icons'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'

import { withStyles } from '@material-ui/core/styles';
import getStyles from '../styles'
const useStyles = (theme) => getStyles(theme);

class LoginDialog extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            loading: false,
            ...props, //props = {dialogOpen}
        }
    }

    componentDidUpdate(oldProps, oldState)
    {
        if (oldProps !== this.props)
        {
            this.setState({
                ...this.props
            })
        }
    }

    handleLoginFormChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
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
                        this.props.setUserData(res.user)
                        this.props.handleLoginDialogOpen(e, 'close')
                        // console.log('got user data', res.user) //DEBUG
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

    render()
    {
        const {classes} = this.props

        return (
            <Dummy>
                <Dialog
                    open = {this.state.dialogOpen}
                    onClose = {(e) => this.props.handleLoginDialogOpen(e, 'close')}
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
                                autoFocus
                                label = 'Username'
                                name = 'username'
                                color = 'secondary'
                                size = 'small'
                                InputProps = {{
                                    autocomplete: 'current-password',
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
                                InputProps = {{
                                    autocomplete: 'current-password',
                                }}
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
                                onClick = {(e) => this.props.handleLoginDialogOpen(e, 'close')}
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

export default withStyles(useStyles)(LoginDialog)