import React, { Fragment } from 'react'
import './Order.css'
import {sentenceCase} from 'sentence-case'
import moment from "moment"
import { Link } from 'react-router-dom'

function Order({id,userId,status,total,timestamp}) {
    return (
        <Fragment>
            <tr>
                <td>
                    <div className = "cart-info-2">
                        <div>
                            <p>Order {id}</p>
                            <a href = {`/order/${id}`}>See more</a>
                        </div>
                    </div>
                </td>
                <td> <Link to = {`/user/${userId}`}>User {userId}</Link></td>
                <td><i>{sentenceCase(status)}</i></td>
                <td>{moment.unix(timestamp).format("MM/DD/YYYY [at] h:mm a")}</td>
                <td>₦{Number(total).toLocaleString(undefined, {maximumFractionDigits:2})}</td>
                <td><Link to = {`/update/order/${id}`} className = "btn">Update Status</Link></td>
            </tr>       
        </Fragment>
    )
}

export default Order
