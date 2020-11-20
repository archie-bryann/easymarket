import React, {useState, useEffect} from 'react'
import Header from '../../components/Header/Header'
import './ProductDetails.css'
import { Link, Redirect } from 'react-router-dom' 
import axios from 'axios'
import Products from '../../components/Products/Products'
import Loader from '../../components/Loader/Loader'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


toast.configure();

function ProductDetails({title, apiRootUrl, clientRootUrl, match, loggedInStatus, token, errorMessage, cartNum,increaseCartNum}) {

    const { productId, categoryId } = match.params;

    // const [image, setImage] = useState('images/gallery-3.jpg');
    const [quantity, setQuantity] = useState(1);

    const [product, setProduct] = useState({});

    const [relatedProducts, setRelatedProducts] = useState([]);

    const [notFoundstatus, setNotFoundStatus] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

    const [redr, setRedr] = useState(false);

    document.title = `${product.name} - ${title}`;

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${apiRootUrl}product/${productId}`)
        .then(res=>{
            if(res.data.error) {
                setNotFoundStatus(true)
            } else {
                setProduct(res.data);
                setIsLoading(false);
            }
        })
        .catch(err=>console.log(err))
    }, [productId,categoryId]);

    useEffect(() => {
        axios.get(`${apiRootUrl}category/related/${categoryId}/${productId}`)
        .then(res=>{
            setRelatedProducts(res.data)
        })
        .catch(err=>console.log(err))
    }, [productId,categoryId]);

    function addToCart() {

        setIsLoading(true);
        axios.post(`${apiRootUrl}cart`, 
            {
                productId: product.id,
                quantity: quantity
            },
            {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(({data})=>{
            setIsLoading(false);
            if(data.error === 0) {
                    // increase cartNum by 1
                    increaseCartNum();

                toast.success(`${product.name} added to Cart`, {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            } else if(data.error === 455) {
                toast.success(data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            } else {
                console.log(data)
                toast.error(errorMessage, {
                    position: toast.POSITION.BOTTOM_RIGHT
                })
            }
        })
        .catch(err=>{
            console.log(err)
            setIsLoading(true);
            toast.error(errorMessage, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
    }

    // function changeImage(e) {
    //     setImage(e.target.src);


    
    // }


    function requireAuthForAction() {
        if(!localStorage.getItem('wpt')) {
            setRedr(true);
        } else {
             // verify token
            axios(`${apiRootUrl}user/verify`, {
                headers: {
                'Authorization':`Basic ${token}`
                }
            })
            .then(res=>{
                // console.log(res.data)
                if(res.data.valid === 1) {
                /** valid user -> save data */
                addToCart();
                } else {
                /** invalid user */
                setRedr(true);            
                }
            })
            .catch(err=>{
                /** invalid user */
                setRedr(true);
            })
            }
        }
      
    

    return (
        <React.Fragment>
            {
                redr && <Redirect to = "/account" />
            }
            {
                // check to redirect
                notFoundstatus && <Redirect to = "/404" />
            }
            {
                 isLoading && (
                    <Loader />
                )
            }
            <Header title = {title} clientRootUrl = {clientRootUrl} loggedInStatus = {loggedInStatus} cartNum = {cartNum} token = {token} />
            <div className = "small-container single-product">
                <div className = "row">
                    <div className = "col-2">
                        <img src = {`${apiRootUrl}uploads/${product.image}`} className = "img-style curve" alt = "" />
                            {/* <div className = "small-img-row">
                                <div className = "small-img-col">
                                    <img src = "images/gallery-1.jpg" className = "img-style small-img" alt = "" onClick = {changeImage} />
                                </div>
                                <div className = "small-img-col">
                                    <img src = "images/gallery-2.jpg" className = "img-style small-img" alt = "" onClick = {changeImage} />
                                </div>
                                <div className = "small-img-col">
                                    <img src = "images/gallery-4.jpg" className = "img-style small-img" alt = "" onClick = {changeImage} />
                                </div>
                                <div className = "small-img-col">
                                    <img src = "images/gallery-1.jpg" className = "img-style small-img" alt = "" onClick = {changeImage} />
                                </div>
                            </div> */}
                    </div>

                    <div className = "col-2">
                        {/* <p>Home / T-Shirt</p> */}
                        <h2>{product.name}</h2>
                        <h4>₦{product.price}</h4>
                        <select disabled>
                            <option>Select Size</option>
                            <option>XXL</option>
                            <option>XL</option>
                            <option>Large</option>
                            <option>Medium</option>
                            <option>Small</option>
                        </select>
                        <div style = {{marginTop:'-20px'}}></div>
                        <input type = "number" value = {quantity} onChange = {(e)=>setQuantity(e.target.value)} />
                        
                        {(product.out_of_stock === 0) ? 
                        (
                            <a onClick = {requireAuthForAction} className = "link btn">Add To Cart</a>                        
                        ) 
                        : (
                            <a className = "link btn" style = {{background:'#999'}}>Out of Stock</a>                        
                        
                        ) }

                        <h3>Product Details <i className = "fa fa-indent"></i></h3>
                        <p>{product.description}</p>
                    </div>
                </div>
            </div>
            {/* just 4 other related products */}
            {/* <FeaturedProducts>
                <div className = "row row-2">
                    <h2>Related Products</h2>
                    <Link to = "" className = "link">View All</Link> // to the category
                </div>
            </FeaturedProducts> */}
            
            {
                (relatedProducts.length > 0) 
                &&
                (
                    <Products apiRootUrl = {apiRootUrl} products = {relatedProducts}>
                        <div className = "row row-2">
                            <h2>Related Products</h2>
                            <Link to = {`/category/${categoryId}`} className = "link">View All</Link>
                        </div>
                    </Products>
                )
            }
            <br />
        </React.Fragment>
    )
}

export default ProductDetails