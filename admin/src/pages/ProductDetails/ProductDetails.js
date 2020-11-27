import React, { Fragment, useState } from 'react'

function ProductDetails({apiRootUrl,token,requireAuth,match,errorMessage}) {

    const {productId} = match.params;
    const [loading,setLoading] = useState(false);
    const [name,setName] = useState('');
    const [image,setImage] = useState('');
    const [description,setDescription] = useState('');
    const [price, setPrice] = useState(null);
    const [visible,setVisible] = useState(null);
    const [starred,setStarred] = useState(null);
    const [outOfStock,setOutOfStock] = useState(null);

    return (    
        <Fragment>
            {requireAuth()}
            <main>
                <div className = "main__container">
                    <h2>Product Details</h2>
                </div>
                <div>
                    <img src = {`${apiRootUrl}uploads/${image}`} alt = "" />
                </div>
            </main>
        </Fragment>
    )
}

export default ProductDetails
