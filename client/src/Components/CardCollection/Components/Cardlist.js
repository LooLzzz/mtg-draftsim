import React, { Component } from 'react'
import { IconButton, InputBase, Typography } from '@material-ui/core'
import { ArrowDropDownCircleOutlined as ArrowDropDownCircleOutlinedIcon } from '@material-ui/icons'
import clsx from 'clsx'

import { withStyles } from '@material-ui/core/styles'
import getStyles from './styles'
const useStyles = (theme) => getStyles(theme)

// function randInt(min, max)
// {
//     //TODO remove this
//     return Math.round(min + Math.random() * (max - min))
// }

function stripStr(str, chars)
{
    if (chars === "]") chars = "\\]";
    if (chars === "\\") chars = "\\\\";
    
    return String(str).replace(new RegExp(
      "^[" + chars + "]+|[" + chars + "]+$", "g"
    ), "");
}

/**
 * expects cols props.
 * cols is an array that can contain each one of:
 * [
 *   'foil',
 *   'count',
 *   'cardName',
 *   'cmc',
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
            mouseOn: null,
            // cardlist: props.cardlist, //TODO get cardlist from localstorage
        }
    }

    handleOnMouseLeave = (e) =>
    {
        this.setState({mouseOn: null})
        this.props.setCardImageUrl(null)
    }

    handleOnMouseEnter = (e, i) =>
    {
        this.setState({mouseOn: i})
        this.props.setCardImageUrl(this.state.cardlist[i].imageUrl)
    }

    render()
    {
        const {classes} = this.props

        return (
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
                            <Typography component='td' color='textSecondary' className={classes.count} hidden={!this.state.cols.includes('count')} >
                                <InputBase
                                    value = {item.count}
                                    // defaultValue = {item.count}
                                    // defaultValue = {randInt(0,4)+'x'}
                                    onClick = { e => {
                                        e.currentTarget.children[0].value = stripStr(e.currentTarget.children[0].value, 'x')
                                    }}
                                    onBlur = { e => {
                                        let val = e.currentTarget.value
                                        if (Number(val))
                                            e.currentTarget.value += 'x'
                                        else
                                        {
                                            val = String(val).toLowerCase()
                                            
                                            e.currentTarget.value = (
                                                val.match('^[0-9]+x+$')
                                                    ? val.substring(0, val.indexOf('x')) + 'x'
                                                    : '1x'
                                            )
                                        }
                                    }}
                                    onKeyDown = { e => {
                                        if (e.key === 'Enter')
                                            e.target.blur()
                                    }}
                                />
                            </Typography>
                            <Typography color='textPrimary' component='td' className={clsx('alignLeft', classes.cardName)} hidden={!this.state.cols.includes('cardName')} >
                                {item.name}
                            </Typography>
                            <Typography component='td' color='textSecondary' className={clsx('alignRight', classes.cmc)} hidden={!this.state.cols.includes('cmc')} >
                                {item.cmc}
                            </Typography>
                            <Typography component='td' color='textSecondary' className={clsx('alignRight', classes.price)} hidden={!this.state.cols.includes('price')} >
                            {
                                item.price
                                    ? item.price
                                    : '-'
                            }
                            </Typography>
                            <Typography component='td' color='textSecondary' hidden={!this.state.cols.includes('options')} >
                                <IconButton size='small' color={this.state.mouseOn === i ? 'default' : 'secondary'} >
                                    <ArrowDropDownCircleOutlinedIcon /> {/* //TODO add dropdown list with options */}
                                </IconButton>
                            </Typography>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        )
    }
}

export default withStyles(useStyles)(Cardlist)