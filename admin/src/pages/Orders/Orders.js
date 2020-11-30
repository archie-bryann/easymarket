import React, { Fragment, useEffect, useState } from 'react'
import Loader from '../../components/Loader/Loader';
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Order from '../../components/Order/Order';

toast.configure();

function Orders({apiRootUrl,token,requireAuth,errorMessage,location}) {

    const [loading,setLoading]=useState(false);
    const [orders,setOrders]=useState([]);
    
    useEffect(()=>{
        setLoading(true);
        axios.get(`${apiRootUrl}order`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(({data})=>{
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
                    <h2 style = {{marginBottom:'15px'}}>Orders</h2>
                    <table>
                        <tr>
                            <th>Order</th>
                            <th>User</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                        {orders.map(({id,userId,status,total,timestamp})=><Order key = {id} id = {id} userId = {userId} status = {status} total = {total} timestamp = {timestamp} />)}
                    </table>
                </div>
            </main>
        </Fragment>
    )
}

export default Orders;
