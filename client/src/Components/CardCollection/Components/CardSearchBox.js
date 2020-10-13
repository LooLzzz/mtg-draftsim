/* eslint-disable no-unused-vars */

import React, { Component } from 'react'

import { CircularProgress, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Promise from 'bluebird'
import isEmpty from 'is-empty'
import { MtgCard } from 'Objects'

import { withStyles } from '@material-ui/core/styles';
import getStyles from './styles'
const useStyles = (theme) => getStyles(theme)

Promise.config({cancellation: true})

class CardSearchbox extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            // ...props,
            options: [],
            loading: false,
            val: '',
        }
        // this.inputRef = React.createRef()
        this.handleResult = props.onResult
        this.searchPromise = Promise.resolve() // Dummy promise to avoid null checks
        // this.val = ''
    }
    
    handleChange = (e, v) => 
    {
        if (!this.state.loading)
            this.handleResult(v)
    }

    handleKeyPress = async (e) =>
    {
        // console.log('val:', this.state.val)
        if (e.key === 'Enter')// && !this.state.val)
        {
            if (this.state.loading)
            {
                e.persist()
                await this.searchPromise
            }
            let val = isEmpty(this.state.options) ? null : this.state.options[0]
            this.handleResult(val)
            this.setState({val})
            // console.log(e.target)
            // e.target.blur()
        }
        // else if (e.key === 'Escape')
        //     this.setState({options: []})
    }

    // handleBlur = (e) =>
    // {
    //     if (this.state.loading)
    //         this.setState({loading: false})
    // }

    handleInputChange = (e, v) =>
    {
        this.searchPromise.cancel()

        if (isEmpty(v))
        {
            this.setState({
                loading: false,
                options: [],
            })
        }
        else
        {
            this.setState({loading:true})

            this.searchPromise = (
                MtgCard.autocomplete(v)
                    .then( (res) => {
                        // console.log('this should happen only once')
                        this.setState({options: res})
                        this.setState({loading: false})
                    })
                    // .finally( () => {
                    //     if (!this.searchPromise.isCancelled()) //.isCancelled() doesnt work for some reason #shrug
                    //         this.setState({loading:false})
                    // })
            )
        }
    }

    render()
    {
        const {classes} = this.props
        
        return (
            <Autocomplete
                freeSolo
                clearOnEscape
                id = 'card-searchbox'
                options = {this.state.options}
                value = {this.state.val}
                onKeyPress = {this.handleKeyPress}
                onChange = {this.handleChange}
                onInputChange = {this.handleInputChange}
                // onKeyDown = {this.handleKeyDown}
                // onBlur = {this.handleBlur}
                loading = {this.state.loading}
                style = {{
                    maxWidth: '275px',
                    width: '33vw',
                }}
                renderInput = {(params) => (
                    <TextField
                        {...params}
                        // autoFocus
                        variant = 'outlined'
                        margin = 'dense'
                        label = 'Card Search'
                        placeholder = 'e.g, Lightning Greaves'
                        InputLabelProps = {{
                            ...params.InputLabelProps,
                            className: classes.searchBoxLabel
                        }}
                        InputProps = {{
                            ...params.InputProps,
                            // ref: this.inputRef,
                            className: classes.searchBoxInput,
                            style: {
                                paddingRight: '1rem',
                            },
                            endAdornment: (
                                <div style={{position:'relative'}}>
                                    { this.state.loading ? <CircularProgress style={{position:'relative', top:'0.1em', right:'2.1em'}} color="inherit" size={18} /> : null }
                                    { params.InputProps.endAdornment }
                                </div>
                            )
                        }}
                    />
                )}
            />
        )
    }
}

export default withStyles(useStyles)(CardSearchbox)