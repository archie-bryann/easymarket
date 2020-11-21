import React, { Fragment, useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './CartProduct.css'
import { Link } from 'react-router-dom';

toast.configure();

function CartProduct({cartId,quantity,id,categoryId,name,description,image,price,out_of_stock,apiRootUrl,token,errorMessage,delCartItem,addSubTotals,calculateNewSubTotalAndTotal,less}) {

    const [cQuantity, setCQuantity] = useState(quantity);
    const [loading, setLoading] = useState(false);

    const [subTotal, setSubTotal] = useState(price*quantity);

    useEffect(() => {
        addSubTotals(Number(price) * quantity) // add full prices
    }, [apiRootUrl])

    function updateQuantity(e) {
        // setLoading(true);
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
            // setLoading(false);
            if(data.error === 0) {
                // toast.success(data.message, {
                //     position: toast.POSITION.BOTTOM_RIGHT
                // })
                setCQuantity(newQuantity);
                
                // update subTotal
                setSubTotal(price*newQuantity)

                // update total subTotal in Cart
                // here...

                // overall total
                // here...
                calculateNewSubTotalAndTotal(newQuantity, cartId);

                

            } else {
                toast.error(errorMessage, {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            }

        })
        .catch(err=>{
            // setLoading(false);
            toast.error(errorMessage, {
                position: toast.POSITION.BOTTOM_RIGHT
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
                        { !less && (
                            <Link to = {`/product/${id}/${categoryId}`}>
                            <img src = {`${apiRootUrl}uploads/${image}`} style = {{objectFit:'cover',borderRadius:'5px'}} alt = "" />
                            </Link>
                        )}
                        
                        <div>

                            
                            <Link to = {`/product/${id}/${categoryId}`}>
                            <p className = {less ? 'f' : (
                                'product-link-text'
                            )}>{name}</p>
                            </Link>
                            
                            
                            <small>Price: ₦{price}</small>
                            {
                                !less && (
                                    <Fragment>
                                        <br />
                                        <a className = "remove" onClick = {delCartItem.bind(this, cartId)}>Remove</a>
                                    </Fragment>
                                )
                            }
                        </div>
                    </div>
                </td>
                <td>
                    {less ? (
                        cQuantity
                    ) : (
                        <input className = "q_d" type = "number" value = {cQuantity} onChange = {updateQuantity} style = {{width:'51px'}} />
                    ) }
                </td>
                <td>{Number(subTotal).toFixed(2).toLocaleString(undefined, {maximumFractionDigits:2})}</td> {/** to 2 d.p. */}
            </tr>
        </React.Fragment>
    )
}

export default CartProduct
