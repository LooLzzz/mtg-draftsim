import React, { Component } from 'react'
import { Typography } from '@material-ui/core'
// import { DataGrid } from '@material-ui/data-grid'
// import { Dummy } from 'Components'

import { withStyles } from '@material-ui/core/styles'
import getStyles from './styles'
const useStyles = (theme) => getStyles(theme)

// @withStyles(useStyles)
// class CardRow extends Component
// {
//     render()
//     {
//         const {classes} = this.props
        
//         return (
//             <div className={classes.cardRow}>
//                 <Typography variant="body2" style={{}}>
//                     1
//                 </Typography>
//                 <Typography variant="body2" style={{flexGrow:0.5}}>
//                     2
//                 </Typography>
//                 <Typography variant="body2" style={{flexGrow:6, textAlign:'left'}}>
//                     3
//                 </Typography>
//                 <Typography variant="body2" style={{flexGrow:3, textAlign:'right'}}>
//                     4
//                 </Typography>
//                 <Typography variant="body2" style={{flexGrow:3, textAlign:'right'}}>
//                     5
//                 </Typography>
//                 <Typography variant="body2" style={{flexGrow:0.5}}>
//                     6
//                 </Typography>
//             </div>
//         )
//     }
// }

class Cardlist extends Component
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
                                    isFoil
                                </Typography>
                                <Typography component='td'> {/* <td style={{width:'2%'}}> */}
                                    count
                                </Typography>
                                <Typography component='td'> {/* <td style={{textAlign:'left'}}> */}
                                    card name
                                </Typography>
                                <Typography component='td'> {/* <td style={{textAlign:'right'}}> */}
                                    cmc
                                </Typography>
                                <Typography component='td'> {/* <td style={{textAlign:'right'}}> */}
                                    price
                                </Typography>
                                <Typography component='td'>
                                    options
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