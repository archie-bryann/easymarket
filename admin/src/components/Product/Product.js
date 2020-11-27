import React from 'react'
import moment from 'moment'
import {Link} from 'react-router-dom'

function Product({id,categoryId,name,description,image,price,visible,starred,out_of_stock,timestamp,apiRootUrl}) {
    return (
        <tr>
            <td>{id}</td>
            <td>
                <div className = "cart-info">
                    <img src = {`${apiRootUrl}uploads/${image}`} style = {{objectFit:'cover',borderRadius:'5px'}} alt = "" />
                    <p>{name}</p>
                </div>
            </td>
            <td>{description}</td>
            <td>{price}</td>
            <td>{visible}</td>
            <td>{starred}</td>
            <td>{out_of_stock}</td>
            <td>{moment.unix(timestamp).format("MM/DD/YYYY")}</td>
            <td><Link to = {`/product/${id}`} className = "btn">View</Link></td>
        </tr>
    )
}

export default Product;