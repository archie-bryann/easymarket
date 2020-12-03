import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'

function Sidebar({myClass,closeSidebar,clientRootUrl}) {

    return (
        <div id = "sidebar" className = {myClass}>
            <div className = "sidebar__title">
                <div className = "sidebar__img">
                    <img src = {`${clientRootUrl}assets/images/foodnet-white.png`} style = {{width:'115px'}} alt = "" />
                    {/* <img src = {`${clientRootUrl}assets/images/logo.png`} alt = "" />
                    <h1>Codersbite</h1> */}
                </div>
                <i className = "fas fa-window-close" id = "sidebarIcon" onClick = {closeSidebar} ></i>
            </div>

            <div className = "sidebar__menu">
                <div className = "sidebar__link active_menu_link">
                    <i className = "fa fa-home"></i>
                    <a href = "fas fa-home"></a>
                    <Link to = "/" style = {{marginLeft:'-5px'}}>Dashboard</Link>
                </div>
                {/* <h2></h2> */}
                <div className = "sidebar__link">
                    <i className = "fa fa-user-secret"></i>
                    <Link to  = "/pending-orders">Pending Orders</Link>
                </div>
                {/* <div className = "sidebar__link">
                    <i className = "fas fa-building"></i>
                    <Link to  = "/fulfilled-orders">Fulfilled Orders</Link>
                </div>
                <div className = "sidebar__link">
                    <i className = "fa fa-archive"></i>
                    <Link to  = "/cancelled-orders">Cancelled Orders</Link>
                </div> */}
                <div className = "sidebar__link">
                    <i className = "fa fa-power-off"></i>
                    <Link to = "/logout">Logout</Link>
                </div>
                <div className = "sidebar__link" style = {{height:'500px'}}>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
