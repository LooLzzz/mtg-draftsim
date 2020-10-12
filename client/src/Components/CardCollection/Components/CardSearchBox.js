/* eslint-disable no-unused-vars */

import React, { Component } from 'react'

import { CircularProgress, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios'
import Promise from 'bluebird'

// import { withStyles } from '@material-ui/core/styles';
// import getStyles from './styles'
// const useStyles = (theme) => getStyles(theme)

Promise.config({cancellation: true})

class CardSearchBox extends Component
{
    constructor(props)
    {
        //NOTE: call `props.handleResult(res)` for communication with parent
        super(props)
        this.state = {
            // ...props,
            options: [],
            loading: false,
        }
        this.searchPromise = Promise.resolve() // Dummy promise to avoid null check
    }
    
    handleChange(e)
    {
        let value = e.currentTarget.value

        this.searchPromise.cancel()
        this.setState({loading:true})

        let p = Promise.resolve(
            axios.get('https://api.scryfall.com/cards/autocomplete?q='+value)
        )
            .then( (res) => {
                this.setState({options: res.data.data})
            })
            .finally( () => {
                if (!this.searchPromise.isCancelled())
                    this.setState({loading:false})
            })

        this.searchPromise = p
    }

    render()
    {
        // const {classes} = this.props
        
        return (
            <>
                <Autocomplete
                    freeSolo
                    id = 'card-searchbox'
                    options = {this.state.options}
                    loading = {this.state.loading}
                    style = {{
                        width: '30%',
                    }}
                    renderInput = {(params) => (
                        <TextField
                            {...params}
                            variant = 'outlined'
                            margin = 'dense'
                            label = 'Card Search'
                            placeholder = 'e.g, Lightning Greaves'
                            onChange = {(e) => this.handleChange(e)}
                            InputProps = {{
                                ...params.InputProps,
                                endAdornment : (
                                    <>
                                        { this.state.loading ? <CircularProgress color="inherit" size={20} /> : null }
                                        { params.InputProps.endAdornment }
                                    </>
                                )
                            }}
                        />
                    )}
                />
            </>
        )
    }
}

export default CardSearchBox