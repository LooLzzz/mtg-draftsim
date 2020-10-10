import React, { Component } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { Dummy } from 'Components'

import { withStyles } from '@material-ui/core/styles'
import getStyles from './styles'
const useStyles = (theme) => getStyles(theme)

class CardlistTable extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            ...props,
            cols: [],
            rows: [],
            cardlist: [...Array(100).keys()], //imitates card list for now
        }
    }

    componentDidMount()
    {
        this.createCols()
        this.createRows()
    }

    createCols = () =>
    {
        let cols = [
            {field:'name', headerName:'Name'},
            {field:'cmc', headerName:'CMC'},
            {field:'price', headerName:'Price'},
        ]

        this.setState({cols:cols})
    }

    createRows = () =>
    {
        let rows = this.state.cardlist.map((item, i) => ({
            id: i,
            name: item
        }))

        console.log(rows)

        this.setState({rows:rows})
    }

    render()
    {
        const {classes} = this.props

        return (
            <Dummy className={classes.cardlistContainer} >
                <DataGrid
                    hideFooter
                    // disableSelectionOnClick

                    rowHeight = '35'
                    rows = {this.state.rows}
                    columns = {this.state.cols}
                />
            </Dummy>
        )
    }
}

export default withStyles(useStyles)(CardlistTable)