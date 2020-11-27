import React, { Fragment, useState, useEffect } from 'react'
import Loader from '../../components/Loader/Loader'
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Redirect } from 'react-router-dom'
import './CategoryDetails.css'
import Product from '../../components/Product/Product'
import moment from 'moment'

toast.configure();

function CategoryDetails({apiRootUrl,token,requireAuth,match,errorMessage}) {
    
    const {categoryId} = match.params;
    const [loading,setLoading] = useState(false);
    const [category,setCategory] = useState([]);
    const [categoryName,setCategoryName] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [products,setProducts] = useState([]);
    const [redr,setRedr] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        axios.get(`${apiRootUrl}category/${categoryId}`)
        .then(({data})=>{
            setLoading(false);
            if(data.error) {
                setRedr(true);
            } else {
                setCategory(data);
                setCategoryName(data.name);
                setCategoryImage(data.image);
                setProducts(data.products);  
            }
        }).catch(err=>{
            setLoading(false);
            toast.error('All fields are required', {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose:false
            })
        })
    }, [])

    function changeName(e) {
        setCategoryName(e.target.value);
    }

    function updateCategory(e) {
        e.preventDefault();
        const formData = new FormData();
        const imagefile = document.querySelector('#file');
        formData.append("name",categoryName);
        formData.append("categoryImage", imagefile.files[0]);
        if(categoryName.trim() === '' || !imagefile.files[0]) {
            toast.error('All fields are required', {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose:false
            })
        } else {
            setLoading(true);
            axios.patch(`${apiRootUrl}category/${category.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }).then(({data})=>{
                setLoading(false);
                // console.log(data)
                setCategoryImage(data.image)
            }).catch(err=>{
                setLoading(false);
                toast.error(errorMessage, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose:false
                })
            })
        }
    }

    return (
        <Fragment>
            {requireAuth()}
            {loading&&<Loader/>}
            {redr&&<Redirect to = "/404"/>}
            <main>
                <div className = "main__container">

                <h2>Category</h2>

                    
                    <div className = "category">

                    <div className = "charts">
                        <div className = "charts__left" style = {{background:'none'}}>
                            <img src = {`${apiRootUrl}uploads/${categoryImage}`} className = "cat-img" />
                            <br />
                            <i style = {{fontWeight:'bold'}}>Date Created: {moment.unix(category.timestamp).format("MM/DD/YYYY")}</i>
                        </div>
                        <div className = "charts__right" style = {{background:'none'}}>
                            <form>
                                <div>
                                    <label>Name</label>
                                    <input type = "text" value = {categoryName} onChange = {changeName} />
                                </div>
                                <div>
                                    <label>Image</label>
                                    <input type = "file" id = "file" />
                                </div>
                                <div style = {{marginTop:'14px'}}>
                                    <button className = "btn block" onClick = {updateCategory}>Update Category</button>
                                </div>
                            </form>
                        </div>
                    </div>


                       
                    </div>
                    <div className = "products">
                        <h2>Products</h2>
                        <table>
                            <tr>
                                <th>Id</th>
                                <th>Name/Image</th>
                                <th>Description</th>
                                <th>Price(₦)</th>
                                <th>Visible</th>
                                <th>Starred</th>
                                <th>Out Of Stock</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                            {products.map(({id,categoryId,name,description,image,price,visible,starred,out_of_stock,timestamp})=><Product id = {id} categoryId = {categoryId} name = {name} description = {description} image = {image} price = {price} visible = {visible} starred = {starred} out_of_stock = {out_of_stock} timestamp = {timestamp} apiRootUrl = {apiRootUrl} />)}
                        </table>
                    </div>
                </div>
            </main>
        </Fragment>
    )
}

export default CategoryDetails;
