import React from 'react'

function CartPricing({subTotals,delivery,total,children}) {
    return (
        <React.Fragment>
            <div className = "total-price">
                <table>
                    <tr>
                        <td><b>Subtotal</b></td> 
                        <td>₦{subTotals.toLocaleString(undefined, {maximumFractionDigits:2})}</td> {/** to 2 d.p. of total */}
                    </tr>
                    <tr>
                        <td><b>Delivery</b></td> 
                        <td>₦{delivery.toLocaleString(undefined, {maximumFractionDigits:2})}</td> 
                    </tr>
                    <tr>
                        <td><b>Total</b></td> 
                        <td>₦{total.toLocaleString(undefined, {maximumFractionDigits:2})}</td> 
                    </tr>
                </table>
            </div>
            <div className = "order-div">
                {children}
            </div>

        </React.Fragment>
    )
}

export default CartPricing
