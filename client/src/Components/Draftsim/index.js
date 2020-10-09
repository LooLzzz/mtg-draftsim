/*eslint no-unused-vars: "off"*/

import React, { Component } from 'react'
import { CardCol, MtgObject } from 'Components'
import { withStyles } from '@material-ui/styles';
import getStyles from './style';

const useStyles = (theme) => getStyles(theme)

const fact = 0.7;
const cardWidth = 265;
const cardHeight = 370;

class Draftsim extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            ...props,
            mtgObj: new MtgObject(),
            cols: [],
            hoverCard: null,
            hoverCardMarginLeft: 0,
            windowWidth: 0,
            windowHeight: 0,
        };

        props.setActiveTab('draftsim')
    }
    
    componentDidMount()
    {
        // let path = window.location.pathname.substring(1)
        let params = new URLSearchParams(window.location.search);
        // console.log(path)

        this.setState({
            setId: params.get('setid') ? params.get('setid') : 'm19',
            sortBy: params.get('sortby') ? params.get('sortby') : 'color',
        });

        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions.bind(this));
    }

    componentDidUpdate(prevProps, prevState)
    {
        //TODO add option to choose 'setId'
        //TODO add option to choose 'sortBy'
        //TODO add option to choose 'numOfBoosters'

        if (prevState.setId !== this.state.setId)
            this.state.mtgObj.generateSet(this.state.setId, 6, this.state.sortBy, this);
    }
    
    updateWindowDimensions()
    {
        this.setState({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
        });
    }

    handleMouseEnter(e, colId, i)
    {
        if (colId === -1) //from deck
            this.setState({
                hoverCard: this.state.mtgObj.deck[i],
            });
        else //from pool
            this.setState({
                hoverCard: this.state.cols[colId][i],
            });
    }

    handleMainMouseMove(e)
    {
        this.setState({
            hoverCard: null,
        });
    }

    handleCardMouseMove(e, colId, i)
    {
        this.handleMouseEnter(e, colId, i); //get the card the mouse is pointing
        
        if (e.clientX > this.state.windowWidth*0.45) //display 'hoverCard' to the left
            this.setState({
                hoverCardMarginLeft: this.state.windowWidth*0.35 - cardWidth,
            });
        else //display 'hoverCard' to the right
            this.setState({
                hoverCardMarginLeft: this.state.windowWidth*0.535,
            });

        e.stopPropagation();
    }

    handleMouseLeave(e)
    {
        this.setState({
            hoverCard: null,
        });
    }

    handleCardClick(e, colId, i)
    {
        if (colId !== -1) //called from pool
        {
            this.setState( (currState, currProps) => {
                let res = {};
                let mtgObj = currState.mtgObj;
                let cols = currState.cols;
                
                let clickedCard = cols[colId].splice(i, 1)[0]; //remove the card from the cols
                mtgObj.removeCardFromPool(clickedCard); //remove the card from the pool itself
                mtgObj.deck.push(clickedCard); //add the card to the deck

                mtgObj.deck = MtgObject.sortDeck(mtgObj.deck); //sort the deck by 'color->cmc'

                if (cols[colId].length === 0) //empty col
                    res.hoverCard = null;

                // console.log('clicked card:', clickedCard); //DEBUG

                res.cols = cols;
                res.mtgObj = mtgObj;
                return res;
            });
        }
        else //if (colId === -1) //called from deck
        {
            this.setState( (currState, currProps) => {
                let res = {};
                let mtgObj = currState.mtgObj;
                
                let clickedCard = mtgObj.deck.splice(i, 1)[0]; //remove the card from the deck
                mtgObj.pool.push(clickedCard); //add the card to the pool

                let cols = MtgObject.sortToColumns(mtgObj.pool, this.state.sortBy);

                if (mtgObj.deck.length === 0) //empty col
                    res.hoverCard = null;
                
                // console.log('clicked card:', clickedCard); //DEBUG

                res.cols = cols;
                res.mtgObj = mtgObj;
                return res;
            });
        }
    }

    render()
    {
        const { classes } = this.props

        return (
            <div
                className = {classes['container-main']}
                onMouseMove = {e => this.handleMainMouseMove(e)}
            >
                <span className={classes['container-cards']}>
                {
                    Object.entries(this.state.cols).map( ([key, value]) => (
                        <CardCol
                            key = {key}
                            colId = {key}
                            handleClick = {this.handleCardClick.bind(this)}
                            handleMouseEnter = {this.handleMouseEnter.bind(this)}
                            handleMouseLeave = {this.handleMouseLeave.bind(this)}
                            handleMouseMove = {this.handleCardMouseMove.bind(this)}
                            className = "card-container"
                            cards = {value}
                            fact = {fact}
                            style = {{
                                flex: 'flex-shrink',
                            }}
                        />
                    ))
                }
                </span>
                <span
                    className = {classes['container-side']}
                    style = {{
                        width: cardWidth * fact * 1.1,
                    }}
                    >
                        <CardCol
                            colId = {-1}
                            handleClick = {this.handleCardClick.bind(this)}
                            handleMouseEnter = {this.handleMouseEnter.bind(this)}
                            handleMouseLeave = {this.handleMouseLeave.bind(this)}
                            handleMouseMove = {this.handleCardMouseMove.bind(this)}
                            className = "card-container"
                            cards = {this.state.mtgObj.deck}
                            fact = { fact + 0.05 }
                            style = {{
                                flex: 'flex-shrink'
                            }}
                        />
                </span>
                <span
                    className = {classes['container-hover']}
                    style = {{
                        display: this.state.hoverCard ? '' : 'none',
                        marginLeft: this.state.hoverCardMarginLeft,
                        backgroundImage: (
                            this.state.hoverCard ? (
                                this.state.hoverCard.foil ? //if (card.foil === true)
                                    `linear-gradient(45deg,
                                        rgba(255,0,0,0.25) 0%,
                                        rgba(255,0,178,0.25) 16%,
                                        rgba(9,0,255,0.25) 32%,
                                        rgba(3,255,250,0.25) 50%,
                                        rgba(3,255,68,0.25) 66%,
                                        rgba(179,255,3,0.25) 82%,
                                        rgba(255,3,3,0.25) 100%),
                                    url(${this.state.hoverCard.image_uris.normal})`
                                : //else
                                    `url(${this.state.hoverCard.image_uris.normal})`
                            )
                            : //else
                                    ''
                            ),
                    }}
                ></span>
            </div>
        );
    }
}

export default withStyles(useStyles)(Draftsim)