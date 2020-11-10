import React from 'react'
import NavBar from '../NavBar/NavBar'
import './Header.css'

function Header({title,children, clientRootUrl, loggedInStatus}) {
    return (
        <React.Fragment>
            <div className = "header">
                <div className = "container">
                    <NavBar title = {title} clientRootUrl = {clientRootUrl} loggedInStatus = {loggedInStatus} />
                    {children}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Header
