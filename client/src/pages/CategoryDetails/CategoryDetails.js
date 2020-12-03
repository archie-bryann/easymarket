import axios from 'axios';
import React, {useState,useEffect} from 'react'
import { Redirect } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import Products from '../../components/Products/Products'; 
import './CategoryDetails.css'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure();

function CategoryDetails({title,apiRootUrl, clientRootUrl ,match, loggedInStatus, cartNum, token, errorMessage}) {

    const categoryId = match.params.categoryId; 

    const [category,setCategory] = useState([]);
    const [products,setProducts] = useState([]);

    const [notFoundStatus, setNotFoundStatus] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${apiRootUrl}category/${categoryId}`)
        .then(res=>{
            if(res.data.error) {
                setNotFoundStatus(true);
            } else {
                setCategory(res.data);
                setProducts(res.data.products)   
                setIsLoading(false) 
            }
        })
        .catch(err=>{
            toast.error(errorMessage, {
                position: toast.POSITION.BOTTOM_RIGHT
            })   
        })
    }, [categoryId,apiRootUrl])

    document.title = `${category.name} - ${title}`;

    return (
        <React.Fragment>
            { notFoundStatus && (
                <Redirect to = "/404" />
            )
            }
            {
                 isLoading && (
                    <Loader />
                )
            }
            <Header title = {title} clientRootUrl = {clientRootUrl} loggedInStatus = {loggedInStatus} cartNum = {cartNum} token = {token} />
            <Products products = {products} apiRootUrl = {apiRootUrl}>
                <br />
                {/* // correct this // */}
                <div className = "cat-cover" style = {{background:`url('${apiRootUrl}uploads/${category.image}')`}}>
                <h2 className = "cat-title">{category.name}</h2>
                </div>
                <div style = {{marginTop:'22px'}}></div>
            </Products>
            {products.length<1 && (
                <div style = {{height:'200px'}}></div>
            )}
            
        </React.Fragment>
    )
}

export default CategoryDetails;
