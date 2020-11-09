import React from 'react'
import NavBar from '../NavBar/NavBar'
import './Header.css'

function Header({title,children, clientRootUrl}) {
    return (
        <React.Fragment>
            <div className = "header">
                <div className = "container">
                    <NavBar title = {title} clientRootUrl = {clientRootUrl} />
                    {children}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Header
