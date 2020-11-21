import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import axios from 'axios'
import Loader from '../../components/Loader/Loader';

function ForgotPassword({title,clientRootUrl,apiRootUrl,loggedInStatus,verifyAuth,token,errorMessage}) {

    document.title = `Forgot Password - ${title}`;

    const [email,setEmail] = useState('');
    const [color,setColor] = useState('red');
    const [forgotErr,setForgotErr] = useState(null);
    const [loading,setLoading] = useState(false);

    function IsEmail(email) {
        if(email.includes("@")) {
            var array = email.split("@")
            var sub = array[1]
            if(sub.includes(".")) {
                return true // email
            } else {
                return false // not an email
            }
        } else {
            return false // not an email
        }
    }

    function changeEmail(e) {
        setEmail(e.target.value);
    }

    function forgotPassword(e) {
        setForgotErr(null);
        e.preventDefault();
        const checker = IsEmail(email);
        if(checker === false) {
            setColor('red');
            setForgotErr("You used an invalid email!");
        } else {
            setLoading(true);
            /** check email */
            axios.post(`${apiRootUrl}user/password_recovery`,{
                email
            })
            .then(({data})=>{
                setLoading(false);
                if(data.error === 0) {
                    setColor('green');
                    setForgotErr(data.message);
                } else {
                    setColor('red');
                    setForgotErr(data.error);
                }
            })
            .catch(err=>{
                setLoading(false);
                setColor('red');
                setForgotErr(errorMessage)
            })
        }
    }

    return (
        <React.Fragment>
            {verifyAuth()}
            {loading&&<Loader/>}
            <Header title = {title} clientRootUrl = {clientRootUrl} loggedInStatus = {loggedInStatus} token = {token} />
            <div className = "account-page">
                <div className = "container">
                    <div className = "row">
                        <div className = "col-2">
                            <img  src = {`${clientRootUrl}images/cover.png`} className = "img-style" alt = "" />
                        </div>

                        <div className = "col-2">
                            <div className = "form-container">
                                <div className = "form-btn">
                                    <span className = "full">Forgot Password</span>
                                </div>

                                <form id = "RegForm" style = {{marginTop:'-30px'}}>
                                    <p style = {{color,fontSize:'13.5px',float:'left',marginTop:'-13.5px'}}>{forgotErr}</p>
                                    <input type = "text" placeholder = "Email" value = {email} onChange = {changeEmail} />
                                    <button type = "submit" className = "btn" onClick = {forgotPassword}>Proceed</button>
                                    <a style = {{textDecoration:'underline'}} href = "/account">Login or Signup?</a>
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