import React from 'react'
import './Testimonial.css'

function Testimonial() {
    return (
        <div className = "testimonial">
            <div className = "small-container">
                <div className = "row">
                    <div className = "col-3">
                        <i className =  "fa fa-quote-left"></i>
                        <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
                        <img src = "img.png" />
                        <h3>Sean Parker</h3>
                        <div className = "rating">
                            <i className = "fa fa-star"></i>
                            <i className = "fa fa-star"></i>
                            <i className = "fa fa-star"></i>
                            <i className = "fa fa-star"></i>
                            <i className = "fa fa-star"></i>
                            <i className = "fa fa-star-half-o"></i>
                        </div>
                    </div>
                    <div className = "col-3">
                        <i className =  "fa fa-quote-left"></i>
                        <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
                        <img src = "img.png" />
                        <div className = "rating">
                            <i className = "fa fa-star"></i>
                            <i className = "fa fa-star"></i>
                            <i className = "fa fa-star"></i>
                            <i className = "fa fa-star"></i>
                            <i className = "fa fa-star"></i>
                            <i className = "fa fa-star-half-o"></i>
                        </div>
                        <h3>Sean Parker</h3>
                    </div>
                    <div className = "col-3">
                        <i className =  "fa fa-quote-left"></i>
                        <p>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
                        <img src = "img.png" />
                        <div className = "rating">
                            <i className = "fa fa-star"></i>
                            <i className = "fa fa-star"></i>
                            <i className = "fa fa-star"></i>
                            <i className = "fa fa-star"></i>
                            <i className = "fa fa-star"></i>
                            <i className = "fa fa-star-half-o"></i>
                        </div>
                        <h3>Sean Parker</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonial
