import React, { Fragment, useEffect, useState } from 'react'
import queryString from 'query-string'
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Loader from '../../components/Loader/Loader'
import './Search.css'
import { Link } from 'react-router-dom'

toast.configure();

function Search({apiRootUrl,clientRootUrl,token,requireAuth,errorMessage,location}) {

    const { q } = queryString.parse(location.search);
    const [loading,setLoading] = useState(false);
    const [users,setUsers] = useState([]);
    const [orders,setOrders] = useState([]);
    const [products,setProducts] = useState([]);
    const [categories,setCategories] = useState([]);

    useEffect(()=>{
        if(q) {
            setLoading(true);
            axios.get(`${apiRootUrl}miscellaneous/search/${q}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(({data})=>{
                setLoading(false);
                console.log(data)
                setUsers(data.users);
                setOrders(data.orders);
                setProducts(data.products);
                setCategories(data.categories);
            }).catch(err=>{
                setLoading(false);
                toast.error(errorMessage, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose:false
                })
            })
        }
    }, [apiRootUrl,q])

    return (
        <Fragment>
            {requireAuth()}
            {loading&&<Loader/>}
            <main>
                <div className = "main__container group">
                    <div className = "_users">
                        <h2>Users</h2>
                            {users.map(({id,firstname,lastname})=>{
                                return (
                                    <Fragment>  
                                        <div><Link to = {`/user/${id}`}>{firstname} {lastname}</Link></div>
                                    </Fragment>
                                )
                            })}
                    </div>
                    <div className = "_orders" >
                        <h2>Orders</h2>
                            {orders.map(({id})=>{
                                return (
                                    <Fragment>
                                        <div><Link to = {`/order/${id}`}>Order {id}</Link></div>
                                    </Fragment>
                                )
                            })}
                    </div>
                    <div className = "_products">
                        <h2>Products</h2>
                            {products.map(({id,name})=>{
                                return (
                                    <Fragment>
                                        <div><Link to = {`/product/${id}`}>{name}</Link></div>
                                    </Fragment>
                                )
                            })}
                    </div>
                    <div className = "_categories">
                        <h2>Categories</h2>
                            {categories.map(({id,name})=>{
                                return (
                                    <Fragment>
                                        <div><Link to = {`/category/${id}`}>{name}</Link></div>
                                    </Fragment>
                                )
                            })}
                    </div>
                </div>
            </main>
        </Fragment>
    )
}

export default Search
