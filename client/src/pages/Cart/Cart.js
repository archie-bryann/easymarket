import React, { Fragment, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';
import Header from '../../components/Header/Header'
import './Cart.css'
import axios from 'axios'
import Loader from '../../components/Loader/Loader';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CartProduct from '../../components/CartProduct/CartProduct';
import { Link } from 'react-router-dom';

toast.configure();

function Cart({title, clientRootUrl, apiRootUrl, loggedInStatus, token, errorMessage}) {

    document.title = `Cart - ${title}`;

    const [isLoading, setIsLoading] = useState(true);
    const [cartProducts, setCartProducts] = useState([]);
    const [subTotal,setSubTotal] = useState(1);
    const [allowed, setAllowed] = useState(false);

    useEffect(()=>{
        axios.get(`${apiRootUrl}cart/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(({data})=>{
            let cartItems = data;
            // setCartProducts(data);
            console.log(cartItems)

            if(cartItems.length < 1) {
                setIsLoading(false);
            } else {
                cartItems.map(({id,productId,quantity})=>{
                    // cart: id, productId // product details
                    axios.get(`${apiRootUrl}product/${productId}`)
                    .then(({data})=>{
                        setIsLoading(false);
                        setAllowed(true); // show details            
                        let product = data;
                        // no storing the previous one being asynchronous, so we have to use the previous in the argument
                        setCartProducts(prevCartProducts => [ ... prevCartProducts, {
                            cartId:id,
                            quantity:quantity,
                            id:product.id,
                            categoryId: product.categoryId,
                            name: product.name,
                            description: product.description,
                            image: product.image,
                            price: product.price
                        }]);

                    })
                    .catch(err=>{
                        setIsLoading(false);
                        toast.error(errorMessage, {
                            position: toast.POSITION.TOP_RIGHT
                        })
                    })
                })
            }
        })

        .catch(err=>{
            setIsLoading(false);
            toast.error(errorMessage, {
                position: toast.POSITION.TOP_RIGHT
            })      
        })
    },[apiRootUrl])

    function delCartItem(cartId) {
        // delete from DB
        setIsLoading(true);
        axios.delete(`${apiRootUrl}cart/${cartId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(({data})=>{
            setIsLoading(false);
            if(data.error === 0) {
                toast.success(data.message, {
                    position: toast.POSITION.TOP_RIGHT
                })
                setCartProducts([...cartProducts.filter(cartProduct=>cartProduct.cartId !== cartId)]);
            } else {
                toast.error(errorMessage, {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
            if(cartProducts.length-1 < 1) {
                setAllowed(false);
            } else {
                // as products are being deleted , RECALCULATE VALUES
            }
        })
        .catch(err=>{
            setIsLoading(false);
            toast.error(errorMessage, {
                position: toast.POSITION.TOP_RIGHT
            })
        })

    }

    return (
        <React.Fragment>
            {
                isLoading && <Loader />
            }
            {
                (!loggedInStatus) && (
                    <Redirect to = "/account" />
                )
            }
            <Header title = {title} clientRootUrl = {clientRootUrl} loggedInStatus = {loggedInStatus} />

            <br />
            <br />
            
            <div className = "small-container cart-page">

                {
                    (cartProducts.length > 0) && (
                        <table>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                            </tr>

                            {
                                cartProducts.map(({cartId,quantity,id,categoryId,name,description,image,price})=><CartProduct key = {id} cartId = {cartId} quantity = {quantity} id = {id} categoryId = {categoryId} name = {name} description = {description} image = {image} price = {price} apiRootUrl = {apiRootUrl} token = {token} errorMessage = {errorMessage} delCartItem = {delCartItem} />)
                            }
                        </table>
                    )
                }

                {
                    (cartProducts.length < 1) && (
                        <Fragment>
                            <div className = "container center-div">
                                <img src  = {`${clientRootUrl}images/8-2-fearful-emoji-png.png`} width = "180px" alt = "" />
                                <h4>Ahh! Your cart seems empty.</h4>
                                <p>Click below to start shopping now.</p>
                                <Link to = "/categories" className = "btn">Start shopping</Link>
                            </div>
                            <div style = {{height:'180px'}}></div>
                        </Fragment>
                    )
                }

                { (allowed) && (
                    <React.Fragment>
                        <div className = "total-price">
                            <table>
                                <tr>
                                    <td>Subtotal</td> 
                                    <td>$200.00</td> 
                                </tr>
                                <tr>
                                    <td>Delivery</td> 
                                    <td>$35.00</td> 
                                </tr>
                                <tr>
                                    <td>Total</td> 
                                    <td>$235.00</td> 
                                </tr>
                            </table>
                        </div>
                        <div className = "order-div">
                            <button className = "btn">Place Order</button>
                        </div>
                    </React.Fragment>
                )}
                
                <br />
                <br />
                <br />
            </div>
        </React.Fragment>
        
    )
}

export default Cart
