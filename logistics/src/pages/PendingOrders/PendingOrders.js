import React, {Fragment, useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import Loader from '../../components/Loader/Loader';
import Order from '../../components/Order/Order';

toast.configure();

function PendingOrders({apiRootUrl, clientRootUrl, token, errorMessage, requireAuth}) {

    const [loading,setLoading] = useState(false);
    const [orders,setOrders] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.get(`${apiRootUrl}order/status/pending`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(({data})=>{
            setLoading(false);
            setOrders(data);
        }).catch(err=>{
            setLoading(false);
            toast.error(errorMessage, {
                position: toast.POSITION.BOTTOM_LEFT
            })
        })
    }, [])

    return (
        <Fragment>
            {requireAuth()}
            {loading&&<Loader/>}
            <main>
                <div className = "main__container">
                    <h2 style = {{marginBottom:'15px'}}>Pending Orders</h2>
                    <table>
                        <tr>
                            <th>Order</th>
                            <th>Date</th>
                            <th>Deadline</th>
                            <th>Market Fee (₦)</th>
                            <th>Delivery Fee (₦)</th>
                            <th>Action</th>
                        </tr>   
                        {orders.map(({id,subtotal,logisticFee,status,timestamp})=><Order key = {id} id = {id} subtotal = {subtotal} logisticFee = {logisticFee} status = {status} timestamp = {timestamp} more = {true} />)}
                    </table>
                </div>
            </main> 
        </Fragment>
    )
}

export default PendingOrders

/** See more: will contain the page -> orderedProducts && Address */