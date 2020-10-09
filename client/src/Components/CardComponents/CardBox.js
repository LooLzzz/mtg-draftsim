/*eslint no-unused-vars: "off"*/

import React, { useState } from 'react'
import './style.css'
// import { makeStyles } from '@material-ui/core/styles';
import { useMouseMove } from 'Hooks';

// const useStyles = makeStyles((theme) => getStyles(theme));
const fact = 0.65;
const cardWidth = 265;
const cardHeight = 370;

//gets a card datatype from scryfall api
export default function CardBox(props)
{
    // const classes = useStyles();
    
    const { image_uris, name } = !!props.cardData ? props.cardData : {};
    const [ sizeFactor, setSizeFactor ] = useState(props.fact, fact);
    const { mouseX, mouseY, handleMouseMove } = useMouseMove();
    const [ showHover, setShowHover ] = useState(false);
    const [ timer, setTimer ] = useState(null);

    function handleMouseEnter(e)
    {
        setTimer(setTimeout(() => {
            setShowHover(true);
        }, 500));
    }

    function handleMouseLeave(e)
    {
        clearTimeout(timer);
        setShowHover(false);
    }

    return (
        // <span>
            <span
                className = 'card'
                alt = {name}
                onMouseMove = {handleMouseMove}
                onMouseEnter = {handleMouseEnter}
                onMouseLeave = {handleMouseLeave}
                style = {{
                    width: cardWidth * sizeFactor,
                    height: cardHeight * sizeFactor,
                    backgroundImage: `url(${image_uris.normal})`,
                }}
            />
            /* <img
                className = 'hoverCard'
                src = {image_uris.normal}
                alt = {name}
                style = {{
                    display: showHover ? '' : 'none',
                    left: mouseX + 5,
                    top: mouseY-cardHeight - 5,
                }}
            /> */
        // </span>
    )
}