import React, { Fragment, useEffect, useState } from 'react'
import Loader from '../../components/Loader/Loader';
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import './ProductDetails.css'

toast.configure();

function ProductDetails({apiRootUrl,token,requireAuth,match,errorMessage}) {

    const {productId} = match.params;
    const [loading,setLoading] = useState(false);
    const [name,setName] = useState('');
    const [image,setImage] = useState('');
    const [category,setCategory] = useState(''); // trickish
    const [description,setDescription] = useState('');
    const [price, setPrice] = useState(null);
    const [visible,setVisible] = useState(null);
    const [starred,setStarred] = useState(null);
    const [outOfStock,setOutOfStock] = useState(null);
    const [timestamp,setTimestamp] = useState(null);

    useEffect(()=>{
        setLoading(true);
        axios.get(`${apiRootUrl}product/${productId}`)
        .then(({data})=>{
            console.log(data)
            setName(data.name);
            setImage(data.image);
            setCategory(data.categoryId);
            setDescription(data.description);
            setPrice(data.price);
            setVisible(data.visible);
            setStarred(data.starred);
            setOutOfStock(data.out_of_stock);
            setTimestamp(data.timestamp);


            /** request for categories */
            // get all categories put in a state and try
            axios.get(`${apiRootUrl}category`)
            .then(({data})=>{
                setLoading(false);
                console.log(data);
            }).catch(err=>{
                setLoading(false);
                toast.error(errorMessage, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose:false
                })                    
            })

        }).catch(err=>{
            setLoading(false);
            toast.error(errorMessage, {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose:false
            })
        })
    }, [])

    function changeName(e) {
        setName(e.target.value);
    }

    function changeCategory(e) { 
        setCategory(e.target.value);
    }

    function changeDescription(e) {
        setDescription(e.target.value);
    }   

    function changePrice(e) {
        setPrice(e.target.value);
    }

    function changeVisible(e) {
        setVisible(e.target.value);
    }

    function changeStarred(e) {
        setStarred(e.target.value);
    }

    function changeOutOfStock(e) {
        setOutOfStock(e.target.value);
    }

    return (    
        <Fragment>
            {requireAuth()}
            {loading&&<Loader/>}
            <main>
                <div className = "main__container">
                    <h2>Product Details</h2>
                    <div class = "product">
                        <img src = {`${apiRootUrl}uploads/${image}`} alt = "" />
                        <br /><i style = {{fontWeight:'bold'}}>Date Created: {moment.unix(timestamp).format("MM/DD/YYYY")}</i>
                    </div>
                    <form>
                        <div>
                            <label>Name</label>
                            <input type = "text" onChange = {changeName} value = {name} />
                        </div>
                        <div>
                            <label>Category</label>
                            <input type = "text" onChange = {changeCategory} value = {category}></input>
                        </div>
                        <div>
                            <label>Description</label>
                            <input type = "text" onChange = {changeDescription} value = {description} />
                        </div>
                        <div>
                            <label>Price</label>
                            <input type = "text" onChange = {changePrice} value = {price} />
                        </div>
                        <div>
                            <label>Visible</label>
                            <input type = "text" onChange = {changeVisible} value = {visible} />
                        </div>
                        <div>
                            <label>Starred</label>
                            <input type = "text" onChange = {changeStarred} value = {starred} />
                        </div>
                        <div>
                            <label>Out Of Stock</label>
                            <input type = "text" onChange = {changeOutOfStock} value = {outOfStock} />
                        </div>
                    </form>
                </div>
            </main>
        </Fragment>
    )
}

export default ProductDetails
