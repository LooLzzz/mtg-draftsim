
import React, { Component } from 'react'
// import { Card } from '@material-ui/core'
import { CardCol } from 'Components'
import View from './view'
import ScryfallClient from 'scryfall-client'

const fact = 0.7;
const cardWidth = 265;
const cardHeight = 370;
const scryfall = new ScryfallClient()

function getAllCardsFromSet(setId)
{
    function collectCards(list, allCards)
    {
        allCards = allCards ? allCards : [];
        allCards.push.apply(allCards, list);

        if (!list.has_more)
            return allCards;

        return list.next().then((newList) => (
            collectCards(newList, allCards)
        ));
    }

    return scryfall.get('cards/search', {
        q: 'e:'+[setId]
    }).then(list => (
        collectCards(list)
    ))
}

function sortCardsBy(cards, by)
{
    var res = {};

    switch (by)
    {
        default: //default is sort by color
        case 'color':
            res = {
                R: [],
                G: [],
                B: [],
                U: [],
                W: [],
                multiColor: [],
                colorless: [],
                land: [],
            };

            cards.forEach(card =>
            {
                if (card.type_line.toLowerCase().includes('basic land')) //basic land
                    res.land.push(card);
                else if (card.colors.length === 0) //colorless
                    res.colorless.push(card);
                else if (card.colors.length > 1) //multiColor
                    res.multiColor.push(card)
                else //monoColor
                    res[card.colors[0]].push(card);
            });

            Object.entries(res).forEach(
                ([key, value]) => value.sort(
                    (a,b) => (a.cmc - b.cmc)))
            break;
    }
    
    return res;
}

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
            cards: {},
            setId: 'iko', //'iko' for now, should get it from a dropdown list later
        };
    }
    
    componentDidMount()
    {
        getAllCardsFromSet(this.state.setId).then(fullList => {
            this.setState({
                cards: sortCardsBy(fullList.splice(0, 85), 'color'), //TODO change this
                // cards: sortCardsBy(fullList, 'color'),
            });
        });
    }

    render()
    {
        return(
            // <View {...this.state} />
            <div className="container-main">
                <span className="container-cards">
                {
                    Object.entries(this.state.cards).map( ([key, value]) =>
                    (
                        <CardCol
                            key = {key}
                            className = "cardContainer"
                            cards = {value}
                            style = {{
                                flex: 'flex-shrink'
                            }}
                        />
                    ))
                }
                </span>
                <span
                    className = "container-side"
                    style = {{
                        width: cardWidth * fact * 1.2
                    }}
                    >
                    asd
                </span>
            </div>
        );
    }
}

export default Main;