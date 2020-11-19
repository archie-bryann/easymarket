import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

function Empty({clientRootUrl,children}) {
    return (
        <Fragment>
            <div className = "container center-div">
                <img src  = {`${clientRootUrl}images/8-2-fearful-emoji-png.png`} width = "180px" alt = "" />
                <h4>{children}</h4>
                <p>Click below to start shopping now.</p>
                <Link to = "/categories" className = "btn" style = {{marginTop:'10px'}}>Start shopping</Link>
            </div>
            <div style = {{height:'180px'}}></div>
        </Fragment>
    )
}

export default Empty
