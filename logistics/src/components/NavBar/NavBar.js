import React, { useState } from 'react'
import './NavBar.css'
import {Link} from 'react-router-dom'

function NavBar({toggleSidebar,clientRootUrl}) {

    const [q,setQ] = useState(null);

    function changeQ(e) {
        setQ(e.target.value);
    }
    

    return (
        <nav className = "navbar">
                <div className = "nav_icon" onClick = {toggleSidebar}>
                    <i className = "fa fa-bars" style = {{color:'black'}}></i>
                </div>
                <div className = "navbar__left">
                    {/* <Link to = "/create-category">Craete Category</Link>
                    <Link to = "/add-product" className = "_active_link" href = "#">Add Product</Link> */}
                </div>
                <div className = "navbar__right">
                    {/* users, product, categories, orders */}
                    <input className = "search-box" placeholder = "Search for orders" title = "Search for orders" value = {q} onChange = {changeQ} />
                    <Link to = {`/search?q=${q?q:''}`}>
                        <i className = "fa fa-search" style = {{fontSize:'20px',marginLeft:'-12px'}}></i>
                    </Link>
                    {/* <a href = "#">
                        <i className = "fa fa-clock"></i>
                    </a> */}
                    {/* <a href = "#">
                        <img width = "30" src = {`${clientRootUrl}assets/images/avatar.svg`} />
                    </a> */}
                </div>
        </nav>
    )
}

export default NavBar
