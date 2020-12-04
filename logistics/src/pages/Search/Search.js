import React, { Fragment, useEffect, useState } from 'react'
import queryString from 'query-string'
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from '../../components/Loader/Loader'
import { Link } from 'react-router-dom'
import Order from '../../components/Order/Order';

toast.configure();

function Search({apiRootUrl,clientRootUrl,token,requireAuth,errorMessage,location}) {

    const {q} = queryString.parse(location.search);
    const [loading,setLoading] = useState(false);
    const [orders,setOrders] = useState([]);

    useEffect(()=>{
        if(q) {
            setLoading(true);
            axios.get(`${apiRootUrl}miscellaneous/order/search/${q}`,{
                headers: {
                    Authorization:`Bearer ${token}`
                }
            }).then(({data})=>{
                setLoading(false)
                // console.log(data);
                setOrders(data);
            }).catch(err=>{
                setLoading(false);
            })
        }
    }, [apiRootUrl,q])


    return (
        <Fragment>
            {requireAuth()}
            {loading&&<Loader/>}
            <main>
                <div className = "main__container">
                    <table>
                        <tr>
                            <th>Order</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Deadline</th>
                            <th>Market Fee (₦)</th>
                            <th>Delivery Fee (₦)</th>
                            <th>Action</th>
                        </tr>
                        {orders.map(({id,subtotal,logisticFee,status,timestamp})=><Order key = {id} id = {id} subtotal = {subtotal} logisticFee = {logisticFee} status = {status} timestamp = {timestamp} more = {true} r = {true} />)}
                    </table>
                </div>
            </main>
        </Fragment>
    )
}

export default Search
