import React, { Component } from 'react'
import { CardCollectionMain } from './Components'
import { Link, Route, Switch, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import getStyles from './styles'
const useStyles = (theme) => getStyles(theme)

class CardCollection extends Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            ...props,
        }

        props.setActiveTab('collection')
    }
    
    render()
    {
        // const { match, location, history } = this.props;
        
        return (
            <>
            {/* {console.log('match:', match)} */}
            {/* {console.log('location:', location)} */}
            {/* {console.log('history:', history)} */}

            <Switch>
                <Route exact path='/collection'>
                    <Link to={'/collection/list'}>
                        to list
                    </Link>
                </Route>
                <Route exact path = {'/collection/list'}>
                    <CardCollectionMain {...this.props} />
                </Route>
            </Switch>
            </>
        )
    }
}

export default withRouter(withStyles(useStyles)(CardCollection))