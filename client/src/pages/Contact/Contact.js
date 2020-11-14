import React, { Fragment } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import Header from '../../components/Header/Header'
import './Contact.css'

function Contact({title,apiRootUrl,clientRootUrl,email,match,loggedInStatus}) {
    return (
        <Fragment>
            <Header title = {title} clientRootUrl = {clientRootUrl} match = {match} loggedInStatus={loggedInStatus} />
            <div className = "top-space" style = {{height:'50px'}}></div>
            <div style = {{height:'40px'}}></div>
            <div className = "container center-div">
                    <h1 className = "feedback">Feedback</h1>
                    <h2 className = "feedback-2">Feedback</h2>
                    {/* <h4>Opps! Page not found</h4> */}
                    <p>Click below to place any complaints and also to send your feedback. Thank you.</p>
                    <a href = {`mailto:${email}?subject=Feedback`} className = "btn">Message us</a>
            </div>
            <div style = {{height:'230px'}}></div>
        </Fragment>
    )
}

export default Contact
