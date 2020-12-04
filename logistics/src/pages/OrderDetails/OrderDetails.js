import React, { Fragment, useEffect, useState, useRef } from 'react'
import Loader from '../../components/Loader/Loader';
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Link,Redirect} from 'react-router-dom';
import OrderProduct from '../../components/OrderProduct/OrderProduct';
import ReactToPrint from 'react-to-print';
toast.configure();

function OrderDetails({apiRootUrl,clientRootUrl,token,requireAuth,match,errorMessage,title,homeUrl}) {

    const componentRef = useRef();

    const {orderId} = match.params;
    const [loading,setLoading] = useState(false);
    const [status, setStatus] = useState('');
    const [subtotal, setSubtotal] = useState(0);
    const [logisticFee, setLogisticFee] = useState(0);
    const [delivery, setDelivery] = useState(0);
    const [total, setTotal] = useState(0);
    const [orderProducts, setOrderProducts] = useState([]);
    const [redr,setRedr] = useState(false);
    
    const [firstname,setFirstname] = useState(null);
    const [lastname,setLastname] = useState(null);
    const [address,setAddress] = useState(null);
    const [additionalInfo,setAdditionalInfo] = useState(null);
    const [city,setCity] = useState(null);
    const [stateRegion,setStateRegion] = useState(null);
    const [country,setCountry] = useState(null);
    const [mobilePhoneNumber,setMobilePhoneNumber] = useState(null);
    const [additionalMobileNumber,setAdditionalMobileNumber] = useState(null);

    useEffect(()=>{
        setLoading(true);
        axios.get(`${apiRootUrl}order/d/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(({data})=>{
            setStatus(data.status);
            setSubtotal(data.subtotal);
            setLogisticFee(data.logisticFee);
            setDelivery(data.delivery);
            setTotal(data.total);
            setOrderProducts(data.orderedProducts);


            /** fetch userData */
            axios.get(`${apiRootUrl}user/v/${data.userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(({data})=>{
                setLoading(false);
                // console.log(data)

                setFirstname(data.firstname);
                setLastname(data.lastname);
                setAddress(data.address);
                setAdditionalInfo(data.additional_info);
                setCity(data.city);
                setCountry(data.country);
                setMobilePhoneNumber(data.mobile_phone_number);
                setAdditionalInfo(data.additional_mobile_number);
            }).catch(err=>{
                setLoading(false);
                // redirect to /404
                setRedr(true);
            })

        }).catch(err=>{
            setLoading(false);
            // redirect to /404
            setRedr(true);
        })
    }, [apiRootUrl])

    return (
        <Fragment>
            {requireAuth()}
            {loading&&<Loader/>}
            {redr&&<Redirect to = "/404" />}
            <main>
                <div className = "main__container" ref={componentRef}>
                    <img src = {`${clientRootUrl}assets/images/foodnet-black.png`} style = {{width:'200px', float:'right'}} alt = "" />
                    <div style = {{height:'15px'}}></div>
                    <div className = "row row-2" style = {{marginTop:'-5px',fontSize:'13px'}}>
                        <h3 style = {{marginBottom:'10px'}}>SALES INVOICE</h3> 
                        <h4 style = {{marginBottom:'10px'}}>CUSTOMER DETAILS</h4>
                        <p>{firstname} {lastname}</p>
                        <p>{address}</p>
                        <p>{additionalInfo}</p>
                        <p>{city}</p>
                        <p>{stateRegion}</p>
                        <p>{country}</p>
                        <p><b>Tel:</b> {mobilePhoneNumber}{additionalMobileNumber && `, ${additionalMobileNumber}`}</p>

                        <h4 style = {{marginTop:'15px',marginBottom:'4px'}}>ORDER SUMMARY</h4>

                        <div className = "_total-price">
                            <table>
                                <tr>
                                    <td><b><h5>Order Number</h5></b></td>
                                    <td>{orderId}</td>
                                </tr>
                                <tr>
                                    <td><b><h5>Payable Number</h5></b></td>
                                    <td><b>₦ {Number(total).toLocaleString(undefined, {maximumFractionDigits:2})}</b></td>
                                </tr>
                            </table>
                        </div>
                        <div style = {{height:'15px'}}></div>
                        {/* <h2 style = {{marginBottom:'10px'}}>Order {orderId}</h2>  */}
                        {/* <i>{sentenceCase(status)}</i> | <Link to = {`/update/order/${orderId}`} className = "_btn">Update Status</Link> */}
                    </div>
                    
                    <div style = {{paddingLeft:'30px',fontSize:'12px'}}>
                        <h4>Dear {firstname} {lastname},</h4>
                        <br />
                        <p>Thank you for shopping with us. Nigeria's #1 online market. We are delighted to have you as a customer.</p>
                        <br />
                        <p>{title} is a marketplace, and items in your order are fulfilled by different sellers.</p>
                        <br />
                        <p> To get in touch in case of any issues, visit {homeUrl}contact</p>
                        <br />
                        <p><b>Please check the product for any issues before finally collecting the products.</b></p>
                        <br />
                        <p>Thank you again for shopping with us.</p>
                        <br />
                        <p>Yours Sincerely,</p>
                        <br />
                        <p>{title} Team</p>
                    </div>

                    <h4 style = {{marginTop:'20px',marginBottom:'4px'}}>ORDER DETAILS</h4>
                    

                    <div style = {{height:'15px'}}></div>
                    <table style={{fontSize:'12px'}}>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                        {
                            orderProducts && (
                                orderProducts.map(({id,productId,price,quantity,orderId})=><OrderProduct key = {id} productId = {productId} price = {price} quantity = {quantity} orderId = {orderId} apiRootUrl = {apiRootUrl} clientRootUrl = {clientRootUrl} errorMessage = {errorMessage} />)
                            )
                        }
                    </table>
                    <div className = "total-price">
                        <table style={{fontSize:'12px'}}>
                            <tr>
                                <td><b>Subtotal</b></td> 
                                <td>₦{Number(subtotal).toLocaleString(undefined, {maximumFractionDigits:2})}</td> 
                            </tr>
                            <tr>
                                <td><b>Delivery</b></td> 
                                <td>₦{Number(delivery).toLocaleString(undefined, {maximumFractionDigits:2})}</td> 
                            </tr>
                            <tr>
                                <td><b>Total</b></td> 
                                <td>₦{Number(total).toLocaleString(undefined, {maximumFractionDigits:2})}</td> 
                            </tr>
                        </table>
                    </div>

                </div>

                <div className = "main__container">
                    <p style = {{fontSize:'13px'}}><i>You can print two copies, one for the delivery agent and the other for the customer to ensure that the paper is neat when the customer collects it.</i></p>
                    <div style = {{height:'5px'}}></div>
                    <ReactToPrint 
                        trigger = {()=><button className = "btn block">Print</button>}
                        content = {() => componentRef.current}
                    />
                    
                    <div style = {{height:'15px'}}></div>

                    <Link to = {`/update/order/${orderId}`}>
                        <button className = "btn block red">Update Order Status</button>                    
                    </Link>

                </div>
            </main>
        </Fragment>
    )
}

export default OrderDetails;
