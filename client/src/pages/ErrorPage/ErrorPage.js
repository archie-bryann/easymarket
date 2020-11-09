import React from 'react'
import Header from '../../components/Header/Header'
import './ErrorPage.css'

function ErrorPage({title,clientRootUrl}) {
    return (
        <React.Fragment>
            <Header title = {title} clientRootUrl = {clientRootUrl} />
            <div className = "container">
                <h1>404 Error</h1>
            </div>  
        </React.Fragment>
    )
}

export default ErrorPage
