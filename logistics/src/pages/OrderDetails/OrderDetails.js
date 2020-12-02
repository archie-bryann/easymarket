import React, { Fragment, useEffect, useState } from 'react'
import Loader from '../../components/Loader/Loader';
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {sentenceCase} from 'sentence-case'
import { Link, Redirect } from 'react-router-dom';
import OrderProduct from '../../components/OrderProduct/OrderProduct';

toast.configure();

function OrderDetails({apiRootUrl,clientRootUrl,token,requireAuth,match,errorMessage}) {

    const {orderId} = match.params;
    const [loading,setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [subtotal, setSubtotal] = useState(0);
    const [delivery, setDelivery] = useState(0);
    const [total, setTotal] = useState(0);
    const [orderProducts, setOrderProducts] = useState([]);
    const [redr,setRedr] = useState(false);


    useEffect(()=>{
        setLoading(true);
        axios.get(`${apiRootUrl}order/d/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(({data})=>{
            setLoading(false);
            setStatus(data.status);
            setSubtotal(data.subtotal);
            setDelivery(data.delivery);
            setTotal(data.total);
            setOrderProducts(data.orderedProducts)
        }).catch(err=>{
            setLoading(false);
            // redirect to /404
            setRedr(true);
        })
    }, [apiRootUrl])

    return (
        <Fragment>
            {requireAuth()}
            {loading&&<Loader/>}
            {redr&&<Redirect to = "/404" />}
            <main>
                <div className = "main__container">
                <div>
                <div className = "row row-2" style = {{marginTop:'-5px'}}>
                    <h3>Order {orderId}</h3> 
                    <i>{sentenceCase(status)}</i> | <Link to = {`/update/order/${orderId}`} className = "_btn">Update Status</Link>
                </div>
                <div style = {{height:'15px'}}></div>
                <table>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                    {
                        orderProducts && (
                            orderProducts.map(({id,productId,price,quantity,orderId})=><OrderProduct key = {id} productId = {productId} price = {price} quantity = {quantity} orderId = {orderId} apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl} errorMessage = {errorMessage} />)
                        )
                    }
                </table>
                <div className = "total-price">
                    <table>
                        <tr>
                            <td><b>Subtotal</b></td> 
                            <td>₦{Number(subtotal).toLocaleString(undefined, {maximumFractionDigits:2})}</td> 
                        </tr>
                        <tr>
                            <td><b>Delivery</b></td> 
                            <td>₦{Number(delivery).toLocaleString(undefined, {maximumFractionDigits:2})}</td> 
                        </tr>
                        <tr>
                            <td><b>Total</b></td> 
                            <td>₦{Number(total).toLocaleString(undefined, {maximumFractionDigits:2})}</td> 
                        </tr>
                    </table>
                </div>
                {/* show only if the order is cancelled */}
                {/* <div className = "order-div">
                <button className = "btn">Re-order</button>
                </div> */}
                {/* for pending orders only */}
                {/* <div className = "order-div">
                <button className = "btn">Cancel</button>
                </div> */}
                <br />
                <br />
                <br />
            </div>
                </div>
            </main>
        </Fragment>
    )
}

export default OrderDetails;
