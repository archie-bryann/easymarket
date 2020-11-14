import React,  {useState} from 'react'
import Header from '../../components/Header/Header';
import './Account.css'
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },      
}));

function Account({title, clientRootUrl, apiRootUrl, loggedInStatus}) {

    const classes = useStyles();

    const [loginFormTransform, setLoginFormTransform] = useState('translateX(-300px)');
    const [regFormTransform, setRegFormTransform] = useState('');
    const [indicatorTransform, setIndicatorTransform] = useState('translateX(100px)');

    const [status, setStatus] = useState('hide');

    const [signupErr, setSignupErr] = useState(null);
    const [loginErr, setLoginErr] = useState(null);

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [color, setColor] = useState('red');

    const [redr, setRedr] = useState(false);

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

    function changeFirstname(e) {
        setFirstname(e.target.value);
    }

    function changeLastname(e) {
        setLastname(e.target.value);
    }

    function changeEmail(e) {
        setEmail(e.target.value);
    }

    function changePassword(e) {
        setPassword(e.target.value);
    }

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

    function signup(e) {
        e.preventDefault();
        setSignupErr(null);
        if(firstname.trim() === '' || lastname.trim() === '' || email.trim() === '' || password.trim() === '') {
            setSignupErr("All fields are required!");
        } else {
            // validate email
            const checker = IsEmail(email);
            if(checker === false) {
                setSignupErr("You used an invalid email!");
            } else {
                // password checker
                if(password.length < 6) {
                    setSignupErr("Your password must be greater than 6 characters!");
                } else {
                    // signup
                    setIsLoading(true);
                    axios.post(`${apiRootUrl}user/signup`, {
                        firstname,
                        lastname,
                        email,
                        password
                    })
                    .then(res=>{
                        setIsLoading(false);
                        if(res.data.error === 0) {
                            // clear all input
                            setFirstname('');
                            setLastname('');
                            setEmail('');
                            setPassword('');
                            // color of message
                            setColor('green');
                            // show success message
                            setSignupErr(res.data.message);
                        } else {
                            setSignupErr(res.data.error);
                        }
                    })
                    .catch(err=>{
                        setIsLoading(false);
                        setSignupErr("An error occurred. Please try again!");
                    })
                }
            }
        }
    }

    function login(e) {
        e.preventDefault();
        setLoginErr(null);
        if(email.trim() === '' || password.trim() === '') {
            setLoginErr("All fields are required!");
        } else {
            // login
            setIsLoading(true);
            axios.post(`${apiRootUrl}user/login`, {
                email,
                password
            })
            .then(({data})=>{
                setIsLoading(false);
                if(data.error === 0) { 
                    // no error
                    // store token
                    localStorage.setItem('wpt', data.token);

                    // updateLogStatus();

                    // show message
                    setColor('green');
                    setLoginErr('Login successful!');

                    // redirect user    
                    // setRedr(true);
                    window.location = "/";
                    
                } else if(data.error === 933) {
                    // show message
                    setColor('green');
                    setLoginErr(data.message);
                } else {
                    // show error
                    setLoginErr(data.error);
                }
                console.log(data);
            })
            .catch(err=>{
                console.log(err)
                setIsLoading(false);
                setLoginErr("An error occurred. Please try again!");
            })
            
        }
    }

    // signup with { firstname, lastname, email, password }

    return (
        <React.Fragment>
            {
                loggedInStatus && (
                    <Redirect to = "/" />
                )
            }
            {/* {
                redr && (
                    <Redirect to = "/" />
                )
            } */}
             {
                 isLoading && (
                    <Backdrop className={classes.backdrop} open>
                    <CircularProgress color="inherit" />
                    </Backdrop>
                )
            }
            <Header title = {title} clientRootUrl = {clientRootUrl} loggedInStatus = {loggedInStatus} />
            <div className = "account-page" style = {{marginTop:'-30px',marginBottom:'-20px'}}>
                <div className = "container">
                    <div className = "row">
                        <div className = "col-2">
                            <img  src = "images/cover.png" className = "img-style" alt = "" />
                            <img />
                        </div>

                        <div className = "col-2"  style = {{marginTop:'-120px'}}>
                            <div className = "form-container">
                                <div className = "form-btn">
                                    <span onClick = {loginTab}>Login</span>
                                    <span onClick = {registerTab}>Register</span>
                                    <hr id = "Indicator" style = {{transform:indicatorTransform}} />
                                </div>



                                <form id = "LoginForm" style = {{transform:loginFormTransform,marginTop:'-40px'}}>
                                    <p style = {{color,fontSize:'13.5px',float:'left'}}>{loginErr}</p>
                                    <input type = "text" name = "email" placeholder = "Email" onChange = {changeEmail} value = {email} />
                                    <input type = "password" name = "password" placeholder = "Password" onChange = {changePassword} value = {password} />
                                    <button type = "submit" className = "btn" onClick = {login}>Login</button>
                                    <a href = "/forgot_password">Forgot password</a>
                                </form>


                                <form id = "RegForm" style = {{transform:regFormTransform,marginTop:'-40px'}}>
                                    <p style = {{color,fontSize:'13.5px',float:'left'}}>{signupErr}</p>
                                    <input type = "text" name = "firstname" placeholder = "Firstname" onChange = {changeFirstname} value = {firstname} />
                                    <input type = "text" name = "lastname" placeholder = "Lastname" onChange = {changeLastname} value = {lastname} />
                                    <input type = "text" name = "email" placeholder = "Email" onChange = {changeEmail} value = {email} />
                                    <input type = "password" name = "password" placeholder = "Password" onChange = {changePassword} value = {password} />
                                    <button type = "submit" className = "btn" onClick = {signup}>Register</button>
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
