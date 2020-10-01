import React, { Component } from 'react'
import { MtgCard } from '../'
import { withStyles } from '@material-ui/core/styles';
import getStyles from './styles'
import 'Resources/keyrune/css/keyrune.css'
import 'Resources/mana/css/mana.css'
import { AppBar, Toolbar } from '@material-ui/core';

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
                <main style={{height: '100vh', backgroundColor:'red'}}>
                    
                </main>

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
// export default CardCollectionMain