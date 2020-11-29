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
    const [cat,setCat] = useState([]);

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
                // console.log(data)
                setLoading(false);
                let categories = data;
                categories.map(({id,name})=>{
                    setCat(prevCat=>[...prevCat,{id,name}]);
                })
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

    function updateProduct(e) {
        e.preventDefault();        
        const formData = new FormData();
        const imagefile = document.querySelector('#file');
        formData.append("name", name);
        formData.append("productImage", imagefile.files[0]);
        formData.append("categoryId", category);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("visible", visible);
        formData.append("starred",starred);
        formData.append("out_of_stock",outOfStock);

        if(name.trim() === '' || description === '' || price === '' || !imagefile.files[0]) {
            toast.error('All fields are required', {
                position: toast.POSITION.BOTTOM_LEFT
            })
        } else {
            setLoading(true);
            axios.patch(`${apiRootUrl}product/${productId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(({data})=>{
                setLoading(false);
                setImage(data.image);
            }).catch(err=>{
                setLoading(false);
                // console.log(err)
                toast.error('All fields are required', {
                    position: toast.POSITION.BOTTOM_LEFT
                })
            })
        }
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
                            <label>Image</label>
                            <input type = "file" id = "file" />
                        </div>
                        <div>
                            <label>Category</label>
                            {/* <input type = "text" onChange = {changeCategory} value = {category}></input> */}
                            <select value = {category} onChange = {changeCategory}>    
                                {cat.map(({id,name})=><option key = {id} value = {id}>{name}</option>)}
                            </select>
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
                            <select value = {visible} onChange = {changeVisible}>
                                <option>0</option>
                                <option>1</option>
                            </select>
                        </div>
                        <div>
                            <label>Starred</label>
                            <select value = {starred} onChange = {changeStarred}>
                                <option>0</option>
                                <option>1</option>
                            </select>
                        </div>
                        <div>
                            <label>Out Of Stock</label>
                            <select value = {outOfStock} onChange = {changeOutOfStock}>
                                <option>0</option>
                                <option>1</option>
                            </select>
                        </div>
                        <div style = {{marginTop:'14px'}}>
                            <button className = "btn block" onClick = {updateProduct}>Update Product</button>
                        </div>
                    </form>
                </div>
            </main>
        </Fragment>
    )
}

export default ProductDetails
