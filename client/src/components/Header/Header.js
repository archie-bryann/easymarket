import React from 'react'
import NavBar from '../NavBar/NavBar'
import './Header.css'

function Header({title,children, clientRootUrl, loggedInStatus, match, cartNum, token}) {

    return (
        <React.Fragment>
            <div className = "header">
                <div className = "container">
                    <NavBar title = {title} clientRootUrl = {clientRootUrl} loggedInStatus = {loggedInStatus} match = {match} cartNum = {cartNum} token = {token} />
                    {children}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Header
