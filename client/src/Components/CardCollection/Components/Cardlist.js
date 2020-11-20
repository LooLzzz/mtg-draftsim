/* eslint-disable default-case */
import React, { Component } from 'react'
import { IconButton, InputBase, Menu, MenuItem, Typography, Grow } from '@material-ui/core'
import { ArrowDropDownCircleOutlined as ArrowDropDownCircleOutlinedIcon } from '@material-ui/icons'
import clsx from 'clsx'
import { MtgCard } from 'Objects'

import { withStyles } from '@material-ui/core/styles'
import getStyles from './styles'
const useStyles = (theme) => getStyles(theme)

function stripStr(str, chars)
{
    if (chars === "]") chars = "\\]";
    if (chars === "\\") chars = "\\\\";
    
    return String(str).replace(new RegExp(
      "^[" + chars + "]+|[" + chars + "]+$", "g"
    ), "");
}

async function scryfallPopulate(card)
{
    if (card.image_uris)
        return card
    
    let res = await MtgCard.getCard(card.name, card.set)
    
    // console.log(res)
    return {
        ...res.data,
        ...card,
    }
}

/**
 * expects cols props.
 * cols is an array that can contain each one of:
 * [
 *   'foil',
 *   'count',
 *   'cardName',
 *   'mana_cost',
 *   'price',
 *   'options'
 * ]
 */
