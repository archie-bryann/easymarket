import React from 'react'
import Product from '../Product/Product'
import './Products.css'

function Products({checker,children,products,apiRootUrl}) {
    return (
        <div className = "small-container">
            {children}
            <div className = "row" style = {{marginTop:'5px'}}>
                {
                    products.map((product)=><Product key = {product.id} product = {product} apiRootUrl = {apiRootUrl} />)
                }
            </div>
            {checker && (
                <div className = "page-btn">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span><i class="fa fa-arrow-right"></i></span>                    
                </div>
            )}
        </div>
    )
}

export default Products
