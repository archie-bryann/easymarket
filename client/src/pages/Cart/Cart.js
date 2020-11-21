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
import OrderDetails from '../../components/CartPricing/CartPricing';
import Empty from '../../components/Empty/Empty';

toast.configure();
    
function Cart({title, clientRootUrl, apiRootUrl, loggedInStatus, token, errorMessage, cartNum,decreaseCartNum, requireAuth}) {

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

    
    /** Pass the ffg data to App.js
     * cart
     * subtotal
     * delivery
     * total
     */

    useEffect(() => {
        // setIsLoading(true);
        axios.post(`${apiRootUrl}miscellaneous/fee`, 
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
                position: toast.POSITION.BOTTOM_RIGHT
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
            // console.log(cartItems)

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
                            position: toast.POSITION.BOTTOM_RIGHT
                        })
                    })
                })
            }
        })

        .catch(err=>{
            setIsLoading(false);
            toast.error(errorMessage, {
                position: toast.POSITION.BOTTOM_RIGHT
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
                    position: toast.POSITION.BOTTOM_RIGHT
                })
                setCartProducts([...cartProducts.filter(cartProduct=>cartProduct.cartId !== cartId)]);

                // reduce cartNum by 1
                decreaseCartNum();
            } else {
                toast.error(errorMessage, {
                    position: toast.POSITION.BOTTOM_RIGHT
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
                position: toast.POSITION.BOTTOM_RIGHT
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

    // function payWithPaystack(e) {
    //     e.preventDefault();
    //     let handler = PaystackPop.setup({
    //       key: 'sk_test_f12711e9277e1a27aba8e58f3394b9717098efaf', // Replace with your public key
    //       email: "ekomboy012@gmail.com",
    //       amount: 1200 * 100,
    //       ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    //       // label: "Optional string that replaces customer email"
    //       onClose: function(){
    //         alert('Window closed.');
    //       },
    //       callback: function(response){
    //         let message = 'Payment complete! Reference: ' + response.reference;
    //         alert(message);
    //       }
    //     });
    //     handler.openIframe();
    //   }


    return (
        <React.Fragment>
             {requireAuth()}
            {isLoading && <Loader />}
           
            <Header title = {title} clientRootUrl = {clientRootUrl} loggedInStatus = {loggedInStatus} cartNum = {cartNum} token = {token} />

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
                                cartProducts.map(({cartId,quantity,id,categoryId,name,description,image,price,out_of_stock})=><CartProduct key = {id} cartId = {cartId} quantity = {quantity} id = {id} categoryId = {categoryId} name = {name} description = {description} image = {image} price = {price} out_of_stock = {out_of_stock} apiRootUrl = {apiRootUrl} token = {token} errorMessage = {errorMessage} delCartItem = {delCartItem} addSubTotals = {addSubTotals} calculateNewSubTotalAndTotal = {calculateNewSubTotalAndTotal} />)
                            }
                        </table>
                    )
                }

                {
                    (cartProducts.length < 1) && (
                        <Fragment>
                            <Empty clientRootUrl = {clientRootUrl}>Ahh! Your cart seems empty.</Empty>
                        </Fragment>
                    )
                }
        
                { (allowed) && (
                    <OrderDetails subTotals = {subTotals} delivery = {delivery} total = {total} >
                        <Link to = {`/checkout`} className = "btn">Proceed to Checkout</Link>
                    </OrderDetails>
                )}
                
                <br />
                <br />
                <br />
            </div>
        </React.Fragment>
    )
}

export default Cart
