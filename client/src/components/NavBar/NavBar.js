import React, { useState, Fragment } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'
import {UserContext,PageContext} from '../../App'

function NavBar({title, clientRootUrl, loggedInStatus, match}) {

    const [maxHeight, setMaxHeight] = useState("0px");

    const [cartNum, setCartNum] = useState(null);

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
                {/* <h1 style = {{fontSize:'30px',color:'white'}}>{title}</h1> */}
                {/* <h1 style = {{fontSize:'23px'}}>{title}</h1> */}
                <img src = {`${clientRootUrl}images/foodnet.png`} width="157px" />              
                </Link>
            </div>

            <nav>
                <ul style={{maxHeight}}>
                    <li><Link to="/" className = "link c">Home</Link></li>

                    <li><Link to="/categories" className = "link c">Categories</Link></li>
        
                    <li><Link to="/about" className = "link c">About</Link></li>
                    <li><Link to="/contact" className = "link c">Contact</Link></li>
                    {/* <UserContext.Consumer>
                        {
                            loggedIn => {
                                (loggedIn) && (
                                    <Fragment> */}
                                        {(loggedInStatus) && (
                                            <Fragment>
                                                <li><Link to="/orders" className = "link c">My Orders</Link></li>
                                                <li><Link to="/profile" className = "link c">My Profile</Link></li>
                                                {/* <li><Link to="/logout" className = "link c">Logout</Link></li> */}
                                            </Fragment>
                                        )}
                                        
                                    {/* </Fragment>
                                )
                            }
                        }
                    </UserContext.Consumer>
                     */}
                     {(!loggedInStatus) && (
                        <li><Link to="/account" className = "link c">Account</Link></li>
                     )}
                </ul>
            </nav>
            {/* <Link to="/search" className = "link"><img src = {`${clientRootUrl}images/search.png`} width="22px" height="22px" className = "search-icon" alt = "" /></Link> */}
            <Link to="/search" className = "link c"><i className = "fa fa-search" style = {{fontSize:'20px',marginRight:'15px'}}></i></Link>
            {/* <UserContext.Consumer>
                {
                    loggedIn => {
                        (loggedIn) && (
                            <Fragment> */}
                            {
                                (loggedInStatus) && (
                                <Link to="/cart" className = "link c"><i className = "fa fa-shopping-cart cart-icon" style = {{fontSize:'20px'}}></i> {cartNum}</Link>
                                )
                            }

                            {
                                (loggedInStatus) && (
                                <Link to="/logout" className = "link c"><i className = "fa fa-sign-out-alt" style = {{fontSize:'22px', marginLeft:'15px'}}></i> {cartNum}</Link>
                                )
                            }
                               

                            {/* </Fragment>
                            
                        )
                    }
                }
            </UserContext.Consumer> */}
            {/* <Link to="/cart" className = "link"><img src = {`${clientRootUrl}images/cart.png`} width="25px" height="25px" className = "cart-icon" alt = "" /></Link> */}
           
           
            {/* <img src = {`${clientRootUrl}images/menu.png`} width="30px" height="30px" className = "menu-icon c" onClick = {menuToggle} alt = "" /> // remove height & width for this when found */}
            <i className = "fa fa-bars menu-icon c" style = {{fontSize:'23px',marginLeft:'15px'}} onClick = {menuToggle} ></i>
        </div>
    )
}

export default NavBar
