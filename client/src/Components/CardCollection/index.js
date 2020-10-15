import React, { Component } from 'react'
import { DeckView, CollectionMain } from './Components'
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
    
    async componentDidUpdate(oldProps, oldState)
    {
        if (this.state !== oldState)
        {
            let isLoggedIn = await this.props.isLoggedIn()
            
            if (!isLoggedIn)
                this.props.history.push('/')
        }
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
                    <Link to={'/collection/main'}>
                        to collection
                    </Link>
                    <br />
                    <Link to={'/collection/deck'}>
                        to deck view
                    </Link>
                </Route>
                <Route exact path='/collection/main'>
                    <CollectionMain {...this.props} />
                </Route>
                <Route path = {'/collection/deck'}>
                    <DeckView {...this.props} />
                </Route>
            </Switch>
            </>
        )
    }
}

export default withRouter(withStyles(useStyles)(CardCollection))