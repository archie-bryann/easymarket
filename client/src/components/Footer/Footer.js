import React from 'react'
import './Footer.css'
import {Link} from 'react-router-dom'

function Footer({title, clientRootUrl}) {
    return (
        <div className = "footer">
            <div className = "container">
                <div className = "row">
                    <div className ="footer-col-1">
                        <h3>Download Our App</h3>
                        <p>Download App for Android and ios mobile phone</p>
                        <div className = "app-logo">
                            <Link to = "/not-available">
                                <img src = {`${clientRootUrl}images/app-store.png`} />
                                <img src = {`${clientRootUrl}images/play-store.png`} />
                            </Link>
                        </div>
                    </div>
                    <div className = "footer-col-2">
                        <img src = {`${clientRootUrl}images/foodnet-white.png`} />
                        <p>Bringing The Market To You.</p>
                    </div>
                    <div className = "footer-col-3">
                        <h3>Useful Links</h3>
                        <ul>
                            <li><Link to = "/terms-of-service" className = "light">Terms of Service</Link></li>
                            <li><Link to = "/privacy-policy" className = "light">Privacy Policy</Link></li>
                            <li><Link to = "/returns-and-exchange-policy" className = "light">Returns and Exchange Policy</Link></li>
                            <li><Link to = "/shipping-policy" className = "light">Shipping Policy</Link></li>
                        </ul>
                    </div>
                    <div className = "footer-col-4">
                        <h3>Follow us</h3>
                        <ul>
                            {/* <li>Facebook</li> */}
                            <li><a href = "https://twitter.com/ItzFoodnet" className = "light">Twitter</a></li>
                            <li><a href = "https://www.instagram.com/ItzFoodnet/"  className = "light">Instagram</a></li>
                            <li><a href = "https://www.youtube.com/channel/UCdihDlz7AT9YXagisi5-yGg?view_as=subscriber"  className = "light">YouTube</a></li>
                        </ul>
                    </div>
                </div>
                <hr />
                <p className = "copyright">Copyright 2020 - {title}</p>
            </div>
        </div>
    )
}

export default Footer
