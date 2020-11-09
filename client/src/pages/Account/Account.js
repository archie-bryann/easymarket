import React,  {useState} from 'react'
import Header from '../../components/Header/Header';
import './Account.css'

function Account({title, clientRootUrl}) {

    const [loginFormTransform, setLoginFormTransform] = useState('translateX(-300px)');
    const [regFormTransform, setRegFormTransform] = useState('');
    const [indicatorTransform, setIndicatorTransform] = useState('translateX(100px)');

    const [status, setStatus] = useState('hide');


    function registerTab() {
        setRegFormTransform('translateX(0px)');
        setLoginFormTransform('translateX(-300px)');
        setIndicatorTransform('translateX(100px)');
    }

    function loginTab() {
        setRegFormTransform('translateX(300px)');
        setLoginFormTransform('translateX(0px)');
        setIndicatorTransform('translateX(0px)');
    }

    function myChangeHandler() {

    }

    // signup with { firstname, lastname, email, password }

    return (
        <React.Fragment>
            <Header title = {title} clientRootUrl = {clientRootUrl} />
            <div className = "account-page">
                <div className = "container">
                    <div className = "row">
                        <div className = "col-2">
                            <img src = "images/image1.png" className = "img-style" />
                        </div>

                        <div className = "col-2">
                            <div className = "form-container">
                                <div className = "form-btn">
                                    <span onClick = {loginTab}>Login</span>
                                    <span onClick = {registerTab}>Register</span>
                                    <hr id = "Indicator" style = {{transform:indicatorTransform}} />
                                </div>


                                <form id = "LoginForm" style = {{transform:loginFormTransform}}>
                                    <input type = "text" name = "username" placeholder = "Username" onChange = {myChangeHandler} />
                                    <input type = "password" name = "password" placeholder = "Password" onChange = {myChangeHandler} />
                                    <button type = "submit" className = "btn">Login</button>
                                    <a href = "/forgot_password">Forgot password</a>
                                </form>


                                <form id = "RegForm" style = {{transform:regFormTransform}}>
                                    <input type = "text" placeholder = "Firstname" />
                                    <input type = "text" placeholder = "Lastname" />
                                    <input type = "text" placeholder = "Email" />
                                    <input type = "password" placeholder = "Password" />
                                    <button type = "submit" className = "btn">Register</button>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Account;
