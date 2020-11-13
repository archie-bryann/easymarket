import React, {Fragment, useEffect, useRef, useState} from 'react'
import Header from '../../components/Header/Header'
import './Search.css'
import Products from '../../components/Products/Products'
import queryString from 'query-string'
import FeaturedCategories from '../../components/FeaturedCategories/FeaturedCategories'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import axios from 'axios'
import Category from '../../components/Category/Category'
import Loader from '../../components/Loader/Loader'

function Search({title,apiRootUrl,clientRootUrl, location}) {

    const inputRef = useRef(null);
    const linkRef = useRef(null);

    const [searchInput, setSearchInput] = useState('');
    const [status, setStatus] = useState(false);
    const [categoryResults, setCategoryResults] = useState([]);
    const [productResults, setProductResults] = useState([]);

    const [resultReadyStatus, setResultReadyStatus] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const { q } = queryString.parse(location.search);

    document.title = `${searchInput} - ${title}`;

    useEffect(()=>{
        setIsLoading(true);
    }, [q])

    useEffect(() => {
        
        if(q) {
            setSearchInput(q);
            setStatus(true)
            // perform search query :: show preloader
            axios.get(`${apiRootUrl}search/${q}`)
            .then(res=>{
                setResultReadyStatus(true);
                setProductResults(res.data.products);
                setCategoryResults(res.data.categories)
                setIsLoading(false)
            })
            .catch(err=>console.log(err))
        } else {
            setIsLoading(true) 
            inputRef.current.focus()
        }
    }, [q])

    function changeHandler(e) {
        setSearchInput(e.target.value);
    }

    function checkProducts() {
    }

    function checkCategories() {
    }

    return (
        <React.Fragment>
            {
                 (isLoading && q) && (
                    <Loader />
                )
            }
            <Header title = {title} clientRootUrl = {clientRootUrl} />
            <br />
            <div className = "container">
                <div className = "row search">
                    <div className = "col-1">
                        <form onSubmit = {(e)=>{
                            e.preventDefault();
                            // const a = document.getElementById("searchButton");
                            // a.click();
                            linkRef.current.click();
                        }}>
                            <input 
                                ref = {inputRef} 
                                value = {searchInput} 
                                className = "search-input" 
                                placeholder = "Search for a product or category..." 
                                onChange = {changeHandler} 
                            />
                            <Link to = {`/search?q=${searchInput}`} ref = {linkRef} style = {{width:'100px',height:'35px', borderRadius:'0'}} id = "searchButton" className = "btn search-btn">Search</Link> 
                        </form>
                    </div>
                </div>
                {/* put categories there before the person searches for anything first */}

                {
                    (status)
                    ?
                    (
                            <div className = "row">

                            
                            {
                                (categoryResults.length > 0) && (
                                    <div className = "col-1">
                                        <div className = "small-container">
                                            <h2 className = "title">Categories</h2>
                                            <div className = "row" style = {{marginTop:'-15px'}}>
                                            {
                                                categoryResults.map(({id,name,image})=><Category key = {id} id = {id} name = {name} image = {image} apiRootUrl = {apiRootUrl}  />)
                                            }
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            {
                                (productResults.length > 0) && (
                                    <div className = "col-1">
                                        <Products apiRootUrl = {apiRootUrl} products = {productResults}>
                                            <h2 className = "title">Products</h2>
                                        </Products>
                                    </div>
                                )
                            }

                            {
                                (productResults.length < 1 && categoryResults < 1 && resultReadyStatus)
                                &&
                                (
                                    <React.Fragment>
                                        <div className = "col-1">
                                            <h1>No results available </h1>
                                        </div>
                                    </React.Fragment>
                                    
                                )
                            }
                            
                        </div>
                    )
                    :
                    (
                        <FeaturedCategories apiRootUrl = {apiRootUrl} />
                    )
                }
        
                
                    
            </div>
            <br />
        </React.Fragment>
    )
}

export default Search
