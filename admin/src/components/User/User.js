import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'
import moment from 'moment'

function User({id,firstname,lastname,email,mobile_phone_number,city,joined_timestamp}) {
    return (
        <tr>
            <td>{id}</td>
            <td>{firstname}</td>
            <td>{lastname}</td>
            <td>{email}</td>
            <td>{mobile_phone_number}</td>
            <td>{city}</td>
            <td>{moment.unix(joined_timestamp).format("MM/DD/YYYY")}</td>
            <td><Link to = {`/user/${id}`} className = "btn">View</Link></td>
        </tr>
    )
}

export default User
