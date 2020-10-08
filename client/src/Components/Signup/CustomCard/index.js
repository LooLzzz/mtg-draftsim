import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles';
import getStyles from './styles'
import { Divider, Paper } from '@material-ui/core';
const useStyles = (theme) => getStyles(theme)

class CustomCard extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            ...props,
        }
    }
    
    componentDidMount()
    {
        this.setChildrenState()
    }

    componentDidUpdate(oldProps, oldState)
    {
        if (oldProps.children !== this.props.children)
            this.setChildrenState()
    }

    setChildrenState()
    {
        let children = this.props.children.reduce( (prev, curr) => {
            prev[curr.type] = curr
            return prev
        }, {})
        
        this.setState({children})
        
        // console.log(children) //DEBUG
        // return children
    }

    render()
    {
        const {classes} = this.props
        
        // console.log(this.state.children)

        return (
            <Paper className={classes.root} elevation={8} >
                <div className={classes.header} >
                    {this.state?.children.header}
                </div>
                {
                    <div className={classes.icon}>
                        {this.state?.children.icon}
                    </div>
                }
                <Divider className={classes.divider} />

                <div className={classes.bot}>
                    <div className={classes.content}>
                        {this.state?.children.content}
                    </div>
                    <div className={classes.action}>
                        {this.state?.children.action}
                    </div>
                </div>
            </Paper>
        )
    }
}

export default withStyles(useStyles)(CustomCard)