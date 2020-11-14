import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

function Product({product,apiRootUrl}) {
    const {id,categoryId,name,image,price} = product;
    return (
        <div className = "col-4">
            <Link to = {`/product/${id}/${categoryId}`}>
                <img src = {`${apiRootUrl}uploads/${image}`} className = "curve" alt = "" />
                <h4><b>{name}</b></h4>
                <p>₦{price}</p>
            </Link>
        </div>
    )
}

export default Product
