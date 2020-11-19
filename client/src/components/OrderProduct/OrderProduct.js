import React, { Fragment, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from '../Loader/Loader'

toast.configure();

function OrderProduct({productId,price,quantity,orderId,apiRootUrl,clientRootUrl,errorMessage}) {

    const [categoryId, setCategoryId] = useState(null);
    const [name, setName] = useState(null);
    const [image, setImage] = useState(null);
    // const [loading, setLoading] = useState(false);
    

    /** get details of the product */
    useEffect(()=>{
        // setLoading(true)
        axios.get(`${apiRootUrl}product/${productId}`)
        .then(({data})=>{
            // setLoading(false)
            setCategoryId(data.categoryId);
            setName(data.name);
            setImage(data.image);
        }).catch(err=>{
            // setLoading(false)
            toast.error(errorMessage, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })

        /** NO NEED TO CATCH ERROR */
    }, [apiRootUrl])

    return (
        <Fragment>
            {/* {loading&&<Loader/>} */}
            <tr>
                <td>
                    <div className = "cart-info">
                        <Link to = {`/product/${productId}/${categoryId}`}>
                            <img src = {`${apiRootUrl}uploads/${image}`} style = {{objectFit:'cover',borderRadius:'5px'}} alt = "" />
                        </Link>
                        <div>
                            <Link to = {`/product/${productId}/${categoryId}`}>
                                <p className = "product-link-text">{name}</p>
                            </Link>
                            <small>Price: ₦{price}</small>
                        </div>
                    </div>
                </td>
                    <td>{quantity}</td>
                <td>₦{price*quantity}</td>
            </tr>
        </Fragment>
    )
}

export default OrderProduct
