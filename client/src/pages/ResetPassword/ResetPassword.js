import React, { useState } from 'react'
import './ResetPassword.css'
import Header from '../../components/Header/Header'

function ResetPassword({title,apiRootUrl,clientRootUrl, match,loggedInStatus,cartNum,token}) {

    document.title = `Reset Password - ${title}`;

    const { email, v_token } = match.params;
    const [pwd1, setPwd1] = useState('');
    const [pwd2, setPwd2] = useState('');
    
    return (
        <React.Fragment>
            <Header title = {title} clientRootUrl = {clientRootUrl} loggedInStatus = {loggedInStatus} cartNum = {cartNum} />
            <div className = "account-page">
                <div className = "container">
                    <div className = "row">
                        <div className = "col-2">
                            <img src = {`${clientRootUrl}images/cover.png`} className = "img-style" alt = "" />
                        </div>

                        <div className = "col-2">
                            <div className = "form-container">
                                <div className = "form-btn">
                                    <span className = "full">Reset Password</span>
                                </div>


                                <form id = "RegForm" style = {{marginTop:'-30px'}}>
                                    <input type = "text" placeholder = "New Password" />
                                    <input type = "text" placeholder = "Confirm New Password" />
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

export default ResetPassword
