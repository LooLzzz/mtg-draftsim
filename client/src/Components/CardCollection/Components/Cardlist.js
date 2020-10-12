import React, { Component } from 'react'
import { Typography } from '@material-ui/core'
import clsx from 'clsx'
// import { DataGrid } from '@material-ui/data-grid'
// import { Dummy } from 'Components'

import { withStyles } from '@material-ui/core/styles'
import getStyles from './styles'
const useStyles = (theme) => getStyles(theme)

function randInt(min, max)
{
    return Math.round(min + Math.random() * (max - min))
}

class Cardlist extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            ...props,
            cols: [],
            rows: [],
            cardlist: [...Array(randInt(10,50)).keys()], //imitates card list for now
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

        this.setState({rows:rows})
    }

    render()
    {
        const {classes} = this.props

        return (
            <>
                {/* <DataGrid
                    hideFooter
                    // disableSelectionOnClick

                    rowHeight = '35'
                    rows = {this.state.rows}
                    columns = {this.state.cols}
                /> */}
                {/* <CardRow /> */}
                <table>
                    <thead>
                        <tr>
                            <Typography component='td' colSpan='6' variant='h6'>
                                section header
                            </Typography>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.cardlist.map( (item, i) => (
                            <tr key={i}>
                                <Typography component='td'>
                                    F
                                </Typography>
                                <Typography component='td'> {/* <td style={{width:'2%'}}> */}
                                    {randInt(1,4)}x
                                </Typography>
                                <Typography component='td' className={clsx('alignLeft')} >
                                    card name
                                </Typography>
                                <Typography component='td' className={clsx('alignRight')} >
                                    cmc
                                </Typography>
                                <Typography component='td'className={clsx('alignRight')} >
                                    {randInt(0,9)}$
                                </Typography>
                                <Typography component='td'>
                                    **
                                </Typography>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </>
        )
    }
}

export default withStyles(useStyles)(Cardlist)