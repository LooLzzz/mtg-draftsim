import React, { Component } from 'react'
import { UserService } from 'Auth';
import { Button, CircularProgress, Dialog, DialogContent, Grid, Typography } from '@material-ui/core';
import { AccountCircle as AccountCircleIcon } from '@material-ui/icons';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import CustomCard from "./CustomCard";

import { withSnackbar } from 'notistack';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/styles';
import getStyles from './styles'
const useStyles = (theme) => getStyles(theme)

class Signup extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            username: '',
            password: '',
            password2: '',
            loading: false,
            errorMessages: {},
            success: false,
            ...props,
        }

        this.props.setActiveTab('signup')

        ValidatorForm.addValidationRule('isPasswordMatch',
            (value) => (value === this.state.password)
        )
    }
    
    async componentDidMount()
    {
        let isLoggedIn = await this.props.isLoggedIn()
        
        if (isLoggedIn)
            this.props.history.push('/')
    }

    handleFormChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    handleFormClear = async () => {
        const flag = await this.props.isLoggedIn()
        if (flag)
            this.props.history.push('/')

        this.setState({
            username: '',
            password: '',
            password2: '',
            errorMessages: {},
        })
        this.formRef.resetValidations()
    }
    
    handleFormError = () =>
    {
        this.setState({
            errorMessages: {},
        })
    }

    handleFormSubmit = async () =>
    {
        if (await this.props.isLoggedIn()) //already signed in
        {    
            this.props.history.push('/')
            return null
        }

        this.setState({
            errorMessages: {},
        })

        const dryRun = true
        const isFormValid = await this.formRef.isFormValid(dryRun)
            
        if (isFormValid)
        {
            this.setState({loading: true})

            const {username, password, password2} = this.state
            const res = await UserService.signup(username, password, password2)
            
            this.setState({loading: false})

            if (res.accessToken) //success
            {
                // this.handleFormClear()
                // this.formRef.resetValidations()
                this.setState({success: true})
                this.props.enqueueSnackbar(`Successfully registered ${res.username}`, {variant: 'success'})
                this.props.setUserData(res)
                // this.props.handleLoginDialogOpen(e, 'close')
                // this.props.history.push('/') //go back to main page
                // console.log('got user data', res.user) //DEBUG
            }
            else
            {
                // console.error('signup error:', res)
                this.props.enqueueSnackbar("Something's went wrong!", {variant: 'error'})
                this.setState({
                    errorMessages: res.data,
                })
            }
        }
    }

    render()
    {
        const {classes} = this.props
        
        return (
            <>
                <div className={classes.root}>
                    <ValidatorForm
                        onSubmit = {this.handleFormSubmit}
                        onError = {this.handleFormError}
                        instantValidate = {false}
                        ref = { (r) => this.formRef=r }
                    >
                        <CustomCard>
                            <header>
                                <Typography variant="h4">
                                    <b>SIGNUP</b>
                                </Typography>
                            </header>
                            <icon>
                                <AccountCircleIcon
                                    fontSize = 'inherit'
                                    color = 'inherit'
                                />
                            </icon>
                            <content>
                                <TextValidator /*autoFocus*/
                                    variant = 'outlined'
                                    label = 'Username'
                                    name = 'username'
                                    id = 'username'
                                    color = 'secondary'
                                    size = 'small'
                                    value = {this.state.username}
                                    onChange = { this.handleFormChange }
                                    validators = {['required', `matchRegexp:^([A-Za-z0-9]|[-_.'])*$`]}
                                    errorMessages = {['Username is required', `Username can only be alphanumerica and any of - _ . ' `]}
                                    disabled = {this.state.success}
                                />
                                <TextValidator
                                    variant = 'outlined'
                                    type = 'password'
                                    label = 'Password'
                                    name = 'password'
                                    id = 'password'
                                    color = 'secondary'
                                    size = 'small'
                                    value = {this.state.password}
                                    onChange = { this.handleFormChange }
                                    validators = {['required', 'minStringLength:5']}
                                    errorMessages = {['Password is required', 'Password is too short']}
                                    disabled = {this.state.success}
                                />
                                <TextValidator
                                    variant = 'outlined'
                                    type = 'password'
                                    label = 'Repeat Password'
                                    name = 'password2'
                                    id = 'password2'
                                    color = 'secondary'
                                    size = 'small'
                                    value = { this.state.password2 }
                                    onChange = { this.handleFormChange }
                                    validators = {['required', 'minStringLength:5', 'isPasswordMatch']}
                                    errorMessages = {['Password is required', 'Password is too short', 'Passwords does not match']}
                                    disabled = {this.state.success}
                                />
                                {
                                    Object.values(this.state.errorMessages).map( (value, i) => (
                                        <Typography key={i} variant='subtitle2' color='error' >
                                            {value}
                                        </Typography>
                                    ))
                                }
                                {/* <Typography variant='subtitle2' style={{color: theme.palette.success.main}} >
                                    { this.state.success ? 'Success!' : '' }
                                </Typography> */}
                            </content>
                            <action>
                                <Grid container spacing={1}>
                                    <Grid item>
                                        <Button
                                            size = "medium"
                                            variant = "outlined"
                                            onClick = {this.handleFormClear}
                                            // disabled = {this.state.success}
                                        >
                                            Clear
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            type = "submit"
                                            size = "medium"
                                            variant = "contained"
                                            color = "primary"
                                            disabled = {this.state.success}
                                        >
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </action>
                        </CustomCard>
                    </ValidatorForm>
                </div>
                <Dialog open={this.state.loading}>
                    <DialogContent>
                        <CircularProgress />
                    </DialogContent>
                </Dialog>
            </>
        )
    }
}

export default withSnackbar(withRouter(withStyles(useStyles)(Signup)))