import React from 'react'
import Header from '../../components/Header/Header'

function About({title,apiRootUrl,clientRootUrl}) {

    document.title = `About Us - ${title}`;

    return (
        <React.Fragment>
            <Header title = {title} clientRootUrl = {clientRootUrl}/>
            <div style = {{marginTop:'-30px'}}></div>
            <div className = "small-container single-product">
                <div className = "row">
                    <div className = "col-2">
                        <img src = {`${clientRootUrl}images/about.png`} className = "img-style" />
                    </div>
                    <div className = "col-2">
                        <h2>About Us</h2><br />
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac urna nec magna posuere aliquet. Curabitur suscipit mollis dignissim. Vestibulum metus magna, laoreet finibus sagittis sed, cursus ut nulla. Integer id nulla auctor, commodo dolor nec, convallis massa. Sed euismod, nisi sed gravida elementum, elit libero aliquet arcu, nec pretium leo nisi non orci. Etiam accumsan dignissim nibh, quis volutpat purus pharetra nec. Phasellus sollicitudin iaculis lacus non mattis. Mauris molestie porttitor purus. Sed ac mattis lectus. Sed id urna vel metus iaculis varius.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac urna nec magna posuere aliquet. Curabitur suscipit mollis dignissim. Vestibulum metus magna, laoreet finibus sagittis sed. </p>
                    </div>
                </div>
            </div>
            <div style = {{height:'50px'}}></div>
        </React.Fragment>
    )
}

export default About
