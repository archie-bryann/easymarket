import React, { useState, Fragment } from 'react'
import './Login.css'
import Loader from '../../components/Loader/Loader'
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Redirect } from 'react-router-dom'

toast.configure();

function Login({apiRootUrl, clientRootUrl, errorMessage, verifyAuth}) {

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [loading,setLoading] = useState(false);
    const [color, setColor] = useState('red');
    const [loginErr, setLoginErr] = useState(null);
    const [redr, setRedr] = useState(false);

    function changeUsername(e) {
        setUsername(e.target.value);
    }

    function changePassword(e) {
        setPassword(e.target.value);
    }

    function login(e) {
        e.preventDefault();
        setLoginErr(null);
        if(username.trim() === '' || password.trim() === '') {
            setLoginErr('All fields are required!');
        } else {
            setLoading(true);
            axios.post(`${apiRootUrl}logistics/login`,{
                username,
                password
            }).then(({data})=>{
                setLoading(false);
                if(data.error === 0) {
                    localStorage.setItem('wpt', data.token);
                    setColor('green');      
                    setLoginErr('Login successful!');
                    // setRedr(true);
                    window.location="/";
                } else {
                    setColor('red');
                    setLoginErr(data.error);
                }
            }).catch(err=>{
                setLoading(false);
                toast.error(errorMessage, {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            })
        }
    }

    return (
        <Fragment>
            {verifyAuth()}
            {loading&&<Loader />}
            {redr&&<Redirect to = "/"/>}
            <div className = "hero" style = {{backgroundImage:`linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url(${clientRootUrl}assets/images/banner.jpg)`}}>
                <div className = "form-box">
                    <div className = "button-box">
                        <div id = "btn"></div>
                        <button type = "button" className = "toggle-btn">Log In</button>
                        <button type = "button" className = "toggle-btn">Register</button>
                    </div>
                    <div className = "social-icons">
                        <img src = {`${clientRootUrl}assets/images/fb.png`} />
                        <img src = {`${clientRootUrl}assets/images/tw.png`} />
                        <img src = {`${clientRootUrl}assets/images/gp.png`} />
                    </div>
                <form id = "login" className = "input-group">
                    <p style = {{color,fontSize:'13.5px',float:'left'}}>{loginErr}</p>
                    <input name = "username" value = {username} onChange = {changeUsername} type = "text" className = "input-field" placeholder = "Username" required />
                    <input name = "password" value = {password} onChange = {changePassword} type = "password" className = "input-field" placeholder = "Enter Password" required />
                    {/* <input type = "checkbox" className = "check-box" /><span>Remember Password</span> */}
                    <div style = {{height:'30px'}}></div>
                    <button type = "submit" className = "submit-btn" onClick = {login}>Login</button>

                </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Login
