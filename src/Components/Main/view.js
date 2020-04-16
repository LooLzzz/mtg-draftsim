import React from 'react';

//this is the view logic
//using passed {...props}
function View(props) {
    return (
        <main>
            <div>
                <p>
                    { props.value }
                </p>
            </div>
        </main>
    )
}

export default View;