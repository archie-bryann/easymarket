import React, { Fragment, useState, useEffect } from 'react'
import './Users.css'
import Loader from '../../components/Loader/Loader'
import axios from 'axios';
import User from '../../components/User/User'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure();

function Users({apiRootUrl,token,requireAuth,errorMessage}) {

    const [loading,setLoading] = useState(false);
    const [users,setUsers] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios.get(`${apiRootUrl}user/`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(({data})=>{
            setLoading(false);
            setUsers(data);
        }).catch(err=>{ 
            setLoading(false);
            // console.log(err);
            toast.error(errorMessage, {
                position: toast.POSITION.BOTTOM_LEFT
            })
        })
    }, [apiRootUrl])

    return (
        <Fragment>
            {requireAuth()}
            {loading&&<Loader />}
            <main>
                <div className = "main__container">
                    {/* verified */}
                    <table>
                        <tr>
                            <th>Id</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th>Mobile Phone Number</th>
                            <th>City</th>
                            <th>Date Joined</th>
                            <th>Action</th>
                        </tr>
                        {
                            users.map(({id,firstname,lastname,email,mobile_phone_number,city,joined_timestamp})=><User key = {id} id = {id} firstname = {firstname} lastname = {lastname} email = {email} mobile_phone_number = {mobile_phone_number} city = {city} joined_timestamp={joined_timestamp} />)
                        }
                    </table>
                </div>
            </main>
        </Fragment>
    )
}

export default Users;