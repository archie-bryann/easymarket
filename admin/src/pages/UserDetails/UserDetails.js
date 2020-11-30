import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../../components/Loader/Loader';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Redirect } from 'react-router-dom';
import Order from '../../components/Order/Order';

toast.configure();

function UserDetails({apiRootUrl,token,requireAuth,match,errorMessage}) {

    const { userId } = match.params;
    const [loading,setLoading] = useState(false);
    const [id, setId] = useState(null);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [mobilePhoneNumber, setMobilePhoneNumber] = useState('');
    const [additionalPhoneNumber, setAdditionalPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [city, setCity] = useState('');
    const [stateRegion, setStateRegion] = useState('');
    const [country, setCountry] = useState('');
    const [redr,setRedr] = useState(false);
    const [orders,setOrders] = useState([]);

    useEffect(()=>{
        setLoading(true);
        axios.get(`${apiRootUrl}user/v/${userId}`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then(({data})=>{
            // setLoading(false);
            if(data) {
                setId(data.id);
                setFirstname(data.firstname);
                setLastname(data.lastname);
                setEmail(data.email);
                setMobilePhoneNumber(data.mobile_phone_number);
                setAdditionalInfo(data.additional_info);
                setAddress(data.address);
                setAdditionalInfo(data.additional_info);
                setCity(data.city);
                setStateRegion(data.state_region);
                setCountry(data.country);
                
                /** GET USER ORDERS */

                axios.get(`${apiRootUrl}order/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(({data})=>{
                    console.log(data)
                    setLoading(false)  
                    setOrders(data);
                }).catch(err=>{
                    setLoading(false)
                    toast.error(errorMessage, {
                        position: toast.POSITION.BOTTOM_RIGHT
                    }) 
                })


            } else {
                setRedr(true);
            }
        }).catch(err=>{
            setLoading(false);
            toast.error(errorMessage, {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose:false
            })
        })
    }, [])


    function changeFirstname(e) {
        setFirstname(e.target.value);
    }

    function changeLastname(e) {
        setLastname(e.target.value);
    }
    
    function changeEmail(e) {
        setEmail(e.target.value);
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

    function changeState(e) {
        setStateRegion(e.target.value);
    }

    function changeCountry(e) {
        setCountry(e.target.value);
    }

    function updateUser(e) {
        e.preventDefault();
        setLoading(true);
        axios.patch(`${apiRootUrl}user/v/${id}`, {
            firstname,
            lastname,
            mobile_phone_number:mobilePhoneNumber,
            additional_mobile_number: additionalPhoneNumber,
            address,
            additional_info:additionalInfo,
            state_region:stateRegion,
            city
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(({data})=>{
            setLoading(false);
            if(data.error === 0) {
                toast.success("User details updated successfully!", {
                    position: toast.POSITION.BOTTOM_LEFT
                })
            } 
        }).catch(err=>{
            setLoading(false);
            toast.error(errorMessage, {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose:false
            })
        })
    }    

    /** Admin can update user details - BE CAREFUL */
    return (
        <Fragment>
            {requireAuth()}
            {loading&&<Loader/>}
            {redr&&<Redirect to = "/404"/>}
            <main>
                <div className = "main__container">
                    <h2 style = {{marginBottom:'25px'}}>User Details</h2>
                    <form>
                        <div>
                            <label>Firstname</label>
                            <input type = "text" onChange = {changeFirstname} value = {firstname} /> 
                        </div>

                        <div>
                            <label>Lastname</label>
                            <input type = "text" onChange = {changeLastname} value = {lastname} />
                        </div>

                        <div>
                            <label>Email</label>
                            <input type = "text" onChange = {changeEmail} value = {email} />
                        </div>

                        <div>
                            <label>Mobile Phone Number</label>
                            <input type = "text" onChange = {changeMobilePhoneNumber} value = {mobilePhoneNumber} />
                        </div>

                        <div>
                            <label>Additional Phone Number</label>
                            <input type = "text" onChange = {changeAdditionalPhoneNumber} value = {additionalPhoneNumber} />
                        </div>

                        <div>
                            <label>Address</label>
                            <input type = "text" onChange = {changeAddress} value = {address} />
                        </div>

                        <div>
                            <label>Additional Info</label>
                            <input type = "text" onChange = {changeAdditionalInfo} value = {additionalInfo}/>
                        </div>  

                        <div>
                            <label>City</label>
                            <input type = "text" onChange = {changeCity} value = {city} />
                        </div>

                        <div>
                            <label>State</label>
                            <input type = "text" onChange = {changeState} value = {stateRegion} />    
                        </div>

                        <div>
                            <label>Country</label>
                            <input type = "text" onChange = {changeCountry} value = {country} />
                        </div>

                        <div style = {{marginTop:'14px'}}>
                            <button className = "btn block" onClick = {updateUser}>Update User</button>
                        </div>

                        <div style = {{height:'45px'}}></div>


                        <h2 style = {{marginBottom:'25px'}}>Orders</h2>
                        <table>
                            <tr>
                                <th>Order</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Total</th>
                            </tr>
                            {orders.map(({id,userId,status,total,timestamp})=>
                            <Order key = {id} id = {id} userId = {userId} status = {status} total = {total} timestamp = {timestamp} />)}
                        </table>
                    </form>
                </div>
            </main>
        </Fragment>
    )
}

export default UserDetails
