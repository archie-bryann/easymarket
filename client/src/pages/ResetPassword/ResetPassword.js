import React, { useState } from 'react'
import './ResetPassword.css'
import Header from '../../components/Header/Header'
import axios from 'axios'
import Loader from '../../components/Loader/Loader';
import { Redirect } from 'react-router-dom';

function ResetPassword({title,apiRootUrl,clientRootUrl, match,loggedInStatus,cartNum,token, errorMessage}) {

    document.title = `Reset Password - ${title}`;

    const {email,v_token} = match.params;
    const [pwd1,setPwd1] = useState('');
    const [pwd2,setPwd2] = useState('');
    const [color,setColor] = useState('red');
    const [resetErr,setResetErr] = useState('');
    const [loading,setLoading] = useState(false);
    const [redr,setRedr] = useState(false);

    function changePwd1(e) {
        setPwd1(e.target.value);
    }

    function changePwd2(e) {
        setPwd2(e.target.value);
    }

    function resetPassword(e) {
        setLoading(true);
        setColor('red');
        setResetErr(null);
        e.preventDefault();
        if(pwd1 !== pwd2) {
            setLoading(false);
            setResetErr('Both passwords do not match!');
        } else {

            if(pwd1.length < 6) {
                setLoading(false);
                setResetErr('Your password must be greater than 6 characters!')
            } else {
                axios.post(`${apiRootUrl}user/password_reset/${email}/${v_token}`,{
                    password:pwd1
                }).then(({data})=>{
                    setLoading(false);
                    if(data.error === 0) {
                        setPwd1('');
                        setPwd2('');
                        setColor('green');
                        setResetErr('Password reset successful. Click the link below to login to your account');
                        // setRedr(true);
                    } else {
                        setResetErr(data.error)
                    }
                }).catch(err=>{
                    setLoading(false);
                    setResetErr(errorMessage);
                })
            }
        }
    }
    
    return (
        <React.Fragment>
            {loading&&<Loader/>}
            {/* {redr&&<Redirect to = "/account" />} */}
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
                                    <p style = {{color,fontSize:'13.5px',float:'left',marginTop:'-13.5px'}}>{resetErr}</p>
                                    <input type = "password" placeholder = "New Password" value = {pwd1} onChange = {changePwd1} />
                                    <input type = "password" placeholder = "Confirm New Password" value = {pwd2} onChange = {changePwd2} />
                                    <button type = "submit" className = "btn" onClick = {resetPassword}>Proceed</button>
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

export default ResetPassword
