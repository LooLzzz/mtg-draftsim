/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { AppBar, Breadcrumbs, Toolbar } from '@material-ui/core';
import { Cardlist, CardSearchbox } from '.'
import { Link } from 'react-router-dom';
import { CollectionService } from 'Auth';
import { MtgCard } from 'Objects/';
import cardBackImage from 'Resources/images/cardback.jpg'

import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import getStyles from './styles'

const useStylesLOC = (theme) => getStyles(theme)

const foilBackgroundCSS = `
    linear-gradient(
        -45deg,
        rgba(255,0,0,0.15) 0%,
        rgba(255,0,178,0.15) 16%,
        rgba(9,0,255,0.15) 32%,
        rgba(3,255,250,0.15) 50%,
        rgba(3,255,68,0.15) 66%,
        rgba(179,255,3,0.15) 82%,
        rgba(255,3,3,0.15) 100%
    )`

class CollectionMain extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            cols: [
                'foil',
                'count',
                'cardName',
                'mana_cost',
                'price',
                'set',
                'options'
            ],
        }

        this.listenersAddCard = []
        this.listenersSetCardlist = []

        CollectionService.getCollectionData()
            .then(collection => {
                this.setState({
                    collectionId: collection.id,
                    cardlist: collection.cards,
                })

                this.notifySetCardlist(collection.cards)
            })

        // console.log(props) //DEBUG
    }

    handleSearchResult = async (res) =>
    {
        // console.log('got result from searchbox:', res) //DEBUG
        
        let {cardlist} = this.state
        let {data} = await MtgCard.getCard(res)
        
        let card = {
            ...data,
            foil: false,
            count: 1,
        }

        cardlist.push(card)
        
        // console.log('from scryfall:', card) //DEBUG

        // this.setState({cardlist})
        this.notifyAddCard(card)
    }

    notifySetCardlist = (cardlist) =>
    {
        this.listenersSetCardlist.forEach((listener) => listener(cardlist))
    }

    notifyAddCard = (card) =>
    {
        this.listenersAddCard.forEach((listener) => listener(card))
    }

    listenAddCard = (listener) =>
    {
        this.listenersAddCard.push(listener)
    }

    listenSetCardlist = (listener) =>
    {
        this.listenersSetCardlist.push(listener)
    }

    setCardImage = (url, foil) =>
    {
        if (url)
            this.setState({cardImage: {url, foil}})
        else
            this.setState({cardImage: {url:cardBackImage, foil:false}})
    }

    render()
    {
        const {classes} = this.props

        return (
            <>
                <div className={classes.topPanelContainer} style={{minWidth:'800px', width: '50vw'}}>
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

                <div className={classes.root} style={{minWidth:'800px', width: '50vw'}}>
                    <div className={classes.leftPanelContainer}>
                        <div className={classes.cardPreviewContainer}>
                            <div
                                className = {classes.cardPreview}
                                style = {{
                                    backgroundSize: 'cover',
                                    backgroundImage: (
                                        this.state.cardImage?.foil
                                            ? `${foilBackgroundCSS}, url(${this.state.cardImage?.url})`
                                            : `url(${this.state.cardImage?.url})`
                                    )
                                }}
                            >
                                <img
                                    className = {classes.cardPreview}
                                    alt = 'preview'
                                    src = {cardBackImage}
                                    style = {{
                                        opacity: this.state.cardImage ? 0 : 1
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={classes.rightPanelContainer}>
                        <Cardlist 
                            cols = {this.state.cols} 
                            // cardlist = {this.state.cardlist}
                            header = 'Collection' 
                            setCardImage = {this.setCardImage}
                            listenAddCard = {this.listenAddCard}
                            listenSetCardlist = {this.listenSetCardlist}
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