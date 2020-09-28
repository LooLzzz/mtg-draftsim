import React from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Grid, Paper, Toolbar, Typography } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import getStyles from './styles'

const useStyles = makeStyles((theme) => getStyles(theme));

function MediaCard(props)
{    
    const styles = useStyles();
    let hist = useHistory();

    return(
        <Card className = {styles.card}>
            <CardActionArea 
                onClick={event => hist.push(props.link)}
            >
                {/* <CardHeader title = {props.title} /> */}
                <CardMedia
                    className = {styles.media}
                    image = {require(`../../Resources/images/${props.id}.jpg`)}
                />
                <CardContent>
                    <Typography variant='h5' >
                        {props.title}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

function Main(props)
{
    const styles = useStyles();
    let items = [
        {
            title: 'to Draftsim',
            link: '/draftsim',
        },
        {
            title: 'to Collection',
            link: '/collection',
        }
    ]
    
    return(
        // <div style={{height: '80vh', verticalAlign: 'middle'}}>
            <Grid container spacing={2} className={styles.root}>
                <Grid item xs={12}>
                    <Grid container className={styles.item} justify="space-evenly" spacing={2}>
                        {items.map((item, i) => (
                            <Grid item key={i} xs={6}>
                                <MediaCard
                                    className = { styles.item }
                                    id = { i }
                                    { ...item }
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                
                {/*
                //DEBUG
                <Grid container>
                    <Grid item>
                        <Button
                            onClick = {() => props.test('from inside')}
                        >
                            asd
                        </Button>
                    </Grid>
                </Grid>
                //DEBUG
                */}
                
            </Grid>
        // </div>
    )
}
export default Main;