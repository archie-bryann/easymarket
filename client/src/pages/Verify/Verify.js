import React, { Fragment, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import Loader from '../../components/Loader/Loader'
import Header from '../../components/Header/Header';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure();

function Verify({title,clientRootUrl,apiRootUrl,match,loggedInStatus, verifyAuth, token, errorMessage}) {
    
    const {email,v_token} = match.params;

    const [invalidParamError, setInvalidParamError] = useState(false);
    const [checking, setChecking] = useState(true);
    const [redr, setRedr] = useState(false);
    const [waiting,setWaiting] = useState(true);

    useEffect(()=>{
        axios.post(`${apiRootUrl}user/verify/${email}/${v_token}`)
        .then(({data})=>{
            // console.log(data);
            setChecking(false);
            if(data.error === 0) {
                // store new token
                localStorage.setItem('wpt', data.token);

                // redirect to homepage
                // setRedr(true);
                window.location = "/";
            } else {

            setWaiting(false);

            }
            
        })
        .catch(err=>{
            // remove loader
            setChecking(false);

            // console.log(err)
                        toast.error(errorMessage, {
                position: toast.POSITION.BOTTOM_RIGHT
            }) 
            
            // show bad image

            // show notification
            
        })

        return () => {
            
        }   
    }, [apiRootUrl]);

    return (
       <React.Fragment>
           {verifyAuth()}
            { redr && <Redirect to = "/" /> }
            { checking && <Loader /> }
            { invalidParamError && <Redirect to = "/" /> }
            <Header title = {title} clientRootUrl = {clientRootUrl} loggedInStatus = {loggedInStatus} token = {token} />
            <div style = {{height:'50px'}}></div>
            <div className = "container center-div">
                    {waiting ? (
                        <Fragment>
                            <img src  = {`${clientRootUrl}images/Fingers Crossed Emoji [Free Download iPhone Emojis].png`} width = "140px" alt = "" />
                            <h4>Hey! Nice to meet you again.</h4>
                            <p>Please hold on while your account is verified...</p>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <img src  = {`${clientRootUrl}images/Oops Emoji.png`} width = "210px" alt = "" />
                            <h4>Sorry, an error occurred while trying to verify your email!</h4>
                            <p>Please try again by logging in. Thank you.</p>
                        </Fragment>
                    )}
                    
            </div>
            <div style = {{height:'280px'}}></div>
       </React.Fragment>
    )
}

export default Verify;