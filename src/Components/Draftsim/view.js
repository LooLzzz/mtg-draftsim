import React from 'react';
import './style.css'

//this is the view logic
//using passed {...props}
function View(props) {
    return (
        <div>
            <p>
                hello im class { props.className }
            </p>
        </div>
    )
}

export default View;