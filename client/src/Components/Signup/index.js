import React, { Component } from 'react'
import { AuthService } from 'Auth';
import { Button, CircularProgress, Dialog, DialogContent, Grid, Typography } from '@material-ui/core';
import { AccountCircle as AccountCircleIcon } from '@material-ui/icons';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import CustomCard from "./CustomCard";

import { withSnackbar } from 'notistack';
import { withRouter } from 'react-router';
import { withStyles, withTheme } from '@material-ui/styles';
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
    
    componentDidMount()
    {
        this.props.isLoggedIn().then(flag => {
            if (flag)
                this.props.history.push('/lost')
        })
    }

    handleFormChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }

    handleFormClear = () => {
        this.setState({
            username: '',
            password: '',
            password2: '',
            errorMessages: {},
            success: false,
        })
        this.formRef.resetValidations()

        this.props.isLoggedIn().then(flag => {
            if (flag)
                this.props.history.push('/')
        })
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
            const res = await AuthService.signup(username, password, password2)
            
            this.setState({loading: false})

            if (res.accessToken) //success
            {
                this.handleFormClear()
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
        const {classes, theme} = this.props
        
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
                                    // style = {{
                                    //     color: theme.palette.type==='dark' ? theme.palette.info.light : theme.palette.primary.main,
                                    // }}
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
                                    validators = {['required']}
                                    errorMessages = {['Username is required']}
                                    // errorMessages = {['']}
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
                                />
                                {
                                    Object.values(this.state.errorMessages).map( (value, i) => (
                                        <Typography key={i} variant='subtitle2' color='error' >
                                            {value}
                                        </Typography>
                                    ))
                                }
                                <Typography variant='subtitle2' style={{color: theme.palette.success.main}} >
                                    { this.state.success ? 'Success!' : '' }
                                    {/* Success! */}
                                </Typography>
                            </content>
                            <action>
                                <Grid container spacing={1}>
                                    <Grid item>
                                        <Button size="medium" variant="outlined"
                                            onClick = {this.handleFormClear}
                                        >
                                            Clear
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button type='submit' size="medium" variant="contained" color="primary">
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

export default withSnackbar(withRouter(withTheme(withStyles(useStyles)(Signup))))