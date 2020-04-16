import React, { Component } from 'react'
import View from './view'

//this is the main logic
class Main extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            ...props
        };
    }

    render()
    {
        return(
            <View {...this.state} />
        );
    }
}

export default Main;