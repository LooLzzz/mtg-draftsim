import React, { Component } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, Card, CardActionArea, CardContent, CardMedia, Divider, Grid, Typography } from '@material-ui/core';
import { useHistory, withRouter } from "react-router-dom";
import { Dummy } from 'Components';
import getStyles from './styles'
// import clsx from 'clsx';

const useStylesHOC = makeStyles((theme) => getStyles(theme));
const useStylesLOC = (theme) => getStyles(theme)

function MediaCard(props)
{    
    const classes = useStylesHOC();
    const history = useHistory();

    return (
        <Card className = {classes.card}>
            <CardActionArea 
                onClick={ (event) => history.push('/' + props.url) }
            >
                {/* <CardHeader title = {props.title} /> */}
                <CardMedia
                    className = {classes.media}
                    image = {require(`Resources/images/${props.id}.jpg`)}
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
        props.setActiveTab('main')
        this.items = [
        {
            title: 'to Draftsim',
            url: 'draftsim',
        },
        {
            title: 'to Collection',
            url: 'collection',
        }];
    }

    render()
    {
        const { classes, history } = this.props;
        return (
            <Dummy>
                <Grid container spacing={2} className={classes.root}>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            {this.items.map((item, i) => (
                                <Grid item key={i} xs={6}>
                                    <MediaCard
                                        className = { classes.item }
                                        setActiveTab = { this.props.setActiveTab }
                                        id = { i }
                                        { ...item }
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>

                <Divider className={classes.divider} />
                
                <div align='center'>
                    <Typography variant='h4'>
                        About
                    </Typography>
                    <Button variant="outlined" onClick={(e) => history.push('/lost')}>
                        <Typography color="textSecondary">
                            Get lost
                        </Typography>
                    </Button>
                </div>
            </Dummy>
        )
    }
}

export default withRouter(withStyles(useStylesLOC)(Main))