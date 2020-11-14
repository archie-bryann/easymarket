import React from 'react'
import {Link} from 'react-router-dom'
import './Category.css'

function Category({id,name,image,apiRootUrl}) {

    return (
        <div className = "col-3">
            <Link to = {`/category/${id}`} className = "cat-link">
                <img src = {`${apiRootUrl}uploads/${image}`} className = "curve" />
                <h2 className = "text-center">{name}</h2>
            </Link>
        </div>
    )
}

export default Category;