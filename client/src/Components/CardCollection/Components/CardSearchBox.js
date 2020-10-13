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
        }
        // this.inputRef = React.createRef()
        this.handleResult = props.onResult
        this.searchPromise = Promise.resolve() // Dummy promise to avoid null checks
    }
    
    // handleKeyDown = (e) =>
    // {
    //     if (e.key === 'Escape')
    //     {
    //         if (this.inputRef.current)
    //             this.inputRef.current.children[0].value = ''
    //         e.target.blur()
    //     }
    // }

    // handleBlur = (e) =>
    // {
    //     if (this.state.loading)
    //         this.setState({loading: false})
    // }

    handleInputChange = (e, value) =>
    {
        this.searchPromise.cancel()

        if (isEmpty(value))
            this.setState({loading:false})
        else
        {
            this.setState({loading:true})

            this.searchPromise = (
                MtgCard.autocomplete(value)
                    .then( (res) => {
                        // console.log('this should happen only once')
                        this.setState({options: res})
                        this.setState({loading:false})
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
                onChange = {(e,v) => this.handleResult(v)}
                onInputChange = {(e,v) => this.handleInputChange(e,v)}
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