import React, { Fragment, useState, useEffect } from 'react'
import Header from '../../components/Header/Header'
import './Orders.css'
import axios from 'axios'
import Loader from '../../components/Loader/Loader';
import Order from '../../components/Order/Order';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Empty from '../../components/Empty/Empty';

toast.configure();

function Orders({title, apiRootUrl, clientRootUrl, loggedInStatus, cartNum, requireAuth, token, errorMessage}) {

    document.title = `My Orders - ${title}`;

    const [orders,setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${apiRootUrl}order/user/${localStorage.getItem('userId')}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(({data})=>{
            console.log(data)
            setIsLoading(false)  
            setOrders(data);
        }).catch(err=>{
            setIsLoading(false)
            toast.error(errorMessage, {
                position: toast.POSITION.BOTTOM_RIGHT
            }) 
        })
    }, [apiRootUrl])


    return (
        <Fragment>
            {requireAuth()}
            {isLoading&&<Loader />}
            <Header title = {title} clientRootUrl = {clientRootUrl} loggedInStatus = {loggedInStatus} cartNum = {cartNum} token = {token} />

            <br />
            <br />
            
                {
                (orders.length>0) && (
                    <div className = "small-container cart-page">
                        <table>
                            <tr>
                                <th>Order</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Total</th>
                            </tr>
                            {orders.map(({id,userId,status,total,timestamp})=>
                            <Order key = {id} id = {id} status = {status} total = {total} timestamp = {timestamp}  />)}
                        </table>
                    </div>
                )

                }
                
                {(orders.length<1) && (
                    <Fragment>
                        <Empty clientRootUrl = {clientRootUrl}>Ahh! Your haven't made any orders.</Empty>
                    </Fragment>
                )}
                <div style = {{height:'130px'}}></div>
        </Fragment>
    )
}

export default Orders
