import React, { Component } from 'react'
import './style.css'

const fact = 0.7;
const cardWidth = 265;
const cardHeight = 370;

export default class CardCol extends Component
{
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
                            onClick = { e => this.props.handleClick(e, this.props.colId, i) }
                            onMouseEnter = { e => this.props.handleMouseEnter(e, this.props.colId, i) }
                            onMouseLeave = { e => this.props.handleMouseLeave(e) }
                            onMouseMove = { e => this.props.handleMouseMove(e, this.props.colId, i) }
                            key = {i}
                            className = 'item'
                            style = {{
                                backgroundImage: (
                                    card.foil ? //if (card.foil)
                                        `linear-gradient(45deg,
                                            rgba(255,0,0,0.25) 0%,
                                            rgba(255,0,178,0.25) 16%,
                                            rgba(9,0,255,0.25) 32%,
                                            rgba(3,255,250,0.25) 50%,
                                            rgba(3,255,68,0.25) 66%,
                                            rgba(179,255,3,0.25) 82%,
                                            rgba(255,3,3,0.25) 100%),
                                        url(${card.image_uris.normal})`
                                    : //else
                                        `url(${card.image_uris.normal})`
                                ),
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