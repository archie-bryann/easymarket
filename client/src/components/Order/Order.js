import React, { Fragment } from 'react'
import {sentenceCase} from 'sentence-case'
import moment from "moment"

function Order({id,status,total,timestamp}) {
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
                <td><i>{sentenceCase(status)}</i></td>
                <td>{moment.unix(timestamp).format("MM/DD/YYYY [at] h:mm a")}</td>
                <td>₦{Number(total).toLocaleString(undefined, {maximumFractionDigits:2})}</td>
            </tr>       
        </Fragment>
    )
}

export default Order
