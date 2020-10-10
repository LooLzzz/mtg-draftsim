import React, { Component } from 'react'
import { AppBar, Grid, Toolbar, Typography } from '@material-ui/core';
import CardlistTable from './CardlistTable';

import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import getStyles from './styles'

import { MtgCard } from 'Objects'
import 'Resources/keyrune/css/keyrune.css'
import 'Resources/mana/css/mana.css'

const useStylesLOC = (theme) => getStyles(theme)

class CardCollectionMain extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            ...props,
        }
        props.setActiveTab('collection')
    }

    render()
    {
        const {classes} = this.props;

        return (
            <>
                <div className={classes.root} /* flex container */ >
                    <div className={classes.leftPanelContainer}>
                        <div className={classes.cardPreviewContainer}>
                            <img className={classes.cardPreview}
                                //TODO get card image from onMouseHover
                                src="https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=141818&type=card"
                            />
                        </div>
                    </div>

                    <div className={classes.rightPanelContainer}>
                        {/* <div className={classes.cardlistContainer}> */}
                            <CardlistTable />
                        {/* </div> */}
                    </div>
                </div>

                <div className={classes.contentSpacer} />
                <AppBar className = {classes.bottomAppBar} >
                    <Toolbar variant="dense">
                        bottom-bar
                    </Toolbar>
                </AppBar>
            </>
        )
    }
}

export default withRouter(withStyles(useStylesLOC)(CardCollectionMain))