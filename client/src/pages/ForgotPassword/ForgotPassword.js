import React from 'react'
import { Redirect } from 'react-router-dom';
import Header from '../../components/Header/Header'

function ForgotPassword({title,clientRootUrl,apiRootUrl,loggedInStatus}) {
    return (
        <React.Fragment>
            {
                (loggedInStatus) && (
                    <Redirect to = "/" />
                )
            }
            <Header title = {title} clientRootUrl = {clientRootUrl} loggedInStatus = {loggedInStatus} />
            <div className = "account-page">
                <div className = "container">
                    <div className = "row">
                        <div className = "col-2">
                            <img src = {`${clientRootUrl}images/image1.png`} className = "img-style" />
                        </div>

                        <div className = "col-2">
                            <div className = "form-container">
                                <div className = "form-btn">
                                    <span className = "full">Forgot Password</span>
                                </div>


                                <form id = "RegForm" style = {{marginTop:'-30px'}}>
                                    <input type = "text" placeholder = "Email" />
                                    <button type = "submit" className = "btn">Proceed</button>
                                    <a href = "/account">Login or Signup</a>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default ForgotPassword;