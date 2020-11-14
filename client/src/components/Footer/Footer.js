import React from 'react'
import './Footer.css'

function Footer({title, clientRootUrl}) {
    return (
        <div className = "footer">
            <div className = "container">
                <div className = "row">
                    <div className ="footer-col-1">
                        <h3>Download Our App</h3>
                        <p>Download App for Android and ios mobile phone</p>
                        <div className = "app-logo">
                            <img src = {`${clientRootUrl}images/app-store.png`} />
                            <img src = {`${clientRootUrl}images/play-store.png`} />
                        </div>
                    </div>
                    <div className = "footer-col-2">
                        <img src = {`${clientRootUrl}images/foodnet-white.png`} />
                        <p>Our Purpose Is To Sustainably Make the Pleasure and Benefits of Sports Accessible to the Many.</p>
                    </div>
                    <div className = "footer-col-3">
                        <h3>Useful Links</h3>
                        <ul>
                            <li>Coupons</li>
                            <li>Blog Post</li>
                            <li>Return Policy</li>
                            <li>Join Affliate</li>
                        </ul>
                    </div>
                    <div className = "footer-col-4">
                        <h3>Follow us</h3>
                        <ul>
                            <li>Facebook</li>
                            <li>Twitter</li>
                            <li>Instagram</li>
                            <li>YouTube</li>
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
