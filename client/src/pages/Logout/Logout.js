import React, {useState} from 'react'
import Header from '../../components/Header/Header';
import {Link, Redirect} from 'react-router-dom'
import './Logout.css'
import axios from 'axios'
import { useLastLocation } from 'react-router-last-location';

function Logout({title, clientRootUrl, loggedInStatus, v}) {

    const lastLocation = useLastLocation();

    document.title = `Logout - ${title}`;

    const [cancelRedirect, setCancelRedirect] = useState(false);

    function logoutUser() {

        // update user to logged out

        // delete token
        localStorage.removeItem('wpt');
        window.location = "/";
    }

    function cancel() {
        setCancelRedirect(true);
    }

    return (
        <React.Fragment>
            {
                cancelRedirect && <Redirect to = {lastLocation.pathname} />
            }
            {
                (!loggedInStatus) && <Redirect to = "/?redirect=homepage&lang=en" />
            }
            <Header title = {title} clientRootUrl = {clientRootUrl} loggedInStatus = {loggedInStatus} />
            <div style = {{height:'50px'}}></div>
            <div className = "container center-div">
                    {/* <h1>404</h1> */}
                    <img src  = {`${clientRootUrl}images/7-2-sad-crying-emoji-png.png`} width = "180px" alt = "" />
                    <h4>Awww! We will miss you.</h4>
                    <p>Are you sure you want to logout of your account?</p>
                    <a onClick = {logoutUser} className = "btn logout-btn">Logout</a>
                    <a onClick = {cancel} className = "btn cancel-btn">Cancel</a>
            </div>
            <div style = {{height:'280px'}}></div>
        </React.Fragment>
    )
}

export default Logout