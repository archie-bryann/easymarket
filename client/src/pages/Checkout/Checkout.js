import React, {useState,useEffect,Fragment} from 'react'
import './Checkout.css'
import { usePaystackPayment, PaystackButton, PaystackConsumer } from 'react-paystack';
import { Redirect } from 'react-router-dom';
import Header from '../../components/Header/Header'
import axios from 'axios'
import Loader from '../../components/Loader/Loader';
import {toast} from 'react-toastify'
import OrderDetails from '../../components/CartPricing/CartPricing';
import { Link } from 'react-router-dom';
import CartProduct from '../../components/CartProduct/CartProduct';

toast.configure();

function Checkout({title, clientRootUrl, apiRootUrl, loggedInStatus, token, errorMessage, paystackPublicTestKey, paystackPublicLiveKey, cartNum, setCartNumToZero, requireAuth}) {

    document.title = `Checkout - ${title}`;

    const userId = localStorage.getItem('userId');

    const [isLoading, setIsLoading] = useState(true);
    const [cartProducts, setCartProducts] = useState([]);
    const [allowed, setAllowed] = useState(false);
    const [subTotals, setSubTotals] = useState(0);
    const [delivery, setDelivery] = useState(0); // use request to get details
    const [total, setTotal] = useState(0);
    const [all,setAll] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [redr,setRedr] = useState(false);

    /** FormStates */
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobilePhoneNumber, setMobilePhoneNumber] = useState('');
    const [additionalPhoneNumber, setAdditionalPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [stateRegion, setStateRegion] = useState('Federal Capital Territory');
    const [city, setCity] = useState(''); 
    /** ./end of FormStates */


    /** fetch UserData  */
    useEffect(()=>{
        setIsLoading(true);
        axios.get(`${apiRootUrl}user/v/${userId}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(({data})=>{
            setIsLoading(false);
            setFirstName(data.firstname);
            setLastName(data.lastname);
            setMobilePhoneNumber(data.mobile_phone_number);
            setAdditionalPhoneNumber(data.additional_mobile_number);
            setAddress(data.address);
            setAdditionalInfo(data.additional_info);
            setStateRegion(data.state_region);
            setCity(data.city);
        })
        .catch(err=>{
            setIsLoading(false);
        })
    }, [apiRootUrl])
    /**  */

    /** PAYSTACK FUNCTIONALITIES */
    const config = {
    reference:''+Math.floor((Math.random() * 1000000000) + 1),
    email: localStorage.getItem('email'),
    amount: Math.round(total) * 100, /** amount * 100 */
    publicKey: paystackPublicTestKey,
    };

    const componentProps = {
        ...config,
        text: 'Place Order',
        onSuccess: (res) => {
            /** create order and it's items */
            // console.log(res) /** status,reference */
            // verify the transaction in backend
            setIsLoading(true);
            axios.get(`${apiRootUrl}miscellaneous/verify/transaction/${res.reference}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(({data})=>{
              /** Verify Transaction (1) */ /** Transfer money to Logistics (2) */
                if(data.error === 0) {
                    /** finally placeOrder (3) *//** remove loader (4) *//** redirect to the order (5) */
                    axios.post(`${apiRootUrl}order`, {
                        subtotal:subTotals,
                        delivery,
                        total
                    },{
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    .then(({data})=>{
                        setIsLoading(false);
                        if(data.error === 0) {
                            // setCartNumToZero();
                            // setOrderId(data.orderId)
                            // setRedr(true);
                            window.location=`/order/${data.orderId}`
                        } else {
                            toast.error(errorMessage, {
                                position: toast.POSITION.BOTTOM_RIGHT,
                                autoClose:false
                            })
                        }
                    })
                    .catch(err=>{
                        setIsLoading(false);
                        toast.error(errorMessage, {
                            position: toast.POSITION.BOTTOM_RIGHT,
                            autoClose:false
                        })
                    })
                } else {
                    setIsLoading(false);
                    toast.error(errorMessage, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose:false
                    })
                }
            })
            .catch(err=>{
                setIsLoading(false);
                toast.error(errorMessage, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose:false
                })
            })
        },
        onClose: () => {
            /**  */
        }
    };

    /** ./ END OF PAYSTACK FUNCTIONALITIES */
    
    useEffect(() => {
        setIsLoading(true);
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
            setIsLoading(false);
            setDelivery(data.cost);
        })
        .catch(err=>{
            setIsLoading(false);
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
    
    /** FUNCTIONS FOR FORMS */
    function changeFirstName(e) {
        setFirstName(e.target.value);
    }

    function changeLastName(e) {
        setLastName(e.target.value);
    }

    function changeMobilePhoneNumber(e) {
        setMobilePhoneNumber(e.target.value);
    }

    function changeAdditionalPhoneNumber(e) {
        setAdditionalPhoneNumber(e.target.value);
    }

    function changeAddress(e) {
        setAddress(e.target.value);
    }

    function changeAdditionalInfo(e) {
        setAdditionalInfo(e.target.value);
    }

    function changeCity(e) {
        setCity(e.target.value);
    }
    /** ../end of FUNCTIONS FOR FORMS */

    return (
        <React.Fragment>
        {requireAuth()}
        {redr && (<Redirect to = {`/order/${orderId}`} />)}
        {isLoading && <Loader />}
        <Header title = {title} clientRootUrl = {clientRootUrl} loggedInStatus = {loggedInStatus} cartNum = {cartNum} token = {token} />

        <br />
        <br />
        <div className = "container cart-page">

            {/* PUT IN A CONTAINER LEFT */}
            <div className = "row-2">
                <div className = "col-50">
                    {/* <div className = "container"> */}
                        <h3>Billing Details</h3>

                        <form>
                            <br />
                            <span className = "label">First Name*</span>
                            <input type = "text" placeholder = "First Name" value = {firstName} onChange = {changeFirstName} />
                            <div style = {{height:'10px'}}></div>
                            <span className = "label">Last Name*</span>
                            <input type = "text" placeholder = "Last Name" value = {lastName} onChange = {changeLastName} />
                            <br />
                            <div style = {{height:'10px'}}></div>
                            <span className = "label">Mobile Phone Number*</span>
                            <input type = "text" placeholder = "Mobile phone number" value = {mobilePhoneNumber} onChange = {changeMobilePhoneNumber} />
                            <br />
                            <div style = {{height:'10px'}}></div>
                            <span className = "label">Additional Phone Number*</span>
                            <input type = "text" placeholder = "Additional phone number" value = {additionalPhoneNumber} onChange = {changeAdditionalPhoneNumber} />
                            <br />
                            <div style = {{height:'10px'}}></div>

                            <span className = "label">Address*</span>
                            <textarea placeholder = "Street Name / Building / Apartment No. / Floor" value = {address} onChange = {changeAddress}></textarea>

                            <span className = "label">Additional Info</span>
                            <textarea name = "addition" placeholder = "Landmark / Directions / More Details" value = {additionalInfo} onChange = {changeAdditionalInfo}></textarea>


                            <span className = "label">State/Region*</span>
                            <input type = "text" placeholder = "Address" value = {stateRegion} disabled/>
                            
                            <br />
                            <div style = {{height:'10px'}}></div>
                            <span className = "label">City*</span>
                            <select name="city" className = "city" style = {{border:'1px solid #ccc'}} value = {city} onChange = {changeCity}>
                                <option value="">Please select...</option>
                                <option value="ABAJI">ABAJI</option>
                                <option value="ABUJA AIRPORT ROAD-ABUJA TECHNOLOGY VILLAGE">ABUJA AIRPORT ROAD-ABUJA TECHNOLOGY VILLAGE</option>
                                <option value="ABUJA AIRPORT ROAD-CHIKA">ABUJA AIRPORT ROAD-CHIKA</option>
                                <option value="ABUJA AIRPORT ROAD-GOSA / SABON LUGBE">ABUJA AIRPORT ROAD-GOSA / SABON LUGBE</option>
                                <option value="ABUJA AIRPORT ROAD-KUCHINGORO">ABUJA AIRPORT ROAD-KUCHINGORO</option>
                                <option value="ABUJA AIRPORT ROAD-KYAMI / CENTENARY CITY">ABUJA AIRPORT ROAD-KYAMI / CENTENARY CITY</option>
                                <option value="ABUJA AIRPORT ROAD-NNAMDI AZIKE AIRPORT">ABUJA AIRPORT ROAD-NNAMDI AZIKE AIRPORT</option>
                                <option value="ABUJA AIRPORT ROAD-PIWOYI">ABUJA AIRPORT ROAD-PIWOYI</option>
                                <option value="ABUJA AIRPORT ROAD-PYAKASA">ABUJA AIRPORT ROAD-PYAKASA</option>
                                <option value="ABUJA AIRPORT ROAD-RIVERPARK /TRADEMORE">ABUJA AIRPORT ROAD-RIVERPARK /TRADEMORE</option>
                                <option value="ABUJA AIRPORT ROAD-SAUKA/IMMIGRATION HQ">ABUJA AIRPORT ROAD-SAUKA/IMMIGRATION HQ</option>
                                <option value="ABUJA-APO CENTRAL">ABUJA-APO CENTRAL</option>
                                <option value="ABUJA-APO LEGISLATIVE ZONE A">ABUJA-APO LEGISLATIVE ZONE A</option>
                                <option value="ABUJA-APO LEGISLATIVE ZONE B">ABUJA-APO LEGISLATIVE ZONE B</option>
                                <option value="ABUJA-APO LEGISLATIVE ZONE C">ABUJA-APO LEGISLATIVE ZONE C</option>
                                <option value="ABUJA-APO LEGISLATIVE ZONE D">ABUJA-APO LEGISLATIVE ZONE D</option>
                                <option value="ABUJA-APO LEGISLATIVE ZONE E">ABUJA-APO LEGISLATIVE ZONE E</option>
                                <option value="ABUJA-APO MECHANIC VILLAGE">ABUJA-APO MECHANIC VILLAGE</option>
                                <option value="ABUJA-APO RESETTLEMENT ZONE A">ABUJA-APO RESETTLEMENT ZONE A</option>
                                <option value="ABUJA-APO RESETTLEMENT ZONE B">ABUJA-APO RESETTLEMENT ZONE B</option>
                                <option value="ABUJA-APO RESETTLEMENT ZONE C">ABUJA-APO RESETTLEMENT ZONE C</option>
                                <option value="ABUJA-APO RESETTLEMENT ZONE D">ABUJA-APO RESETTLEMENT ZONE D</option>
                                <option value="ABUJA-APO RESETTLEMENT ZONE E">ABUJA-APO RESETTLEMENT ZONE E</option>
                                <option value="ABUJA-DURUMI">ABUJA-DURUMI</option>
                                <option value="ABUJA-DURUMI PHASE 2">ABUJA-DURUMI PHASE 2</option>
                                <option value="ABUJA-GARKI AREA 1">ABUJA-GARKI AREA 1</option>
                                <option value="ABUJA-GARKI AREA 10">ABUJA-GARKI AREA 10</option>
                                <option value="ABUJA-GARKI AREA 11">ABUJA-GARKI AREA 11</option>
                                <option value="ABUJA-GARKI AREA 2">ABUJA- GARKI AREA 2</option>
                                <option value="ABUJA-GARKI AREA 3">ABUJA-GARKI AREA 3</option>
                                <option value="ABUJA-GARKI AREA 7">ABUJA-GARKI AREA 7</option>
                                <option value="ABUJA-GARKI AREA 8">ABUJA-GARKI AREA 8</option>
                                <option value="ABUJA-GWARINPA 1ST AVENUE">ABUJA-GWARINPA 1ST AVENUE</option>
                                <option value="ABUJA-GWARINPA 2ND AVENUE">ABUJA-GWARINPA 2ND AVENUE</option>
                                <option value="ABUJA-GWARINPA 3RD AVENUE">ABUJA-GWARINPA 3RD AVENUE</option>
                                <option value="ABUJA-GWARINPA 4TH AVENUE">ABUJA-GWARINPA 4TH AVENUE</option>
                                <option value="ABUJA-GWARINPA 5TH AVENUE">ABUJA-GWARINPA 5TH AVENUE</option>
                                <option value="ABUJA-GWARINPA 6TH AVENUE">ABUJA-GWARINPA 6TH AVENUE</option>
                                <option value="ABUJA-GWARINPA 7TH AVENUE">ABUJA-GWARINPA 7TH AVENUE</option>
                                <option value="ABUJA-GWARINPA EXTENSION">ABUJA-GWARINPA EXTENSION</option>
                                <option value="ABUJA-KATAMPE EXTENSION">ABUJA-KATAMPE EXTENSION</option>
                                <option value="ABUJA-KATAMPE MAIN">ABUJA-KATAMPE MAIN</option>
                                <option value="ABUJA-KUBWA 2/1 PHASE 1">ABUJA-KUBWA 2/1 PHASE 1</option>
                                <option value="ABUJA-KUBWA 2/2 PHASE 2">ABUJA-KUBWA 2/2 PHASE 2</option>
                                <option value="ABUJA-KUBWA ARAB ROAD">ABUJA-KUBWA ARAB ROAD</option>
                                <option value="ABUJA-KUBWA BYAZHIN">ABUJA-KUBWA BYAZHIN</option>
                                <option value="ABUJA-KUBWA EXTENSION 3">ABUJA-KUBWA EXTENSION 3</option>
                                <option value="ABUJA-KUBWA GBAZANGO">ABUJA-KUBWA GBAZANGO</option>
                                <option value="ABUJA-KUBWA PHASE 3">ABUJA-KUBWA PHASE 3</option>
                                <option value="ABUJA-KUBWA PW">ABUJA-KUBWA PW</option>
                                <option value="ABUJA-KUBWA- FCDA/FHA">ABUJA-KUBWA-FCDA/FHA</option>
                                <option value="ABUJA-LIFE CAMP EXTENSION">ABUJA-LIFE CAMP EXTENSION</option>
                                <option value="ABUJA-MABUSHI">ABUJA-MABUSHI</option>
                                <option value="ABUJA-MAITAMA ALEIRO">ABUJA-MAITAMA ALEIRO</option>
                                <option value="ABUJA-MAITAMA ASO DRIVE">ABUJA-MAITAMA ASO DRIVE</option>
                                <option value="ABUJA-MAITAMA CENTRAL">ABUJA-MAITAMA CENTRAL</option>
                                <option value="ABUJA-MAITAMA EXTENSION">ABUJA-MAITAMA EXTENSION</option>
                                <option value="ABUJA-ASOKORO">ABUJA-ASOKORO</option>
                                <option value="ABUJA-BWARI">ABUJA-BWARI</option>
                                <option value="Abuja-Central">Abuja-Central</option>
                                <option value="Abuja-Dakibiyu">Abuja-Dakibiyu</option>
                                <option value="ABUJA-DAWAKI">ABUJA-DAWAKI</option>
                                <option value="ABUJA-DEI-DEI">ABUJA-DEI-DEI</option>
                                <option value="ABUJA-DUTSE">ABUJA-DUTSE</option>
                                <option value="ABUJA-EFAB">ABUJA-EFAB</option>
                                <option value="ABUJA-GALADIMAWA">ABUJA-GALADIMAWA</option>
                                <option value="ABUJA-GAMES VILLAGE">ABUJA-GAMES VILLAGE</option>
                                <option value="ABUJA-GARKI2">ABUJA-GARKI2</option>
                                <option value="ABUJA-GUDU">ABUJA-GUDU</option>
                                <option value="ABUJA-GUZAPE">ABUJA-GUZAPE</option>
                                <option value="ABUJA-GWAGWALADA">ABUJA-GWAGWALADA</option>
                                <option value="ABUJA-JABI">ABUJA-JABI</option>
                                <option value="ABUJA-JAHI">ABUJA-JAHI</option>
                                <option value="ABUJA-KABUSA">ABUJA-KABUSA</option>
                                <option value="ABUJA-KADO">ABUJA-KADO</option>
                                <option value="ABUJA-KARU">ABUJA-KARU</option>
                                <option value="ABUJA-KAURA DISTRICT">ABUJA-KAURA DISTRICT</option>
                                <option value="ABUJA-KUJE">ABUJA-KUJE</option>
                                <option value="ABUJA-LIFE CAMP">ABUJA-LIFE CAMP</option>
                                <option value="ABUJA-LOKOGOMA">ABUJA-LOKOGOMA</option>
                                <option value="Abuja-Lugbe Across Zone1-9">Abuja-Lugbe Across Zone1-9</option>
                                <option value="Abuja-Lugbe Kapwa">Abuja-Lugbe Kapwa</option>
                                <option value="Abuja-Lugbe MrBiggs">Abuja-Lugbe MrBiggs</option>
                                <option value="Abuja-Lugbe New Site">Abuja-Lugbe New Site</option>
                                <option value="Abuja-Lugbe Peace Village">Abuja-Lugbe Peace Village</option>
                                <option value="Abuja-Lugbe Police Sign Post">Abuja-Lugbe Police Sign Post</option>
                                <option value="Abuja-Lugbe Premier Academy">Abuja-Lugbe Premier Academy</option>
                                <option value="Abuja-Lugbe Sector F">Abuja-Lugbe Sector F</option>
                                <option value="Abuja-Lugbe Skye Bank">Abuja-Lugbe Skye Bank</option>
                                <option value="Abuja-Lugbe Total">Abuja-Lugbe Total</option>
                                <option value="Abuja-Lugbe Tudun Wada">Abuja-Lugbe Tudun Wada</option>
                                <option value="ABUJA-MARARABA">ABUJA-MARARABA</option>
                                <option value="ABUJA-NYANYA">ABUJA-NYANYA</option>
                                <option value="Abuja-Prince and Princess">Abuja-Prince and Princess</option>
                                <option value="ABUJA-SUNCITY">ABUJA-SUNCITY</option>
                                <option value="ABUJA-SUNNY VALLE">ABUJA-SUNNY VALLE</option>
                                <option value="ABUJA-UTAKO">ABUJA-UTAKO</option>
                                <option value="ABUJA-WUSE ZONE 1">ABUJA-WUSE ZONE 1</option>
                                <option value="ABUJA-WUSE ZONE 2">ABUJA-WUSE ZONE 2</option>
                                <option value="ABUJA-WUSE ZONE 3">ABUJA-WUSE ZONE 3</option>
                                <option value="ABUJA-WUSE ZONE 4">ABUJA-WUSE ZONE 4</option>
                                <option value="ABUJA-WUSE ZONE 5">ABUJA-WUSE ZONE 5</option>
                                <option value="ABUJA-WUSE ZONE 6">ABUJA-WUSE ZONE 6</option>
                                <option value="ABUJA-WUSE ZONE 7">ABUJA-WUSE ZONE 7</option>
                                <option value="ABUJA-WUSE11">ABUJA-WUSE11</option>
                                <option value="Abuja-Wuye">Abuja-Wuye</option>
                                <option value="Airport Road Iddo">Airport Road Iddo</option>
                                <option value="Airport Road Kuchingoro / Chika / Pyakasa">Airport Road Kuchingoro / Chika / Pyakasa</option>
                                <option value="Airport Road Sauka /Trademore / Airport">Airport Road Sauka /Trademore / Airport</option>
                                <option value="Dutse">Dutse</option>
                                <option value="GIDAN MANGORO">GIDAN MANGORO</option>
                                <option value="GWAGWALADA">GWAGWALADA</option>
                                <option value="IDU">IDU</option>
                                <option value="Jikowyi">Jikowyi</option>
                                <option value="Karimo">Karimo</option>
                                <option value="KARU">KARU</option>
                                <option value="Kubwa Central">Kubwa Central</option>
                                <option value="KWALI">KWALI</option>
                                <option value="Lugbe">Lugbe</option>
                                <option value="MINISTERS HILL">MINISTERS HILL</option>
                                <option value="Mpape">Mpape</option>
                                <option value="NICON JUNCTION">NICON JUNCTION</option>
                                <option value="Tungan Maje">Tungan Maje</option>
                                <option value="Zuba">Zuba</option>
                            </select>

                            <br />
                            <span className="note">*Required</span>
                            {/** 
                             * state/region refers to Abuja
                             * 
                             */}
                        </form>
                    {/* </div> */}
                   
                </div>
  
                {/* PUT IN A CONTAINER RIGHT */}
                <div className = "col-25">
                        <h3>Your Order ({cartProducts.length} item{(cartProducts.length > 1) ? 's' : ''})</h3>
                    <div style = {{height:'15px'}}></div>
                    {/* <div className = "total-price"> */}
                    {
                        (cartProducts.length > 0) && (
                            <table>
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Subtotal</th>
                                </tr>

                                {
                                    cartProducts.map(({cartId,quantity,id,categoryId,name,description,image,price})=><CartProduct key = {id} cartId = {cartId} quantity = {quantity} id = {id} categoryId = {categoryId} name = {name} description = {description} image = {image} price = {price} apiRootUrl = {apiRootUrl} token = {token} errorMessage = {errorMessage} delCartItem = {delCartItem} addSubTotals = {addSubTotals} calculateNewSubTotalAndTotal = {calculateNewSubTotalAndTotal} less = {true} />)
                                }
                            </table>
                        )
                    }
                    { (allowed) && (
                // <OrderDetails subTotals = {subTotals} delivery = {delivery} total = {total} >
                //     <button  className = "btn">Place Order</button>
                // </OrderDetails>
                    <OrderDetails subTotals = {subTotals} delivery = {delivery} total = {total} less = {true} >
                        <PaystackConsumer {...componentProps}>
                        {({initializePayment}) => <button className = "btn place-order-btn" onClick={()=>{

                            /** form validation */
                            if(firstName.trim() === '' || lastName.trim() === '' || mobilePhoneNumber.trim() === '' || additionalPhoneNumber.trim() === '' || address.trim() === '' || city.trim() === '') {
                                // toast error
                                toast.error('All fields labelled with * are required',{
                                    position:toast.POSITION.BOTTOM_RIGHT,
                                    autoClose:false
                                })
                            } else {
                                setIsLoading(true);
                                // save the data
                                axios.patch(`${apiRootUrl}user/v/${userId}`, {
                                    firstname:firstName,
                                    lastname:lastName,
                                    mobile_phone_number:mobilePhoneNumber,
                                    additional_mobile_number: additionalPhoneNumber,
                                    address,
                                    additional_info:additionalInfo,
                                    state_region:stateRegion,
                                    city
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                })
                                .then(({data})=>{
                                    setIsLoading(false);
                                    if(data.error === 0) {
                                        /** initialize payment */
                                        initializePayment();
                                    } else {
                                        toast.error(errorMessage,{
                                            position:toast.POSITION.BOTTOM_RIGHT,
                                            autoClose:false
                                        })
                                    }
                                })
                                .catch(err=>{
                                    console.log(err)
                                    setIsLoading(false);
                                    toast.error(errorMessage,{
                                        position:toast.POSITION.BOTTOM_RIGHT,
                                        autoClose:false
                                    })
                                })
                            }
                            /** ./end of form validation */

                        }}>Place Order</button>}
                    </PaystackConsumer>
                </OrderDetails>
            )}
                </div>


            </div>


            {
                // (cartProducts.length < 1) && (
                //     // <Redirect to = "/cart" />
                // )
            }   
            
            <br />
            <br />

            <br />
        </div>
            {/* <PaystackButton {...componentProps} />
            <PaystackConsumer {...componentProps}>
                {({initializePayment}) => <button className = "btn place-order-btn" onClick={() => initializePayment()}>Paystack Consumer Implementation</button>}
            </PaystackConsumer> */}
        
    </React.Fragment>
    )
}

export default Checkout


