import React, { Component } from 'react'
import './style.css'

const fact = 0.7;
const cardWidth = 265;
const cardHeight = 370;


export default class CardCol extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            ...props,
        }
    }

    componentDidUpdate(newProps)
    {
        if (this.state !== newProps.cards)
            this.setState({cards: newProps.cards});
    }

    handleClick(e, i)
    {
        // console.log(this.state.cards[i]);
    }

    render()
    {
        return (
            <ul
                className='col'
                style = {{
                    marginBlockStart: cardHeight * fact * 0.89,
                }}
            >
                {

                    this.state.cards.map(( (card, i) => (
                        <li
                            onClick = { e => this.handleClick(e, i) }
                            key = {i}
                            className = 'item'
                            style = {{
                                backgroundImage: `url(${card.image_uris.normal})`,
                                // backgroundSize: 'contain',
                                // backgroundRepeat: 'no-repeat',
                                height: cardHeight * fact,
                                width: cardWidth * fact,
                                // width: '100%',
                                marginTop: -cardHeight * fact * 0.89,
                            }}
                        />
                    )))
                }

                {/* <CardBox cardData = {} /> */}
            </ul>
        )
    }
}