import React, { Component } from 'react'
import './style.css'

const fact = 0.7;
const cardWidth = 265;
const cardHeight = 370;


export default class CardCol extends Component
{
    // constructor(props)
    // {
    //     super(props);
    //     this.state = {
    //         ...props,
    //     }
    // }

    render()
    {
        return (
            <ul
                className = 'col'
                style = {{
                    marginBlockStart: cardHeight * fact * 0.89,
                    display: this.props.cards.length===0 ? 'none' : 'flex',
                }}
            >
                {
                    this.props.cards?.map(( (card, i) => (
                        <li
                            onClick = { e => this.props.handleClick(e, i, this.props.colId) }
                            key = {i}
                            className = 'item'
                            style = {{
                                backgroundImage: `url(${card.image_uris.normal})`,
                                height: cardHeight * fact,
                                width: cardWidth * fact,
                                marginTop: -cardHeight * fact * 0.89,
                            }}
                        />)))
                }

                {/* <CardBox cardData = {} /> */}
            </ul>
        )
    }
}