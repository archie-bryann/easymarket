import axios from 'axios';
import React, {useState,useEffect} from 'react'
import { Redirect } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Loader from '../../components/Loader/Loader';
import Products from '../../components/Products/Products'; 
import './CategoryDetails.css'

function CategoryDetails({title,apiRootUrl, clientRootUrl ,match}) {

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
        .catch(err=>console.log(err))
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
            <Header title = {title} clientRootUrl = {clientRootUrl} />
            <Products products = {products} apiRootUrl = {apiRootUrl}>
                <br />
                {/* // correct this // */}
                <div className = "cat-cover" style = {{background:`url('${apiRootUrl}uploads/${category.image}')`}}>
                <h2 className = "cat-title">{category.name}</h2>
                </div>
                <div style = {{marginTop:'22px'}}></div>
            </Products>

            
        </React.Fragment>
    )
}

export default CategoryDetails
