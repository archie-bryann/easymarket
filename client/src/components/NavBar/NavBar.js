import React, { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'
import {UserContext,PageContext} from '../../App'

function NavBar({title, clientRootUrl, loggedInStatus, match}) {

    const [maxHeight, setMaxHeight] = useState("0px");

    function menuToggle() {
        if(maxHeight === "0px") {
            setMaxHeight("200px");
        } else {
            setMaxHeight("0px");
        }
    }    

    return (
        <div className = "navbar">
            <div className = "logo">
                <Link to = "/">
                <h1 style = {{fontSize:'30px'}}>{title}</h1>
                {/* <h1 style = {{fontSize:'23px'}}>{title}</h1> */}
                {/* <img src = {`${clientRootUrl}images/logo.png`} width="125px" />                 */}
                </Link>
            </div>
            

        
            <nav>
                <ul style={{maxHeight}}>
                    <li><Link to="/" className = "link">Home</Link></li>

                    <li><Link to="/categories" className = "link">Categories</Link></li>

                    <li><Link to="/about" className = "link">About</Link></li>
                    <li><Link to="/contact" className = "link">Contact</Link></li>
                    {/* <UserContext.Consumer>
                        {
                            loggedIn => {
                                (loggedIn) && (
                                    <Fragment> */}
                                        {(loggedInStatus) && (
                                            <Fragment>
                                                <li><Link to="/orders" className = "link">My Orders</Link></li>
                                                <li><Link to="/orders" className = "link">My Profile</Link></li>
                                            </Fragment>
                                        )}
                                        
                                    {/* </Fragment>
                                )
                            }
                        }
                    </UserContext.Consumer>
                     */}
                    <li><Link to="/account" className = "link">Account</Link></li>
                </ul>
            </nav>
            {/* <Link to="/search" className = "link"><img src = {`${clientRootUrl}images/search.png`} width="22px" height="22px" className = "search-icon" alt = "" /></Link> */}
            <Link to="/search" className = "link"><i className = "fa fa-search" style = {{fontSize:'21px',marginRight:'18px'}}></i></Link>
            {/* <UserContext.Consumer>
                {
                    loggedIn => {
                        (loggedIn) && (
                            <Fragment> */}
                            {
                                (loggedInStatus) && (
                                        <Link to="/cart" className = "link"><i className = "fa fa-shopping-cart cart-icon" style = {{fontSize:'22px'}}></i></Link>
                                )
                            }
                               
                            {/* </Fragment>
                        )
                    }
                }
            </UserContext.Consumer> */}
            {/* <Link to="/cart" className = "link"><img src = {`${clientRootUrl}images/cart.png`} width="25px" height="25px" className = "cart-icon" alt = "" /></Link> */}
           
           
            <img src = {`${clientRootUrl}images/menu.png`} width="30px" height="30px" className = "menu-icon" onClick = {menuToggle} alt = "" />{/* remove height & width for this when found */}
        </div>
    )
}

export default NavBar
