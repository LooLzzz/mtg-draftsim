import React, { Component } from 'react'

import { CircularProgress, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
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
    }
    
    handleChange = async (e, v, fromKeyDown) =>
    {
        if (fromKeyDown === true)
        {
            this.handleResult(
                isEmpty(this.state.options)
                    ? null
                    : v
            )
        }
    }

    handleKeyDown = async (e) =>
    {
        if (e.key === 'Enter')
        {
            if (this.searchPromise.isPending())
            {
                e.persist()
                try
                {
                    await this.searchPromise
                } catch (err) {}
            }
            
            let val = isEmpty(this.state.options) ? null : this.state.options[0]
            
            this.setState({val: val})
            this.handleChange(e, val, true)
        }
        // else if (e.key === 'Escape')
        //     this.setState({options: []})
    }

    handleInputChange = (e, v) =>
    {
        // if (this.searchPromise.isPending())
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

            this.searchPromise = 
                MtgCard.autocomplete(v)
                    .then( (res) => {
                        // console.log('this should happen only once')
                        this.setState({
                            loading: false,
                            options: res,
                        })
                    })
                    // .catch( (err) => console.error('autocomplete promise error:', err))
        }
    }

    render()
    {
        const {classes} = this.props
        
        return (
            <Autocomplete
                freeSolo
                clearOnEscape
                options = {this.state.options}
                value = {this.state.val}
                onChange = {this.handleChange}
                onInputChange = {this.handleInputChange}
                onKeyDown = {this.handleKeyDown}
                // onKeyPress = {this.handleKeyPress}
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