import React, { Fragment } from 'react'
import './Order.css'
import moment from "moment"
import { Link } from 'react-router-dom'

function Order({id,subtotal,logisticFee,timestamp,more}) {

    const today = "Before 8pm today";
    const tomorrow = "Before 8pm tomorrow";

    function deadline(timestamp) {
        const format = 'hh:mm:ss';
        const time = moment(timestamp);
        const checkerTime = moment('18:00:00',format);

        if(time.isAfter(checkerTime)) {
            return tomorrow;
        } else {
            return today;
        }
    }

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
                <td>{moment.unix(timestamp).format("MM/DD/YYYY [at] h:mm a")}</td>
                {more&&<td>{deadline()}</td>}
                <td>{Number(subtotal).toLocaleString(undefined, {maximumFractionDigits:2})}</td>
                <td>{Number(logisticFee).toLocaleString(undefined, {maximumFractionDigits:2})}</td>
                <td><Link to = {`/update/order/${id}`} className = "btn">Update</Link></td>
            </tr>       
        </Fragment>
    )
}

export default Order
