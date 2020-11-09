import React from 'react'
import './Offer.css'
import { Link } from 'react-router-dom'

function Offer() {
    return (
        <div className = "offer">
            <div className = "small-container">
                <div className = "row">
                    <div className = "col-3">
                        <img src = "images/exclusive.png" className = "offer-img"/>
                    </div>
                    <div className = "col-2">
                        <p>Exclusively Avavilable on RedStore</p>
                        <h1>Smart Band 4</h1>
                        <small>The Mi Smart Band 4 features a 39.9% larger (than Mi Band 3) AMOLED color full-touch display with adjustable brightness, so everything, so everything is clear as can be.</small><br />
                        <Link to = "" className="link btn">Explore Now</Link>
                    </div>  
                </div>
            </div>
        </div>
    )
}

export default Offer
