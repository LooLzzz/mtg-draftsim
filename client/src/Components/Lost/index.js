import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@material-ui/core"
import React, { Component } from "react"
import { withRouter } from "react-router"
import { withStyles } from '@material-ui/core/styles';
import getStyles from './styles'

const useStyles = (theme) => getStyles(theme)

class Lost extends Component
{
    render()
    {
        const {classes, history} = this.props

        return (
            <div className={classes.root}>
                <Card className = {classes.card}>
                    <CardActionArea 
                        onClick={ (e) => history.push('/') }
                    >
                        {/* <CardHeader title = {props.title} /> */}
                        <CardMedia
                            className = {classes.media}
                            image = {require(`Resources/images/lost-${this.props.activeThemeType}.png`)}
                        />
                        <CardContent>
                            <Typography variant='h5' >
                                Go back
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        )
    }
}

export default withRouter(withStyles(useStyles)(Lost))