class Cardlist extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            ...props,
            cardlist: [],
            mouseOn: null,
            menuOpen: false,
            anchorEl: null,
            selectedIndex: -1,
        }
        
        props.listenAddCard(this.addCard)
        props.listenSetCardlist(this.setCardlist)
    }

    addCard = async (newCard) =>
    {
        // console.log('got card from sub:', card) //DEBUG
        let {cardlist} = this.state
        let flag = false
        for (let i = 0; i < cardlist.length; i++)
        {
            const card = cardlist[i]
            if (card.name === newCard.name)
                if (card.set === newCard.set)
                    if (card.foil === newCard.foil)
                        {
                            // console.log(this.countRefs[i])
                            // console.log(this.countRefs[i].current)
                            // this.countRefs[i].current.value++
                            cardlist[i].count++
                            flag = true
                            break
                        }
        }

        if (!flag)
        {
            newCard = await scryfallPopulate(newCard)
            cardlist.push(newCard)
        }
        // console.log(cardlist)
        this.setState({cardlist})
    }

    setCardlist = async (cardlist) =>
    {
        let populatedList = []
        for (const card of cardlist)
            populatedList.push(await scryfallPopulate(card))
        this.setState({cardlist: populatedList})
    }

    // async componentDidUpdate(oldProps, oldState)
    // {
    //     console.log('oldProps', oldProps.cardlist)
    //     console.log('props', this.props.cardlist)

    //     if (this.props.cardlist !== oldState.cardlist)
    //     {
    //         this.setState({cardlist: this.props.cardlist})

    //         let populatedList = []
    //         for (const card of this.props.cardlist)
    //             populatedList.push(await scryfallPopulate(card))
                
    //         // console.log('populated list:', populatedList) //DEBUG
    //         this.setState({cardlist: populatedList})
    //     }
    // }

    setToSpan = (set, rarity) =>
    {
        set = 'ss-' + set.toLowerCase()
        rarity = rarity ? 'ss-' + rarity.toLowerCase() : ''

        return (
            <span
                className = {`ss ${set} ${rarity}`}
                style = {{
                    fontSize: '0.9rem',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    // backgroundBlendMode: 'color',
                    borderRadius: '100%',
                    padding: '0.1rem',
                    // border: 'solid white 1px',
                }}
            />
        )
    }

    genPriceLabel = (prices, foil) => {
        if (prices)
        {
            if (foil)
                return prices.usd_foil ? prices.usd_foil+'$' : '-'
            //else if (!item.foil)
            return prices.usd ? prices.usd+'$' : '-'
        }
        return '-'
    }

    manaCostToSpan = (manaCost) =>
    {
        // ms ms-shadow ms-cost
        if (!manaCost)
            return '-'
            //return <span>-</span>
            //return null
        
        let costs = manaCost.match(/[a-zA-z0-9]+/g)

        return costs.map((cost, i) => (
            <span
                key = {i}
                className = {'ms ms-shadow ms-cost ms-' + cost.toLowerCase()}
                style = {{
                    marginLeft: '0.2rem'
                }}
            />
        ))
    }

    handleCountChange = (e, i) =>
    {
        let {cardlist} = this.state
        cardlist[i].count = e.currentTarget.value
        this.setState({cardlist})

        // let val = e.currentTarget.value
        // if (Number(val))
        //     e.currentTarget.value += 'x'
        // else
        // {
        //     val = String(val).toLowerCase()
         
        //     e.currentTarget.value = (
        //         val.match(/^[0-9]+x+$/g)
        //             ? val.substring(0, val.indexOf('x')) + 'x'
        //             : '1x'
        //     )
        // }
    }

    handleOnMouseLeave = (e) =>
    {
        this.setState({mouseOn: null})
        // this.props.setCardImage(null)
    }

    handleOnMouseEnter = (e, i) =>
    {
        this.setState({mouseOn: i})
        this.props.setCardImage(this.state.cardlist[i]?.image_uris?.normal, this.state.cardlist[i].foil)
    }

    handleMenuOpen = (e, i) =>
    {
        this.setState({
            anchorEl: e.target,
            menuOpen: true,
            selectedIndex: i,
        })
    }

    handleMenuClose = (e, i) =>
    {
        this.setState({
            anchorEl: null,
            menuOpen: false,
            selectedIndex: -1,
        })
    }

    handleMenuItemClick = (e, v, i) =>
    {
        v = v.toLowerCase()
        if (v.includes('set'))
        {
            //TODO popup menu to change set of the card
        }
        else if (v.includes('foil'))
        {
            let cardlist = this.state.cardlist
            cardlist[i].foil = !cardlist[i].foil
            this.setState({cardlist})
            this.handleOnMouseEnter(e, i)
        }
    }

    render()
    {
        const {classes} = this.props

        return (
            <>
                <table>
                    <thead>
                        <tr>
                            <Typography component='td' colSpan='6' variant='h6' >
                                {this.props.header}
                            </Typography>
                        </tr>
                    </thead>
                    <tbody onMouseLeave={this.handleOnMouseLeave}>
                    {
                        this.state.cardlist.map( (item, i) => (
                            <tr key={i} onMouseEnter={e => this.handleOnMouseEnter(e, i)} >
                                {/* FOIL */}
                                <Typography component='td' color='textSecondary' className={classes.foil} hidden={!this.state.cols.includes('foil')}
                                    style = {
                                        item.foil
                                            ? {
                                                backgroundImage: 'linear-gradient(45deg, #FA8BFF 20%, #2BD2FF 52%, #2BFF88 80%)',
                                                borderRadius: '100% 100%'
                                            }
                                            : {}
                                    }
                                />
                                {/* SET */}
                                <Typography component='td' color='textSecondary' className={classes.set} hidden={!this.state.cols.includes('set')} >
                                    {this.setToSpan(item.set, item.rarity)}
                                </Typography>
                                {/* COUNT */}
                                <Typography component='td' color='textSecondary' className={classes.count} hidden={!this.state.cols.includes('count')} >
                                    <InputBase
                                        value = {this.state.cardlist[i].count}
                                        onChange = {e => this.handleCountChange(e, i)}
                                        onClick = { e => {
                                            e.currentTarget.children[0].value = stripStr(e.currentTarget.children[0].value, 'x')
                                        }}
                                        // onBlur = { e => {
                                        //     let val = e.currentTarget.value
                                        //     if (Number(val))
                                        //         e.currentTarget.value += 'x'
                                        //     else
                                        //     {
                                        //         val = String(val).toLowerCase()
                                                
                                        //         e.currentTarget.value = (
                                        //             val.match(/^[0-9]+x+$/g)
                                        //                 ? val.substring(0, val.indexOf('x')) + 'x'
                                        //                 : '1x'
                                        //         )
                                        //     }
                                        // }}
                                        onKeyDown = { e => {
                                            if (e.key === 'Enter')
                                                e.target.blur()
                                        }}
                                    />
                                </Typography>
                                {/* CARD NAME */}
                                <Typography color='textPrimary' component='td' className={clsx('alignLeft', classes.cardName)} hidden={!this.state.cols.includes('cardName')} >
                                    {item.name}
                                </Typography>
                                {/* MANA COST */}
                                <Typography component='td' color='textSecondary' className={clsx('alignRight', classes.mana_cost)} hidden={!this.state.cols.includes('mana_cost')} >
                                    {this.manaCostToSpan(item.mana_cost)}
                                </Typography>
                                {/* PRICE */}
                                <Typography component='td' color='textSecondary' className={clsx('alignRight', classes.price)} hidden={!this.state.cols.includes('price')} >
                                { this.genPriceLabel(item.prices, item.foil) }
                                </Typography>
                                {/* OPTIONS */}
                                <Typography component='td' color='textSecondary' hidden={!this.state.cols.includes('options')} >
                                    <IconButton size='small' color={this.state.mouseOn === i ? 'default' : 'secondary'} onClick={e => this.handleMenuOpen(e, i)}>
                                        <ArrowDropDownCircleOutlinedIcon /> {/* //TODO add dropdown list with options */}
                                    </IconButton>
                                </Typography>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                <Menu
                    keepMounted
                    getContentAnchorEl = {null} //needed to stop the menu from breaking :shrug:
                    anchorOrigin = {{
                            horizontal: 'right',
                        }}
                    // anchorPosition = {{
                    //     top: 100,
                    // }}
                    anchorEl = {this.state.anchorEl}
                    open = {this.state.menuOpen}
                    onClose = {this.handleMenuClose}
                    TransitionComponent = {Grow}
                >
                {
                    ['Change Set', 'Toggle Foil'].map( (v, i) =>
                        <MenuItem
                        dense
                        key = {i}
                        onClick = {e => this.handleMenuItemClick(e, v, this.state.selectedIndex)}
                        >
                            {v}
                        </MenuItem>
                    )
                }
                </Menu>
            </>
        )
    }
}

export default withStyles(useStyles)(Cardlist)