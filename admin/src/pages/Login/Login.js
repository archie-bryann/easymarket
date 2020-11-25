import React from 'react'
import './Login.css'

function Login({clientRoorUrl}) {
    /* background-image: linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url(banner.jpg); */

    return (
        <div className = "hero" style = {{backgroundImage:`linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url(${clientRoorUrl}assets/images/banner.jpg)`}}>
            <div className = "form-box">
                <div className = "button-box">
                    <div id = "btn"></div>
                    <button type = "button" className = "toggle-btn">Log In</button>
                    <button type = "button" className = "toggle-btn">Register</button>
                </div>
                <div className = "social-icons">
                    <img src = {`${clientRoorUrl}assets/images/fb.png`} />
                    <img src = {`${clientRoorUrl}assets/images/tw.png`} />
                    <img src = {`${clientRoorUrl}assets/images/gp.png`} />
                </div>
            <form id = "login" className = "input-group">
                <input type = "text" className = "input-field" placeholder = "Username" required />
                <input type = "password" className = "input-field" placeholder = "Enter Password" required />
                <input type = "checkbox" className = "check-box" /><span>Remember Password</span>
                <button type = "submit" className = "submit-btn">Login</button>
            </form>
            </div>
        </div>
    )
}

export default Login
