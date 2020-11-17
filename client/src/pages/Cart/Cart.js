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

    /** 
     * To 2 d.p.
     * Text: parseFloat("123.456").toFixed(2)
     * Number: num.toFixed(2);
     */

    const [isLoading, setIsLoading] = useState(true);
    const [cartProducts, setCartProducts] = useState([]);
    const [allowed, setAllowed] = useState(false);
    const [subTotals, setSubTotals] = useState(0);
    const [delivery, setDelivery] = useState(0); // use request to get details
    const [total, setTotal] = useState(0);
    const [all,setAll] = useState(false);

    useEffect(() => {
        // setIsLoading(true);
        axios.post(`${apiRootUrl}fee`, 
        {
            subtotal: subTotals
        },
        {
        headers: {
            Authorization: `Bearer ${token}`
        }
        })
        .then(({data})=>{
            // setIsLoading(false);
            setDelivery(data.cost);
        })
        .catch(err=>{
            // setIsLoading(false);
            // console.log(err)
            toast.error(errorMessage, {
                position: toast.POSITION.TOP_RIGHT
            })
        })

    }, [total])

    useEffect(() => {
        setTotal(subTotals + delivery);
    }, [delivery])

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

                // total prices will change authomatically
            }
        })
        .catch(err=>{
            setIsLoading(false);
            toast.error(errorMessage, {
                position: toast.POSITION.TOP_RIGHT
            })
        })

    }

    function addSubTotals(subTotal) {
        // setSubTotals(prevSubTotals=>prevSubTotals+subTotal);
    }


    useEffect(() => {
        /** Get The Delivery Cost of The Products @ The Good Time */

        setTotal(subTotals+delivery);


    }, [subTotals])

    useEffect(() => {
        let sum = 0;
        cartProducts.map((p)=>{
            let subtotal = Number(p.price) * Number(p.quantity);
            sum+=subtotal;
        })
        setSubTotals(sum);   

        

    }, [cartProducts])

    function calculateNewSubTotalAndTotal(newQuantity, cartId) {

        // update quantity and update of the specific cartId
        const elementsIndex = cartProducts.findIndex(item=>item.cartId === cartId)  
        let newCartProducts = [...cartProducts];
        newCartProducts[elementsIndex] = {...newCartProducts[elementsIndex], quantity:newQuantity}
        setCartProducts(newCartProducts);
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
                                cartProducts.map(({cartId,quantity,id,categoryId,name,description,image,price})=><CartProduct key = {id} cartId = {cartId} quantity = {quantity} id = {id} categoryId = {categoryId} name = {name} description = {description} image = {image} price = {price} apiRootUrl = {apiRootUrl} token = {token} errorMessage = {errorMessage} delCartItem = {delCartItem} addSubTotals = {addSubTotals} calculateNewSubTotalAndTotal = {calculateNewSubTotalAndTotal} />)
                            }
                        </table>
                    )
                }
                {/* {JSON.stringify(cartProducts)} */}
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
                                    <td><b>Subtotal</b></td> 
                                    <td>₦{subTotals.toLocaleString(undefined, {maximumFractionDigits:2})}</td> {/** to 2 d.p. of total */}
                                </tr>
                                <tr>
                                    <td><b>Delivery</b></td> 
                                    <td>₦{delivery.toLocaleString(undefined, {maximumFractionDigits:2})}</td> 
                                </tr>
                                <tr>
                                    <td><b>Total</b></td> 
                                    <td>₦{total.toLocaleString(undefined, {maximumFractionDigits:2})}</td> 
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
