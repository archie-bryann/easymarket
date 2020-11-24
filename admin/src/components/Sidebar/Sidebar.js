import React from 'react'
import './Sidebar.css'

function Sidebar({myClass,closeSidebar}) {

    return (
        <div id = "sidebar" className = {myClass}>
            <div className = "sidebar__title">
                <div className = "sidebar__img">
                    <img src = "assets/images/logo.png" alt = "" />
                    <h1>Codersbite</h1>
                </div>
                <i className = "fas fa-window-close" id = "sidebarIcon" onClick = {closeSidebar} ></i>
            </div>

            <div className = "sidebar__menu">
                <div className = "sidebar__link active_menu_link">
                    <i className = "fa fa-home"></i>
                    <a href = "fas fa-home"></a>
                    <a href = "#">Dashboard</a>
                </div>
                <h2>MNG</h2>
                <div className = "sidebar__link">
                    <i className = "fa fa-user-secret"></i>
                    <a href = "#">Admin Management</a>
                </div>
                <div className = "sidebar__link">
                    <i className = "fas fa-building"></i>
                    <a href = "#">Company Management</a>
                </div>
                <div className = "sidebar__link">
                    <i className = "fa fa-archive"></i>
                    <a href = "#">Employee Management</a>
                </div>
                <div className = "sidebar__link">
                    <i className = "fas fa-handshake"></i>
                    <a href = "#">Contracts</a>
                </div>
                <div className = "sidebar__link">
                    <i className = "fas fa-archive"></i>
                    <a href = "#">Requests</a>
                </div>
                <div className = "sidebar__link">
                    <i className = "fas fa-question"></i>
                    <a href = "#">Requests</a>
                </div>
                <div className = "sidebar__link">
                    <i className = "fas fa-sign-out"></i>
                    <a href = "#">Leave Policy</a>
                </div>
                <div className = "sidebar__link">
                    <i className = "fas fa-calender-check"></i>
                    <a href = "#">Special Days</a>
                </div>
                <div className = "sidebar__link">
                    <i className = "fa fa-sign-out"></i>
                    <a href = "#">Leave Policy</a>
                </div>
                <div className = "sidebar__link">
                    <i className = "fa fa-sign-out"></i>
                    <a href = "#">Apply for leave</a>
                </div>
                <h2>PAYROLL</h2>
                <div className = "sidebar__link">
                    <i className = "fa fa-money"></i>
                    <a href = "#">Payroll</a>
                </div>
                <div className = "sidebar__link">
                    <i className = "fa fa-briefcase"></i>
                    <a href = "#">Paygrade</a>
                </div>
                <div className = "sidebar__link">
                    <i className = "fa fa-power-off"></i>
                    <a href = "#">Log out</a>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
