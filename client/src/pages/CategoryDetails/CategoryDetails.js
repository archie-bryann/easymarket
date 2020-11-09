import axios from 'axios';
import React, {useState,useEffect} from 'react'
import { Redirect } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Products from '../../components/Products/Products'; 
import './CategoryDetails.css'

function CategoryDetails({title,apiRootUrl, clientRootUrl ,match}) {

    const categoryId = match.match.params.categoryId; 

    const [category,setCategory] = useState([]);
    const [products,setProducts] = useState([]);

    const [notFoundStatus, setNotFoundStatus] = useState(false);

    useEffect(() => {
        axios.get(`${apiRootUrl}category/${categoryId}`)
        .then(res=>{
            if(res.data.error) {
                setNotFoundStatus(true);
            } else {
                setCategory(res.data);
                setProducts(res.data.products)    
            }
        })
        .catch(err=>console.log(err))
    }, [categoryId,apiRootUrl])

    document.title = `${category.name} - ${title}`;

    return (
        <React.Fragment>
            { notFoundStatus && (
                <Redirect to = "/404" />
            ) }
            <Header title = {title} clientRootUrl = {clientRootUrl} />
            <Products products = {products} apiRootUrl = {apiRootUrl}>
                <br />
                <div className = "cat-cover" style = {{background:"url('http://localhost:9000/uploads/categoryImage-004f2d0d-1f8f-4e84-9b32-e4717557c7f7-sWyuAS.jpg')"}}>
                <h2 className = "cat-title">{category.name}</h2>
                </div>
                <div style = {{marginTop:'22px'}}></div>
            </Products>
        </React.Fragment>
    )
}

export default CategoryDetails
