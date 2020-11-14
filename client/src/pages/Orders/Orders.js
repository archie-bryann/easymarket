import React, { Fragment } from 'react'
import { Redirect } from 'react-router-dom';
import Header from '../../components/Header/Header'
import './Orders.css'

function Orders({title, apiRootUrl, clientRootUrl, loggedInStatus}) {

    document.title = `My Orders - ${title}`;

    return (
        <Fragment>
             {
                (!loggedInStatus) && (
                    <Redirect to = "/account" />
                )
            }
            <Header title = {title} clientRootUrl = {clientRootUrl} loggedInStatus = {loggedInStatus} />

            <br />
            <br />
            
            <div className = "small-container cart-page">
                <table>
                    <tr>
                        <th>Order</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Total</th>
                    </tr>
                    {/* start of table */}
                    <tr>
                        <td>
                            <div className = "cart-info-2">
                                <div>
                                    <p>Order 242</p>
                                    <a href = "/order/242">See more</a>
                                </div>
                            </div>
                        </td>
                        <td>Cancelled</td>
                        <td>11/03/2001</td>
                        <td>$50.00</td>
                    </tr>
                    {/* end of table */}
                    <tr>
                        <td>
                            <div className = "cart-info-2">
                                <div>
                                    <p>Order 242</p>
                                    <a href = "/order/242">See more</a>
                                </div>
                            </div>
                        </td>
                        <td>Cancelled</td>
                        <td>11/03/2001</td>
                        <td>$50.00</td>
                    </tr>
                    <tr>
                        <td>
                            <div className = "cart-info-2">
                                <div>
                                    <p>Order 242</p>
                                    <a href = "/order/242">See more</a>
                                </div>
                            </div>
                        </td>
                        <td>Cancelled</td>
                        <td>11/03/2001</td>
                        <td>$50.00</td>
                    </tr>
                    <tr>
                        <td>
                            <div className = "cart-info-2">
                                <div>
                                    <p>Order 242</p>
                                    <a href = "/order/242">See more</a>
                                </div>
                            </div>
                        </td>
                        <td>Cancelled</td>
                        <td>11/03/2001</td>
                        <td>$50.00</td>
                    </tr>
                </table>
                </div>
                <br />
                <br />
                <br />
        </Fragment>
    )
}

export default Orders
