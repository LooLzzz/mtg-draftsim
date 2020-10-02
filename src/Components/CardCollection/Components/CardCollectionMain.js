import React, { Component } from 'react'
import { MtgCard } from '../'
import { withStyles } from '@material-ui/core/styles';
import getStyles from './styles'
import 'Resources/keyrune/css/keyrune.css'
import 'Resources/mana/css/mana.css'
import { AppBar, Grid, Toolbar } from '@material-ui/core';

const useStylesLOC = (theme) => getStyles(theme)

class CardCollectionMain extends Component
{
    constructor(props)
    {
        super(props)
        props.setActiveTab('collection')
    }

    render()
    {
        const {classes} = this.props;

        return (
            <span>
                <Grid container spacing={2} className={classes.root}>
                    <Grid item xs={12}>
                        <main style={{height: '75vh', backgroundColor:'red'}}>
                            
                        </main>
                    </Grid>
                </Grid>

                <div className={classes.contentSpacer} />
                <AppBar className = {classes.bottomAppBar} >
                    <Toolbar variant="dense">
                        bottom-bar
                    </Toolbar>
                </AppBar>
            </span>
        )
    }
}

export default withStyles(useStylesLOC)(CardCollectionMain)