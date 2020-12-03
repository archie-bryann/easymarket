import React, { useEffect } from 'react'
import Header from '../../components/Header/Header'
import {Link} from 'react-router-dom'

function NotAvailable({title,clientRootUrl, loggedInStatus, cartNum, token}) {
    document.title = `Page Not Found - ${title}`;

    return (
        <React.Fragment>
            <Header title = {title} clientRootUrl = {clientRootUrl}  loggedInStatus = {loggedInStatus} cartNum = {cartNum} token = {token}  />
            <div style = {{height:'50px'}}></div>
            <div className = "container center-div">
                    <img src  = {`${clientRootUrl}images/Crying Sad Emoji.png`} width = "185px" alt = "" />
                    <h4>Opps! We are sorry.</h4>
                    <p>Our mobile apps are not ready yet.</p>
                    <Link to = "/" className = "btn" style = {{marginTop:'10px'}}>Back to Home</Link>
            </div>
            <div style = {{height:'250px'}}></div>
        </React.Fragment>
    )
}

export default NotAvailable;
