import React from 'react'
import './NavBar.css'
import {Link} from 'react-router-dom'

function NavBar({toggleSidebar}) {

    return (
        <nav className = "navbar">
                <div className = "nav_icon" onClick = {toggleSidebar}>
                    <i className = "fa fa-bars"></i>
                </div>
                <div className = "navbar__left">
                    <Link to = "/create-category">Create Category</Link>
                    <Link to = "/add-product" className = "active_link" href = "#">Add Product</Link>
                </div>
                <div className = "navbar__right">
                    <input className = "search-box" placeholder = "User, Category, product..." />
                    <a href = "#">
                        <i className = "fa fa-search"></i>
                    </a>
                    <a href = "#">
                        <i className = "fa fa-clock"></i>
                    </a>
                    <a href = "#">
                        <img width = "30" src = "assets/images/avatar.svg" />
                    </a>
                </div>
        </nav>
    )
}

export default NavBar
