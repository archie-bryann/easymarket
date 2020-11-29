import React, { Fragment, useEffect, useState } from 'react'
import Loader from '../../components/Loader/Loader'
import axios from 'axios';
import { toast } from 'react-toastify';
import Category from '../../components/Category/Category';

function Categories({apiRootUrl,token,requireAuth,errorMessage}) {

    const [loading,setLoading] = useState(false);
    const [categories,setCategories] = useState([]);

    useEffect(() => {
       setLoading(true);
       axios.get(`${apiRootUrl}category/`)
       .then(({data})=>{
           console.log(data);
           setLoading(false);
           setCategories(data);
       }).catch(err=>{
            setLoading(false);
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
                    <table>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            {/* <th>Image</th> */}
                            <th>Date Created</th>
                            <th>Action</th>
                        </tr>
                        {
                            categories.map(({id,name,image,timestamp})=><Category key = {id} id = {id} name = {name} image = {image} timestamp = {timestamp} />)
                        }
                    </table>
                </div>
            </main>
        </Fragment>
    )
}

export default Categories
