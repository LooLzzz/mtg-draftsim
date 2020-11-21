/* eslint-disable default-case, jsx-a11y/alt-text */
import React, { Component } from 'react'
import { IconButton, InputBase, Menu, MenuItem, Typography, Grow, Dialog, DialogTitle, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core'
import { ArrowDropDownCircleOutlined as ArrowDropDownCircleOutlinedIcon } from '@material-ui/icons'
import clsx from 'clsx'
import { MtgCard } from 'Objects'
import { Dummy } from 'Components'

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
            dialogOpen: false,
            anchorEl: null,
            selectedIndex: -1,
            cardSets: [],
        }
        
        props.listenAddCard(this.addCard)
        props.listenSetCardlist(this.setCardlist)
        this.previewCardRef = React.createRef()
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

    setToSpan = (set, rarity, fontSize=0.9, padding=0.1) =>
    {
        set = 'ss-' + set.toLowerCase()
        rarity = rarity ? 'ss-' + rarity.toLowerCase() : ''

        return (
            <span
                className = {`ss ${set} ${rarity}`}
                style = {{
                    fontSize: `${fontSize}rem`,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    // backgroundBlendMode: 'color',
                    borderRadius: '100%',
                    padding: `${padding}rem`
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

    genSetList = async (selectedIndex) =>
    {
        let cardSets = []
        if (selectedIndex !== -1)
            cardSets = await MtgCard.getCardSets(this.state.cardlist[selectedIndex].name)
        
        this.setState({cardSets})
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

    handleMenuItemClick = async (e, v, selectedCardIndex) =>
    {
        // console.log(this.state.cardlist[selectedCardIndex]) //DEBUG

        v = v.toLowerCase()
        if (v.includes('set'))
        {
            await this.genSetList(selectedCardIndex)
            this.setState({
                menuOpen: false,
                dialogOpen: true,
            })
        }
        else if (v.includes('foil'))
        {
            let cardlist = this.state.cardlist
            cardlist[selectedCardIndex].foil = !cardlist[selectedCardIndex].foil
            this.setState({cardlist})
            this.handleOnMouseEnter(e, selectedCardIndex)
        }
    }

    handleOnMouseMoveDialog = (e) => 
    {
        let rect = this.previewCardRef.current.getBoundingClientRect()
        
        // let mouseX = e.screenX
        // let mouseY = e.screenY
        let mouseX = e.nativeEvent.clientX
        let mouseY = e.nativeEvent.clientY

        console.log(rect)

        // e.persist()
        requestAnimationFrame( () => {
            let offsetX = (this.state.mouseX+rect.width) > window.innerWidth ? -rect.width : 0
            let offsetY = (this.state.mouseY+rect.height) > window.innerHeight ? -rect.height : 0

            this.previewCardRef.current.style.WebkitTransform = `translate(${this.state.mouseX+(offsetX+rect.width*0.05)}px, ${offsetY+this.state.mouseY+(rect.height*0.05)}px)`
            this.setState({
                // mouseX: e.nativeEvent.clientX,
                // mouseY: e.nativeEvent.clientY,
                mouseX,
                mouseY,
            })
        })
    }

    handleOnClickDialog = (e, i) =>
    {
        let cardlist = this.state.cardlist
        let newCard = this.state.cardSets[i]
        cardlist[this.state.selectedIndex] = newCard

        this.props.setCardImage(newCard?.image_uris?.normal, newCard.foil)

        this.setState({
            cardlist,
            dialogOpen: false,
            menuOpen: false,
            showCardPreview: false,
            cardSets: [],
        })
    }

    handleOnMouseLeaveDialog = (e) =>
    {
        requestAnimationFrame( () => {
            this.setState({
                showCardPreview: false,
            })
        })
    }

    handleOnMouseEnterDialog = (e, i) =>
    {
        requestAnimationFrame( () => {
            this.previewCardRef.current.src = this.state.cardSets[i]?.image_uris?.normal            
            this.setState({
                showCardPreview: true,
            })
        })
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
                                        <ArrowDropDownCircleOutlinedIcon />
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
                    ['Change a Set', 'Toggle Foil'].map( (v, i) =>
                        <MenuItem dense
                            key = {i}
                            onClick = {e => this.handleMenuItemClick(e, v, this.state.selectedIndex)}
                        >
                            {v}
                        </MenuItem>
                    )
                }
                </Menu>
                <Dialog
                    open = {this.state.dialogOpen}
                    onClose = {e => this.setState({dialogOpen:false, cardSets:[], showCardPreview:false})}
                    onMouseMove = {this.handleOnMouseMoveDialog}
                >
                    <DialogTitle>
                        Choose Set
                    </DialogTitle>
                    <List>
                    {
                        this.state.cardSets.map( (card, i) => (
                            <ListItem button dense
                                key = {i}
                                onClick = {e => this.handleOnClickDialog(e, i)}
                                onMouseEnter = {e => this.handleOnMouseEnterDialog(e, i)}
                                onMouseLeave = {this.handleOnMouseLeaveDialog}
                            >
                                <ListItemIcon>
                                    {this.setToSpan(card.set, card.rarity, 1.5, 0.2)}
                                </ListItemIcon>
                                <ListItemText>
                                    {`${card.set_name} (#${card.collector_number})`}
                                </ListItemText>
                            </ListItem>
                        ))
                    }
                    </List>
                </Dialog>
                <img
                    ref = {this.previewCardRef}
                    onMouseMove = {this.handleOnMouseMoveDialog}
                    style = {{
                        top: 0,
                        left: 0,
                        maxHeight: '311px',
                        position: 'absolute',
                        zIndex: 999999,
                        visibility: this.state.showCardPreview ? 'visible' : 'hidden',
                    }}
                />
            </>
        )
    }
}

export default withStyles(useStyles)(Cardlist)