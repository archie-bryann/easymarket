import React, { useState } from 'react'
import Loader from '../Loader/Loader';
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './CartProduct.css'
import { Link } from 'react-router-dom';

toast.configure();

function CartProduct({cartId,quantity,id,categoryId,name,description,image,price,apiRootUrl,token,errorMessage,delCartItem}) {

    const [cQuantity, setCQuantity] = useState(quantity);
    const [loading, setLoading] = useState(false);

    const [subTotal, setSubTotal] = useState(price*quantity);

    function updateQuantity(e) {
        setLoading(true);
        const newQuantity = e.target.value;
        
        // send request to server
        axios.patch(`${apiRootUrl}cart/${cartId}`, {
            quantity: newQuantity
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(({data})=>{
            setLoading(false);
            if(data.error === 0) {
                toast.success(data.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
                setCQuantity(newQuantity);
                
                // update subTotal
                setSubTotal(price*newQuantity)

                
            } else {
                toast.error(errorMessage, {
                    position: toast.POSITION.TOP_RIGHT
                })
            }

        })
        .catch(err=>{
            setLoading(false);
            toast.error(errorMessage, {
                position: toast.POSITION.TOP_RIGHT
            })
        })
    }

    return (
        <React.Fragment>
            {
                loading && <Loader />
            }
            <tr>
                <td>
                    <div className = "cart-info">
                        <Link to = {`/product/${id}/${categoryId}`}>
                        <img src = {`${apiRootUrl}uploads/${image}`} style = {{objectFit:'cover',borderRadius:'5px'}} alt = "" />
                        </Link>
                        <div>
                            <Link to = {`/product/${id}/${categoryId}`}>
                            <p className = "product-link-text">{name}</p>
                            </Link>
                            <small>Price: ₦{price}</small>
                            <br />
                            <a className = "remove" onClick = {delCartItem.bind(this, cartId)}>Remove</a>
                        </div>
                    </div>
                </td>
                <td><input type = "number" value = {cQuantity} onChange = {updateQuantity} style = {{width:'51px'}} /></td>
                <td>{subTotal}</td>
            </tr>
        </React.Fragment>
    )
}

export default CartProduct
