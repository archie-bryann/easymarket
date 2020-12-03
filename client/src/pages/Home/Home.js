import React, {useState, useEffect, useRef} from 'react'
import { Link, Redirect} from 'react-router-dom'
import './Home.css'
import FeaturedCategories from '../../components/FeaturedCategories/FeaturedCategories'
import Products from '../../components/Products/Products'
import Header from '../../components/Header/Header'
import axios from 'axios'
import Offer from '../../components/Offer/Offer'
import Testimonials from '../../components/Testimonials/Testimonial'
import Brands from '../../components/Brands/Brands'
import Loader from '../../components/Loader/Loader'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure();

function Home({title,apiRootUrl, clientRootUrl, loggedInStatus, match, cartNum,token,errorMessage}) {


    const linkRef = useRef(null);

    document.title = title;

    const [products, setProducts] = useState([]);
    const [q, setQ] = useState('');

    const [isLoading, setIsLoading] = useState(true);

    const [redr, setRedr] = useState(false);

    useEffect(() => {
        axios.get(`${apiRootUrl}product/starred/8`)
        .then(res=>{
            setProducts(res.data);
            setIsLoading(false);
        })
        .catch(err=>{
            toast.error(errorMessage, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
    }, [apiRootUrl])

    function changeHandler(e) {
        setQ(e.target.value);
    }

    return (
        <React.Fragment>
            {
                redr && <Redirect to = "/search" />
            }
            {
                 isLoading && (
                    <Loader />
                )
            }
            <Header title={title} clientRootUrl = {clientRootUrl} loggedInStatus = {loggedInStatus} match = {match} cartNum = {cartNum} token = {token} >
                <div className = "row"> 
                    <div className = "col-2">
                        <h1>Give Your Workout <br/>A New Style!</h1>
                        <p>Success isn't always about greatness. It's about consistency. Consistent<br/>hard work gains success. Greatness will come.</p>
                        <form onSubmit = {(e)=>{
                            e.preventDefault();
                            // const a = document.getElementById("searchButton");
                            // a.click();
                            linkRef.current.click();
                        }}>
                        <input 
                            style = {{width:'300px',borderRadius:'15px',height:'35px'}} 
                            placeholder = "Search for a product or category..." 
                            value = {q} 
                            onChange = {changeHandler}
                            onClick = {()=>setRedr(true)}
                        />
                        </form>
                        <div style = {{marginTop:'-30px'}}></div>
                        <Link id = "searchButton" to = {`/search?q=${q}`} ref = {linkRef} className="btn">Search</Link>
                    </div>
                    <div className = "col-2">
                        <img src = "images/cover.png" style={{width:'200px',height:'600px'}} alt = "" />
                    </div>
                </div>
            </Header>
            <FeaturedCategories apiRootUrl = {apiRootUrl} />
            <Products products = {products} apiRootUrl = {apiRootUrl}>
                <h2 className = "title">Featured Products</h2>
            </Products>
            {/* <Offer /> */}
            <div style = {{marginTop:'-30px'}}></div>
            <Testimonials />
            <br />
            <Brands />
        </React.Fragment>
    )
}

export default Home;