import React from 'react'
import Header from '../../components/Header/Header'
import './Cart.css'


function Cart({title, clientRootUrl, apiRootUrl}) {

    document.title = `Cart - ${title}`;
 
    return (
        <React.Fragment>
            <Header title = {title} clientRootUrl = {clientRootUrl} />

            <br />
            <br />
            
            <div className = "small-container cart-page">
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
                                <img src = "images/gallery-1.jpg" alt = "" />
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
                    <tr>
                        <td>
                            <div className = "cart-info">
                                <img src = "images/gallery-1.jpg" alt = "" />
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
                    <tr>
                        <td>
                            <div className = "cart-info">
                                <img src = "images/gallery-1.jpg" alt = "" />
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
                    <tr>
                        <td>
                            <div className = "cart-info">
                                <img src = "images/gallery-1.jpg" alt = "" />
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
                <div className = "order-div">
                <button className = "btn">Place Order</button>
                </div>

                <br />
                <br />
                <br />
            </div>
        </React.Fragment>
        
    )
}

export default Cart
