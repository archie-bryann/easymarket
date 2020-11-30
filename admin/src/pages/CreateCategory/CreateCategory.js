import React, { useState, Fragment } from 'react'
import Loader from '../../components/Loader/Loader'
import axios from 'axios'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Redirect } from 'react-router-dom'

toast.configure();

function CreateCategory({apiRootUrl,token,requireAuth,match,errorMessage}) {

    const [loading,setLoading] = useState(false);
    const [name,setName] = useState('');
    const [redr,setRedr] = useState(false);
    const [categoryId, setCategoryId] = useState(null);


    function changeName(e) {
        setName(e.target.value);
    }

    function createCategory(e) {
        e.preventDefault();
        const formData = new FormData();
        const imagefile = document.querySelector('#file');
        formData.append("name", name);
        formData.append("categoryImage",imagefile.files[0]);
        if(name.trim() === '' || !imagefile.files[0]) {
            toast.error('All fields are required', {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose:false
            })
        } else {
            setLoading(true);
            axios.post(`${apiRootUrl}category/`,formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }).then(({data})=>{
                setLoading(false);
                if(data.error === 0) {
                    setName('');
                    setCategoryId(data.categoryId);
                    setRedr(true);
                }
            }).catch(err=>{
                setLoading(false);
                toast.error(errorMessage, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose:false
                })
            })
        }
    }
    

    return (
        <Fragment>
            {requireAuth()}
            {loading&&<Loader/>}
            {redr && <Redirect to = {`/category/${categoryId}`} />}
            <main>
                <div className = "main__container">
                    <h2 style = {{marginBottom:'15px'}}>Create a Category</h2>
                    <form>
                        <div>
                            <label>Name</label>
                            <input type = "text" value = {name} onChange = {changeName} />
                        </div>
                        <div>
                            <label>Image</label>
                            <input type = "file" id = "file" />
                        </div>
                        <div style = {{marginTop:'14px'}}>
                            <button className = "btn block" onClick = {createCategory}>Create Category</button>
                        </div>

                        <div style = {{height:'14px'}}></div>
                    </form>
                </div>
            </main>
        </Fragment>
    )
}

export default CreateCategory
