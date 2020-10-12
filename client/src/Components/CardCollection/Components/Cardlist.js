import React, { Component } from 'react'
import { IconButton, InputBase, Typography } from '@material-ui/core'
import { ArrowDropDownCircleOutlined as ArrowDropDownCircleOutlinedIcon } from '@material-ui/icons'
import clsx from 'clsx'

import { withStyles } from '@material-ui/core/styles'
import getStyles from './styles'
const useStyles = (theme) => getStyles(theme)

//TODO remove this
function randInt(min, max)
{
    return Math.round(min + Math.random() * (max - min))
}

function stripStr(str, chars)
{
    if (chars === "]") chars = "\\]";
    if (chars === "\\") chars = "\\\\";
    
    return String(str).replace(new RegExp(
      "^[" + chars + "]+|[" + chars + "]+$", "g"
    ), "");
}

class Cardlist extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            ...props,
            mouseOn: null,
            cardlist: [...Array(randInt(10,50)).keys()], //TODO get cardlist from localstorage
        }
    }

    render()
    {
        const {classes} = this.props

        return (
            <table>
                <thead>
                    <tr>
                        <Typography component='td' colSpan='6' variant='h6' >
                            Header
                        </Typography>
                    </tr>
                </thead>
                <tbody onMouseLeave={e => this.setState({mouseOn: null})}>
                {
                    this.state.cardlist.map( (item, key) => (
                        <tr key={key} id={key} onMouseEnter={e => this.setState({mouseOn: key})} >
                            <Typography component='td' color='textSecondary' className={classes.foil} >
                                
                            </Typography>
                            <Typography component='td' color='textSecondary' className={classes.count} >
                                <InputBase
                                    defaultValue = {randInt(0,4)+'x'}
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
                                            if (val.match('^[0-9]+x+$'))
                                                e.currentTarget.value = val.substring(0, val.indexOf('x')) + 'x'
                                            else
                                                e.currentTarget.value = '1x'
                                        }
                                    }}
                                    onKeyDown = { e => {
                                        if (e.key === 'Enter')
                                            e.target.blur()
                                    }}
                                />
                            </Typography>
                            <Typography color='textPrimary' component='td' className={clsx('alignLeft', classes.cardName)} >
                                {key}
                            </Typography>
                            <Typography component='td' color='textSecondary' className={clsx('alignRight', classes.cmc)} >
                                cmc
                            </Typography>
                            <Typography component='td' color='textSecondary' className={clsx('alignRight', classes.price)} >
                                {/* {randInt(0,9)}$ */}
                                9$
                            </Typography>
                            <Typography component='td' color='textSecondary'>
                                <IconButton size='small' color={this.state.mouseOn === key ? 'default' : 'secondary'} >
                                    <ArrowDropDownCircleOutlinedIcon />
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