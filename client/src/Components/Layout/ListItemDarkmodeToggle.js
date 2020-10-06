import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import { duration, Fade, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Switch } from '@material-ui/core';
import getStyles from './styles'
import {
    Brightness3 as DarkmodeIcon,
    BrightnessHigh as LightmodeIcon,
} from '@material-ui/icons'

const useStyles = (theme) => getStyles(theme);

class ListItemDarkmodeToggle extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            checked: this.props.trigger === this.props.on,
        }
        this.timeout = (
            !!this.props.timeout
            ? this.props.timeout
            : {
                enter: duration.enteringScreen,
                exit: duration.leavingScreen,
            }
        )
    }

    handleChange(event)
    {
        this.setState({
            checked: event.currentTarget.checked,
        })
        return this.props.handleChange(event)
    }

    render()
    {
        const {classes} = this.props

        return (
            <ListItem>
                <ListItemText
                    primary = {this.props.text}
                    className = {classes.listItemText}
                />
                <ListItemIcon
                    className = {classes.ListItemIcon}
                >
                    <span>
                        <Fade
                            in = {this.props.trigger.value === this.props.trigger.off}
                            timeout = {this.timeout}
                            style = {{
                                display: (
                                    this.props.trigger.value !== this.props.trigger.off
                                    ? 'none'
                                    : ''
                                ),
                                height:'100%',
                            }}
                        >
                            <LightmodeIcon />
                        </Fade>
                        <Fade
                            in = {this.props.trigger.value === this.props.trigger.on}
                            timeout = {this.timeout}
                            style = {{
                                display: (
                                    this.props.trigger.value !== this.props.trigger.on
                                    ? 'none'
                                    : ''
                                ),
                                height: '100%',
                            }}
                        >
                            <DarkmodeIcon />
                        </Fade>
                    </span>
                </ListItemIcon>
                <ListItemSecondaryAction>
                    <Switch
                        edge = 'end'
                        checked = {this.props.trigger.value === this.props.trigger.on}
                        onChange = { (event) => this.handleChange(event) }
                    />
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}

export default withRouter(withStyles(useStyles)(ListItemDarkmodeToggle))