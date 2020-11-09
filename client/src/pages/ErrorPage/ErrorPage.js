import React from 'react'
import Header from '../../components/Header/Header'
import './ErrorPage.css'

function ErrorPage({title,clientRootUrl}) {

    document.title = `Page Not Found - ${title}`;

    return (
        <React.Fragment>
            <Header title = {title} clientRootUrl = {clientRootUrl} />
            <div style = {{height:'50px'}}></div>
            <div className = "container center-div">
                    <h1>404</h1>
                    <h4>opps! Page not found</h4>
                    <p>The page you were looking for doesn't exist. You may have mistyped the address or the page may have moved.</p>
                    <a href = "#" className = "btn">Back to Home</a>
            </div>
            <div style = {{height:'250px'}}></div>
        </React.Fragment>
    )
}

export default ErrorPage
