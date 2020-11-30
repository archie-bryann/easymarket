import React, { Fragment,useEffect,useState } from 'react'
import axios from 'axios'
import Loader from '../../components/Loader/Loader'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Redirect } from 'react-router-dom'
import queryString from 'query-string'

toast.configure();

function AddProduct({apiRootUrl,token,requireAuth,errorMessage,location}) {

    const { _category } = queryString.parse(location.search);
    const _categoryId = _category===undefined ? null : Number(_category);
    const [loading,setLoading] = useState(false);
    const [name,setName] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState('');
    const [category,setCategory] = useState(_categoryId);
    const [cat,setCat] = useState([]);
    const [productId,setProductId] = useState(null);
    const [redr,setRedr] = useState(false);

    useEffect(()=>{
        setLoading(true);
        axios.get(`${apiRootUrl}category`)
        .then(({data})=>{
            setLoading(false);
            let categories = data;
            categories.map(({id,name})=>{
                setCat(prevCat=>[...prevCat,{id,name}]);
            })
        }).catch(err=>{
            setLoading(false);
            toast.error(errorMessage, {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose:false
            })
        })
    }, [])

    function changeName(e) {
        setName(e.target.value);
    }

    function changeDescription(e) {
        setDescription(e.target.value);
    }

    function changePrice(e) {
        setPrice(e.target.value);
    }

    function changeCategory(e) {
        setCategory(e.target.value);
    }

    function addProduct(e) {
        e.preventDefault();
        const formData = new FormData();
        const imagefile = document.querySelector('#file');
        formData.append("name", name);
        formData.append("productImage", imagefile.files[0]);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("categoryId", category);

        if(name.trim() === '' || description.trim() === '' || price.trim() === '' || !imagefile.files[0]) {
            toast.error('All fields are required', {
                position: toast.POSITION.BOTTOM_LEFT
            })   
        } else {
            setLoading(true);
            axios.post(`${apiRootUrl}product`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(({data})=>{
                setLoading(false);
                // console.log(data)
                setProductId(data.productId);
                setRedr(true);
            }).catch(err=>{
                setLoading(false);
                console.log(err)
                toast.error('All fields are required', {
                    position: toast.POSITION.BOTTOM_LEFT
                })
            })
        }
    }

    return (
        <Fragment>
            {requireAuth()}
            {loading&&<Loader/>}
            {redr&&<Redirect to = {`/product/${productId}`} />}
            <main>
                <div className = "main__container">
                    <h2 style = {{marginBottom:'15px'}}>Add a Product</h2>
                    <form>
                        <div>
                            <label>Name</label>
                            <input type = "text" value = {name} onChange = {changeName} />
                        </div>
                        <div>
                            <label>Image</label>
                            <input type = "file" id = "file" />
                        </div>
                        <div>
                            <label>Description</label>
                            <input type = "text" value = {description} onChange = {changeDescription} />
                        </div>
                        <div>
                            <label>Price</label>
                            <input type = "text" value = {price} onChange = {changePrice} />
                        </div>
                        <div>
                            <label>Category</label>
                            <select value = {category} onChange = {changeCategory}>
                                {cat.map(({id,name})=><option key = {id} value = {id}>{name}</option>)}
                            </select>
                        </div>
                        <div style = {{marginTop:'14px'}}>
                            <button className = "btn block" onClick = {addProduct}>Update Product</button>
                        </div>
                    </form>
                </div>
            </main>
        </Fragment>
    )
}

export default AddProduct;
