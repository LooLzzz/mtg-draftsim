import React, { Component } from 'react'
import { MtgCard } from '../'
import { withStyles } from '@material-ui/core/styles';
import getStyles from './styles'
import 'Resources/keyrune/css/keyrune.css'
import 'Resources/mana/css/mana.css'

const useStylesLOC = (theme) => getStyles(theme)

class CardCollectionMain extends Component
{
    constructor(props)
    {
        super(props)
        props.setTitle('Collection')
    }

    render() { return(
        <span>
            <i class='ss ss-iko' />
            <br />
            <i class='ms ms-cost ms-2 ms-shadow' />
            <i class='ms ms-cost ms-g ms-shadow' />
            <i class='ms ms-cost ms-w ms-shadow' />
        </span>
    )}
}

export default withStyles(useStylesLOC)(CardCollectionMain)
// export default CardCollectionMain