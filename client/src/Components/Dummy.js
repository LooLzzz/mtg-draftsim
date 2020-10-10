import React, { Component } from "react"

export default class Dummy extends Component
{
    render()
    {
        return (
            <div className={this.props?.className} style={this.props?.style}>
                {this.props.children}
            </div>
        )
    }
}