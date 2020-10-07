import React, { Component } from "react"
import { Typography } from "@material-ui/core"

import { withRouter } from "react-router"
import { withStyles } from '@material-ui/core/styles';
import getStyles from './styles'

const useStyles = (theme) => getStyles(theme)

class Signup extends Component
{
    constructor(props)
    {
        super(props)

        this.props.setActiveTab('signup')
    }

    render()
    {
        const {classes, history} = this.props

        return (
            <div className={classes.root}>
                <Typography>
                    signup page
                </Typography>
            </div>
        )
    }
}

export default withRouter(withStyles(useStyles)(Signup))