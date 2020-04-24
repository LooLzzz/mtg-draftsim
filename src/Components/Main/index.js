
import React, { Component } from 'react'
// import { Card } from '@material-ui/core'
import { CardCol, MtgObject } from 'Components'
import View from './view'

const fact = 0.7;
const cardWidth = 265;
const cardHeight = 370;

/**
 * inputs:
 * { setId }
 */
class Main extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            ...props,
            className: props.className,
            mtgObj: new MtgObject(),
            cols: [],
        };
    }
    
    componentDidMount()
    {
        // getAllCardsFromSet(this.state.setId).then(fullList => {
        //     this.setState({
        //         cards: sortCardsBy(fullList.splice(0, 85), 'color'), //TODO change this
        //         // cards: sortCardsBy(fullList, 'color'),
        //     });
        // });

        this.state.mtgObj.generateSet('iko', 6, this);  //TODO add option to choose 'setId'
                                                        //TODO add option to choose 'numOfBoosters'
    }

    handlePoolClick(e, i, colId)
    {
        this.setState( (currState, currProps) => {
            let mtgObj = currState.mtgObj;
            let cols = currState.cols;
            
            let clickedCard = cols[colId].splice(i, 1)[0]; //remove the card from the cols
            mtgObj.removeCardFromPool(clickedCard); //remove the card from the pool itself
            mtgObj.deck.push(clickedCard); //add the card to the deck

            mtgObj.deck = MtgObject.sortCol(mtgObj.deck); //sort the deck by 'color->cmc'

            return {
                mtgObj: mtgObj,
                cols: cols,
            }
        });
    }

    handleDeckClick(e, i)
    {
        this.setState( (currState, currProps) => {
            let mtgObj = currState.mtgObj;
            
            let clickedCard = mtgObj.deck.splice(i, 1)[0]; //remove the card from the deck
            mtgObj.pool.push(clickedCard); //add the card to the pool

            let cols = MtgObject.sortCardsToColumns(mtgObj.pool, 'color');

            return {
                mtgObj: mtgObj,
                cols: cols,
            }
        });
    }

    render()
    {  
        return(
            // <View {...this.state} />
            <div className="container-main">
                <span className="container-cards">
                {
                    Object.entries(this.state.cols).map( ([key, value]) =>
                    (
                        <CardCol
                            key = {key}
                            colId = {key}
                            handleClick = {this.handlePoolClick.bind(this)}
                            className = "cardContainer"
                            cards = {value}
                            style = {{
                                flex: 'flex-shrink',
                            }}
                        />
                    ))
                }
                </span>
                <span
                    className = "container-side"
                    style = {{
                        width: cardWidth * fact * 1.1,
                    }}
                    >
                        <CardCol
                            handleClick = {this.handleDeckClick.bind(this)}
                            className = "cardContainer"
                            cards = {this.state.mtgObj.deck}
                            style = {{
                                flex: 'flex-shrink'
                            }}
                        />
                </span>
            </div>
        );
    }
}

export default Main;