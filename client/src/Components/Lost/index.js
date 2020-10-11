import React, { Component } from "react"
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@material-ui/core"

import { withRouter } from "react-router"
import { withStyles } from '@material-ui/core/styles';
import { withTheme } from "@material-ui/styles";
import getStyles from './styles'
const useStyles = (theme) => getStyles(theme)

class Lost extends Component
{
    constructor(props)
    {
        super(props)
        props.setActiveTab('lost')
    }

    render()
    {
        const {classes, history, theme} = this.props

        return (
            <div className={classes.root}>
                <Card className = {classes.card}>
                    <CardActionArea 
                        className = {classes.card}
                        onClick = { (e) => history.push('/') }
                    >
                        <CardMedia
                            className = {classes.media}
                            image = {require(`Resources/images/lost-${this.props.themeType}.png`)}
                        />
                        <CardContent style={{borderTop: `solid ${theme.palette.divider} 1px`}}>
                            <Typography variant='h5' >
                                Go to main page
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        )
    }
}

export default withTheme(withRouter(withStyles(useStyles)(Lost)))