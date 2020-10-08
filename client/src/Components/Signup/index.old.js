import React, { Component } from "react"
import { Button, Dialog, Grid, Paper, Typography } from "@material-ui/core"

import { withRouter } from "react-router"
import { withStyles } from '@material-ui/core/styles';
import getStyles from './styles'
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const useStyles = (theme) => getStyles(theme)

class Signup extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            badSubmit: false,
            username: '',
            password: '',
            password2: '',
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
            this.props.history.push('/lost')
            // this.props.history.push('/')
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
        
    }

    render()
    {
        const {classes, history} = this.props

        return (
            <div className={classes.root}>
                <Paper className={classes.paper} elevation={8}>
                    <ValidatorForm
                        onSubmit = {this.handleFormSubmit}
                        onError = {this.handleFormError}
                        instantValidate = {false}
                        ref = { (r) => this.formRef=r }
                    >
                        <Grid container spacing={1} direction='column' >
                            <Grid item>
                                <TextValidator
                                    variant = 'outlined'
                                    label = 'Username'
                                    name = 'username'
                                    id = 'username'
                                    color = 'secondary'
                                    // size = 'small'
                                    value = {this.state.username}
                                    onChange = { this.handleFormChange }
                                    validators = {['required']}
                                    errorMessages = {['Username is required']}
                                    // errorMessages = {['']}
                                />
                            </Grid>
                            <Grid item>
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
                            </Grid>
                            <Grid item>
                                <TextValidator
                                    variant = 'outlined'
                                    type = 'password'
                                    label = 'Password2'
                                    name = 'password2'
                                    id = 'password2'
                                    color = 'secondary'
                                    // size = 'small'
                                    value = { this.state.password2 }
                                    onChange = { this.handleFormChange }
                                    validators = {['required', 'minStringLength:5', 'isPasswordMatch']}
                                    errorMessages = {['Password is required', 'Password is too short', 'Passwords does not match']}
                                />
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant = 'subtitle2'
                                    color = 'error'
                                >
                                    {this.formRef?.name}
                                </Typography>
                            </Grid>
                            <Grid item style={{display: this.state.badSubmit ? '': 'none'}}>
                                <Typography
                                    variant = 'subtitle2'
                                    color = 'error'
                                >
                                    {this.state.submitErrors}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button variant='contained' type='submit'>
                                    Signup
                                </Button>
                            </Grid>
                        </Grid>
                    </ValidatorForm>
                </Paper>
            </div>
        )
    }
}

export default withRouter(withStyles(useStyles)(Signup))