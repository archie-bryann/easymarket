import React from 'react'
import './ResetPassword.css'
import Header from '../../components/Header/Header'

function ResetPassword({title,apiRootUrl,clientRootUrl, match,loggedInStatus,cartNum,token}) {

    const { email, v_token } = match.params;

    return (
        <React.Fragment>
            <Header title = {title} clientRootUrl = {clientRootUrl} loggedInStatus = {loggedInStatus} cartNum = {cartNum} />
            <div className = "account-page">
                <div className = "container">
                    <div className = "row">
                        <div className = "col-2">
                            <img src = {`${clientRootUrl}images/image1.png`} className = "img-style" />
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
