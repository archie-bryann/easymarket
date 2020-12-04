import React from 'react'
import './Testimonial.css'

function Testimonial({clientRootUrl}) {
    return (
        <div className = "testimonial">
            <div className = "small-container">
                <div className = "row">
                    <div className = "col-3">
                        <i className =  "fa fa-quote-left"></i>
                        <p>Whoa Foodnet is slick. They deliver the food items I ordered within the day. Their platform is just so fast and easy to use.</p>
                        <img src = {`${clientRootUrl}images/joshua-oluwagbemiga-v_xXhGuMqsw-unsplash.jpg`} style = {{objectFit:'contain',height:'100px'}} />
                        <h3>Ayomide Adeyeye</h3>
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
                        <p>Foodnet saves the stress of going to the market almost evey day whenever i'm need of food items as a housewife. They literally brought the market to me.</p>
                        <img src = {`${clientRootUrl}images/jide-salau-hwc1A8Iery0-unsplash.jpg`} style = {{objectFit:'contain',height:'100px'}} />
                        <div className = "rating">
                            <i className = "fa fa-star"></i>
                            <i className = "fa fa-star"></i>
                            <i className = "fa fa-star"></i>
                            <i className = "fa fa-star"></i>
                            <i className = "fa fa-star"></i>
                            <i className = "fa fa-star-half-o"></i>
                        </div>
                        <h3>Victoria Adesoji</h3>
                    </div>
                    <div className = "col-3">
                        <i className =  "fa fa-quote-left"></i>
                        <p>Where has this been all my life. Foodnet works like magic.</p>
                        <img src = {`${clientRootUrl}images/dominic-uzoanya-YkcWN0oc__s-unsplash.jpg`} style = {{objectFit:'contain',height:'100px'}} />
                        <div className = "rating">
                            <i className = "fa fa-star"></i>
                            <i className = "fa fa-star"></i>
                            <i className = "fa fa-star"></i>
                            <i className = "fa fa-star"></i>
                            <i className = "fa fa-star"></i>
                            <i className = "fa fa-star-half-o"></i>
                        </div>
                        <h3>Abimbola Adeyemi</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonial;