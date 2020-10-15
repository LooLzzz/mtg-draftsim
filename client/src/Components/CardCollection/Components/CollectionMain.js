import React, { Component } from 'react'
import { AppBar, Breadcrumbs, Toolbar } from '@material-ui/core';
import { Cardlist, CardSearchbox } from '.'
import { Link } from 'react-router-dom';

import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import getStyles from './styles'

const useStylesLOC = (theme) => getStyles(theme)

class CollectionMain extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            // cardlist: [
            //     {
            //         name: 'test1',
            //         foil: true,
            //         count: 1,
            //         cmc: '3U',
            //         imageUrl: "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=141853&type=card",
            //     },
            //     {
            //         name: 'test2',
            //         foil: false,
            //         count: 1,
            //         cmc: '3U',
            //         price: '22$',
            //         imageUrl: "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=141822&type=card",
            //     },
            // ],
            // cardlist: props.userData.collection,
            cardlist: [],
            cols: [
                'foil',
                'count',
                'cardName',
                'cmc',
                'price',
                'options'
            ],
        }

        console.log(props)
    }

    handleSearchResult = (res) =>
    {
        console.log('got result from searchbox:', res)
    }

    setCardImageUrl = (newVal) =>
    {
        this.setState({cardImageUrl: newVal})
    }

    render()
    {
        const {classes} = this.props

        return (
            <>
                <div className={classes.topPanelContainer}>
                    <div>
                        <Breadcrumbs style={{fontSize:'0.9rem'}}>
                            <Link to='/collection'>
                                Collection
                            </Link>
                            <a style={{cursor: 'pointer'}}>
                                <b>My Collection</b>
                            </a>
                        </Breadcrumbs>
                    </div>
                    <div>
                        <CardSearchbox
                            onResult = {this.handleSearchResult}
                        />
                    </div>
                </div>

                <div className={classes.root}>
                    <div className={classes.leftPanelContainer}>
                        <div className={classes.cardPreviewContainer}>
                            <img className={classes.cardPreview}
                                //TODO get card image from onMouseHover
                                alt = 'preview'
                                src = {
                                    this.state.cardImageUrl
                                        ? this.state.cardImageUrl
                                        : 'https://www.slightlymagic.net/forum/download/file.php?id=11045&sid=aabe7772e0c31bd3202bbc27ad7925cb&mode=view'
                                }
                            />
                        </div>
                    </div>

                    <div className={classes.rightPanelContainer}>
                        <Cardlist 
                            cols = {this.state.cols} 
                            cardlist = {this.state.cardlist} 
                            header = 'Collection' 
                            setCardImageUrl = {this.setCardImageUrl}
                        />
                    </div>
                </div>
                
                <div className={classes.contentSpacer} />
                <AppBar className = {classes.bottomAppBar} >
                    <Toolbar variant="dense">
                        collection-info
                    </Toolbar>
                </AppBar>
            </>
        )
    }

}

export default withRouter(withStyles(useStylesLOC)(CollectionMain))