import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'

function Category({id,name,image,timestamp}) {
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            {/* <td>{image}</td> */}
            <td>{moment.unix(timestamp).format("MM/DD/YYYY")}</td>
            <td><Link to = {`/category/${id}`} className = "btn">View</Link></td>
        </tr>
    )
}

export default Category
