import React, { Fragment } from 'react'
import Header from '../../components/Header/Header'

function Order({title,clientRootUrl, apiRootUrl}) {

    document.title = ``;

    return (
        <Fragment>
            <Header title = {title} clientRootUrl = {clientRootUrl}  />
            <br />
            <br />
            <div className = "small-container cart-page">
                <div className = "row row-2" style = {{marginTop:'-5px'}}>
                    <h2>Order 242</h2>
                    <span style = {{color:'red'}}><i>Cancelled</i></span>
                </div>

                <table>
                    <tr>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                    {/* start of table */}
                    <tr>
                        <td>
                            <div className = "cart-info">
                                <img src = {`${clientRootUrl}images/gallery-1.jpg`} alt = "" />
                                <div>
                                    <p>Red Printed Tshirt</p>
                                    <small>Price: $50.00</small>
                                    <br />
                                    <a href = "">Remove</a>
                                </div>
                            </div>
                        </td>
                        <td><input type = "number" value = "1" /></td>
                        <td>$50.00</td>
                    </tr>
                    {/* end of table */}
                </table>
                <div className = "total-price">
                    <table>
                        <tr>
                            <td>Subtotal</td> 
                            <td>$200.00</td> 
                        </tr>
                        <tr>
                            <td>Tax</td> 
                            <td>$35.00</td> 
                        </tr>
                        <tr>
                            <td>Total</td> 
                            <td>$230.00</td> 
                        </tr>
                    </table>
                </div>
                {/* show only if the order is cancelled */}
                <div className = "order-div">
                <button className = "btn">Re-order</button>
                </div>
                {/* for pending orders only */}
                {/* <div className = "order-div">
                <button className = "btn">Cancel</button>
                </div> */}
                <br />
                <br />
                <br />
            </div>
        </Fragment>
    )
}

export default Order
