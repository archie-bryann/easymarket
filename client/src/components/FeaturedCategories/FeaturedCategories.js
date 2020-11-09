import React, {useState, useEffect} from 'react'
import './FeaturedCategories.css'
import axios from 'axios'
import Category from '../Category/Category';

function FeaturedCategories({apiRootUrl}) {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`${apiRootUrl}category`)
        .then(res=>setCategories(res.data));
    },[apiRootUrl]);


    return (
        <div className = "categories">
                  <h2 className = "title" style = {{marginTop:'-30px'}}>All Categories</h2>
            <div className = "row" style = {{marginTop:'-30px'}}>
                {
                    (categories.map(({id,name,image})=><Category key = {id} id = {id} name = {name} image = {image}  apiRootUrl = {apiRootUrl} />))
                }
            </div>
        </div>
    )
}

export default FeaturedCategories
