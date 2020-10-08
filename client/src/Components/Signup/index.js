import React, { Component } from 'react'
import { AuthService } from 'Auth';
import { Button, CircularProgress, Dialog, DialogContent, Grid, Typography } from '@material-ui/core';
import { AccountCircle as AccountCircleIcon } from '@material-ui/icons';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Dummy } from 'Components';
import CustomCard from "./CustomCard";

import { withStyles } from '@material-ui/core/styles';
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
            badSubmit: false,
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
        if (this.props.userData || this.props.isLoggedIn()) //already signed in
            this.props.history.push('/lost') //get lost chump :3
            // this.props.history.push('/')
    }

    handleFormClear = (e) => {
        this.setState({
            username: '',
            password: '',
            password2: '',
            badSubmit: false,
            success: false,
        })
        this.formRef.resetValidations()
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

                const {username, password, password2} = this.state
                AuthService.signup(username, password, password2).then( (res) => {
                    this.setState({
                        loading: false,
                    })

                    if (res) //success
                    {
                        this.setState({success: true})
                        this.props.setUserData(res.user)
                        // this.props.handleLoginDialogOpen(e, 'close')
                        // this.props.history.push('/') //go back to main page
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
                                    Signup
                                </Typography>
                            </header>
                            <icon>
                                <AccountCircleIcon
                                    fontSize = 'inherit'
                                    // color = 'primary'
                                    color = 'inherit'
                                    style = {{
                                        color: '#26c6da'
                                    }}
                                />
                            </icon>
                            <content>
                                <TextValidator
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
                                <Typography
                                    variant = 'subtitle2'
                                    color = 'error'
                                    style = {{display: this.state.badSubmit ? '' : 'none'}}
                                >
                                    Some error info...
                                </Typography>
                                <Typography
                                    variant = 'subtitle2'
                                    color = 'green'
                                    style = {{display: this.state.success ? '' : 'none'}}
                                >
                                    Success!
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
            </Dummy>
        )
    }
}

export default withStyles(useStyles)(Signup)