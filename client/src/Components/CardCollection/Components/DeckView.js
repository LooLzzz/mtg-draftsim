import React, { Component } from 'react'
import { AppBar, Breadcrumbs, Toolbar } from '@material-ui/core';
import Cardlist from './Cardlist';
import Masonry from 'react-masonry-css'
import { Link } from 'react-router-dom';
import CardSearchbox from './CardSearchbox';

import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import getStyles from './styles'

// import 'Resources/keyrune/css/keyrune.css'
// import 'Resources/mana/css/mana.css'

const useStylesLOC = (theme) => getStyles(theme)

function randInt(min, max)
{
    //TODO remove this
    return Math.round(min + Math.random() * (max - min))
}

class DeckView extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            ...props,
            cols: [
                'foil',
                'count',
                'cardName',
                'mana_cost',
                'price',
                'options',
            ],
        }
    }

    sortListForMason = (cardlist) =>
    {
        let newlist = []
        cardlist = cardlist.sort( (a,b) => (b.length-a.length) ) //sorted high to low
        let i = 0
        let j = cardlist.length-1
        let curr = 'L'
        let order = {
            L: 'H',
            H: 'L',
            // L2: 'L1',
        }

        while (i !== j+1)
        {
            switch (curr) {
                case 'H':
                    newlist.push(cardlist[i++])
                    break;
                
                case 'L1':
                case 'L2':
                case 'L':
                    newlist.push(cardlist[j--])
                    break;
            }
            curr = order[curr]
        }

        // console.log(newlist)
        return newlist
    }

    handleSearchResult = res =>
    {
        console.log('got result from search box:', res)
    }

    render()
    {
        const {classes} = this.props;

        return (
            <>
                <div className={classes.topPanelContainer}>
                    <div>
                        <Breadcrumbs style={{fontSize:'0.9rem'}}>
                            <Link to='/collection'>
                                Collection
                            </Link>
                            <a style={{cursor:'pointer'}}>
                                <b>Deck View</b>
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
                                alt = "preview"
                                src = "https://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=141818&type=card"
                            />
                        </div>
                    </div>

                    <div className={classes.rightPanelContainer}>
                        {/* //TODO add a map function for splitting the overall cardlist to different, smaller cardlists */}
                        <Masonry
                            className = {classes.masonryGrid}
                            columnClassName = {classes.masonryGridColumn}

                            breakpointCols = {{
                                default: 5,
                                1600: 4,
                                1400: 3,
                                1175: 2,
                                900: 1,
                            }}
                        >
                        {
                            this.sortListForMason(
                                [
                                    // [...Array(randInt(5,30)).keys()],
                                    // [...Array(randInt(5,30)).keys()],
                                    // [...Array(randInt(5,30)).keys()],
                                    // [...Array(randInt(5,30)).keys()],
                                    // [...Array(randInt(5,30)).keys()],
                                    // [...Array(randInt(5,30)).keys()],
                                ]
                            ,2)
                                .map( (list, i) =>
                                    <Cardlist key={i} cols={this.state.cols} cardlist={list} header={'List '+i} />
                                )


                            // [ //TODO add some array view logic
                            // // <Cardlist cardList={[...Array(randInt(5,30)).keys()]} header='List 1' key='1' />,
                            // // <Cardlist cardlist={[...Array(15).keys()]} header='List 1' key='1' />,
                            // // <Cardlist cardlist={[...Array(5).keys()]} header='List 2' key='2' />,
                            // // <Cardlist cardlist={[...Array(5).keys()]} header='List 3' key='3' />,
                            // ]
                        }
                        </Masonry>
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

export default withRouter(withStyles(useStylesLOC)(DeckView))