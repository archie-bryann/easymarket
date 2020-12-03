import React, { Fragment, useEffect, useState } from 'react'
import Loader from '../../components/Loader/Loader';
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure();

function OrderUpdate({apiRootUrl,clientRootUrl,token,requireAuth,match,errorMessage}) {
    
    const {orderId} = match.params;
    const [loading,setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [redr,setRedr] = useState(false);
    const [redr2,setRedr2] = useState(false);
    const [description,setDescription] = useState('');

    useEffect(()=>{
        setLoading(true);
        axios.get(`${apiRootUrl}order/d/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(({data})=>{
            setLoading(false);
            setStatus(data.status);
        }).catch(err=>{
            setLoading(false);
            // redirect to /404
            setRedr(true);
        })
    }, [apiRootUrl]);

    function changeStatus(e) {
        setStatus(e.target.value);
    }

    function changeDescription(e) {
        setDescription(e.target.value);
    }

    function updateOrderStatus(e) {
        e.preventDefault();
        setLoading(true);
        axios.patch(`${apiRootUrl}order/t/${orderId}`, {
            status,
            description
        }, {
            headers: {
                Authorization:`Bearer ${token}`
            }
        })
        .then(({data})=>{
            setLoading(false);
            setRedr2(true);
        }).catch(err=>{
            // console.log(err)
            setLoading(false);
            toast.error(errorMessage, {
                position: toast.POSITION.BOTTOM_LEFT
            })
        })
    }
    
    return (
        <Fragment>
            {requireAuth()}
            {loading&&<Loader/>}
            {redr&&<Redirect to = "/404" />}
            {redr2&&<Redirect to = {`/order/${orderId}`} />}
            <main>
                <div className = "main__container">
                    <h2 style = {{marginBottom:'10px'}}>Update Order Status</h2>
                    <form>
                        <div>
                            <select value = {status} onChange={changeStatus}>
                                <option value = "pending">Pending</option>
                                <option value = "fulfilled">Fulfilled</option>
                                <option value = "cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div>
                            <textarea onChange = {changeDescription}>{description}</textarea>
                        </div>
                        <div style = {{marginTop:'14px'}}>
                            <button className = "btn block" onClick = {updateOrderStatus}>Update Order Status</button>
                        </div>
                    </form>
                </div>
            </main>
        </Fragment>
    )
}

export default OrderUpdate;
