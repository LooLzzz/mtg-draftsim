import React, { Component } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import getStyles from './styles'
// import clsx from 'clsx';

const useStylesHOC = makeStyles((theme) => getStyles(theme));
const useStylesLOC = (theme) => getStyles(theme)

function MediaCard(props)
{    
    const classes = useStylesHOC();
    let hist = useHistory();

    return (
        <Card className = {classes.card}>
            <CardActionArea 
                onClick={(event) => (hist.push(props.link))}
            >
                {/* <CardHeader title = {props.title} /> */}
                <CardMedia
                    className = {classes.media}
                    image = {require(`../../Resources/images/${props.id}.jpg`)}
                />
                <CardContent>
                    <Typography variant='h5' >
                        { props.title }
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

class Main extends Component
{
    constructor(props)
    {        
        super(props)
        props.setTitle('Main')
        this.items = [
        {
            title: 'to Draftsim',
            link: '/draftsim',
        },
        {
            title: 'to Collection',
            link: '/collection',
        }];
    }

    render()
    {
        const { classes } = this.props;
        return (
            <Grid container spacing={2} className={classes.root}>
                <Grid item xs={12}>
                    <Grid container className={classes.item} justify="space-evenly" spacing={2}>
                        {this.items.map((item, i) => (
                            <Grid item key={i} xs={6}>
                                <MediaCard
                                    className = { classes.item }
                                    id = { i }
                                    { ...item }
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        // </div>
        )
    }
}

export default withStyles(useStylesLOC)(Main)