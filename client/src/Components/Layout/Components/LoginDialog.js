import React, { Component } from 'react'
import { Dummy } from 'Components/'
import { AuthService } from 'Auth/'
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, InputAdornment, Typography } from '@material-ui/core'
import { AccountCircle as AccountCircleIcon } from '@material-ui/icons'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { withRouter } from 'react-router'

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

    handleFormChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }
    
    handleFormError = (e) =>
    {
        this.setState({
            badSubmit: false,
        })
    }

    handleFormSubmit = (e) =>
    {
        this.setState({
            badSubmit: false
        })

        const dryRun = true
        this.formRef.isFormValid(dryRun).then( (isFormValid) =>
        {
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

                    if (res.accessToken) //success
                    {
                        this.props.setUserData(res.user)
                        this.props.handleLoginDialogOpen(e, 'close')
                        this.props.history.push('/') //go back to main page
                        // console.log('got user data', res.user) //DEBUG
                    }
                    else
                    {
                        this.setState({
                            badSubmit: true
                        })
                    }
                })
            }
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
                    <Divider style={{marginTop:'1em'}} />
                    <ValidatorForm
                        onSubmit = {this.handleFormSubmit}
                        onError = {this.handleFormError}
                        instantValidate = {false}
                        ref = { (r) => this.formRef=r }
                    >
                        <DialogContent>
                            <TextValidator
                                autoFocus
                                variant = 'outlined'
                                label = 'Username'
                                name = 'username'
                                id = 'username'
                                color = 'secondary'
                                // size = 'small'
                                InputProps = {{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <AccountCircleIcon />
                                      </InputAdornment>
                                    ),
                                }}
                                value = {this.state.username}
                                onChange = { this.handleFormChange }
                                validators = {['required']}
                                errorMessages = {['Username is required']}
                            />
                        </DialogContent>
                        <DialogContent>
                            <TextValidator 
                                variant = 'outlined'
                                type = 'password'
                                label = 'Password'
                                name = 'password'
                                id = 'password'
                                color = 'secondary'
                                // size = 'small'
                                value = {this.state.password}
                                onChange = { this.handleFormChange }
                                validators = {['required', 'minStringLength:5']}
                                errorMessages = {['Password is required', 'Password is too short']}
                            />
                        </DialogContent>
                        <DialogContent style={{display: this.state.badSubmit ? '': 'none'}}>
                            <Typography
                                variant = 'subtitle2'
                                color = 'error'
                            >
                                Bad login info
                            </Typography>
                        </DialogContent>
                        <DialogActions style={{
                                marginRight: '1em',
                                marginBottom: '1em'
                            }}>
                            <Button
                                onClick = {(e) => this.props.handleLoginDialogOpen(e, 'close')}
                                variant = 'outlined'
                            >
                                Cancel
                            </Button>
                            <Button type = 'submit'
                                variant = 'contained'
                                color = 'primary'
                            >
                                Login
                            </Button>
                        </DialogActions>
                    </ValidatorForm>
                </Dialog>
                <Dialog open={this.state.loading}>
                    <DialogContent>
                        <CircularProgress /*className={classes.circle}*/ />
                    </DialogContent>
                </Dialog>
            </Dummy>
        )
    }
}

export default withRouter(withStyles(useStyles)(LoginDialog))