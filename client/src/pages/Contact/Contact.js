import React, { Fragment } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import Header from '../../components/Header/Header'
import './Contact.css'

function Contact({title,apiRootUrl,clientRootUrl,email}) {
    return (
        <Fragment>
            <Header title = {title} clientRootUrl = {clientRootUrl} />
            <div style = {{height:'50px'}}></div>
            <div className = "container center-div">
                    <h1 className = "feedback">Feedback</h1>
                    {/* <h4>Opps! Page not found</h4> */}
                    <p>Click below to place any complaints and also to send your feedback. Thank you.</p>
                    <a href = {`mailto:${email}?subject=Feedback`} className = "btn">Message us</a>
            </div>
            <div style = {{height:'230px'}}></div>
        </Fragment>
    )
}

export default Contact
