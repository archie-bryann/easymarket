import React, { Fragment,useState,useEffect } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom';
import './OrderProduct.css'

toast.configure();

function OrderProduct({productId,price,quantity,orderId,apiRootUrl,clientRootUrl,errorMessage}) {

    const [categoryId, setCategoryId] = useState(null);
    const [name, setName] = useState(null);
    const [image, setImage] = useState(null);

    useEffect(()=>{
        // setLoading(true)
        axios.get(`${apiRootUrl}product/r/${productId}`)
        .then(({data})=>{
            // setLoading(false)
            // console.log(data)
            setCategoryId(data.categoryId);
            setName(data.name);
            setImage(data.image);
        }).catch(err=>{
            // setLoading(false)
            toast.error(errorMessage, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })

    }, [apiRootUrl])

    return (
        <Fragment>
            <tr>
                <td>
                    <div className = "cart-info">
                        {/* <Link to = {`/product/${productId}/${categoryId}`}> */}
                            {/* <img src = {`${apiRootUrl}uploads/${image}`} style = {{objectFit:'cover',borderRadius:'5px'}} alt = "" /> */}
                        {/* </Link> */}
                        <div>
                            {/* <Link to = {`/product/${productId}/${categoryId}`}> */}
                                <p className = "product-link-text">{name}</p>
                            {/* </Link> */}
                            {/* <small>Price: ₦{price}</small> */}
                        </div>
                    </div>
                </td>
                    <td>{price}</td>
                    <td>{quantity}</td>
                <td>₦{price*quantity}</td>
            </tr>
        </Fragment>
    )
}

export default OrderProduct;
