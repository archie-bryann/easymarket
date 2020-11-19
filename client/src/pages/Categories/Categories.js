import React, {useState,useEffect} from 'react'
import Header from '../../components/Header/Header'
import axios from 'axios'
import FeaturedCategories from '../../components/FeaturedCategories/FeaturedCategories';

function Categories({title, apiRootUrl, clientRootUrl, match, loggedInStatus,cartNum, token}) {

    const [categories, setCategories] = useState([]);

    // useEffect(() => {
    //     axios.get(`${apiRootUrl}category/`)
    //     .then(res=>{
    //         console.log(res.data)
    //         setCategories(res.data);
    //     })
    //     .catch(err=>console.log(err))
    // }, [apiRootUrl])


    return (
        <React.Fragment>
            <Header title = {title} clientRootUrl = {clientRootUrl} match = {match} loggedInStatus = {loggedInStatus} cartNum = {cartNum} token = {token} />

            <div className = "container">
                <div className = "row">
                   <FeaturedCategories apiRootUrl = {apiRootUrl} />
                </div>
            </div>

        </React.Fragment>
    )
}

export default Categories
