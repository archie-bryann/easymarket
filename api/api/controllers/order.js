const pool = require("../../utils/pool");
const moment = require('moment');

exports.orders_create_order = (req,res,next) => {

    const {userId} = req.userData;
    const timestamp = moment().unix();
    const {subtotal,delivery,logisticFee,total} = req.body;

    // const { products, price } = req.body; // price stands for total price

    //     "products":[
    //     {
    //       "id":1,
    //       "price":7500,
    //       "quantity":10
    //     },
    //     {
    //       "id":2,
    //       "price":7500,
    //       "quantity":20  
    //     }
    //   ],
    //     "price":15000
    // }

    // MAKE SURE PAYMENTS ARE MADE + MOVE FROM CART TO HERE {{ Place order <HERE> }}
    // - after the person has paid, make a request to node in the callback function, verify the payment and create order
    // use WebTooEasy

            let products = [];
            pool.getConnection(function(err,conn){
                if(err) {
                    return res.status(500).json({error:'An error occured. Please try again!'});
                } else {
                    conn.query(`select * from cartSchema where userId = ?`, [userId], function(err,cart_products){
                        if(err) {
                            return res.status(500).json({error:'An error occured. Please try again!'});
                        } else {
                            cart_products.map((p)=>{
                                // first get the product price
                                // delete all from cart
                                conn.query(`select * from productSchema where id = ?`, [p.productId], function(err,result){
                                    if(err) {
                                        return res.status(500).json({error:'An error occured. Please try again!'});
                                    } else {
                                        products.push({
                                            id:p.productId,
                                            price:result[0].price,
                                            quantity: p.quantity
                                        }) 

                                    }
                                });
                            });

                            // delete all from cart
                            conn.query(`delete from cartSchema where userId = ?`, [userId], function(err,result){
                                if(err) {
                                    return res.status(500).json({error:'An error occured. Please try again!'});
                                } else {
                                    pool.getConnection(function(err,conn){
                                        if(err) {
                                            return res.status(500).json({error:'An error occured. Please try again!'});
                                        } else {
                                            // also insert the actual logistic fee

                                            conn.query(`insert into orderSchema (userId, subtotal, delivery, logisticFee, total, timestamp) values (?, ?, ?, ?, ?, ?)`, [userId, subtotal, delivery, logisticFee, total, timestamp], function(err,r1){
                                                // conn.release();
                                                if(err) {
                                                    return res.status(500).json({error:'An error occured. Please try again!'});
                                                } else {
                                                    let checker = true;

                                                    // loop through products and store it in the database
                                                        products.map((product)=>{
                                                            if(err) {
                                                                return res.status(500).json({error:'An error occured. Please try again!'});
                                                            } else {
                                                                conn.query(`insert into orderedProductSchema (productId, price, quantity, orderId) values ('${product.id}', '${product.price}', '${product.quantity}', ${r1.insertId})`, function(err,r2){
                                                                    // conn.release();
                                                                    if(err) {
                                                                        checker = false;
                                                                        return res.status(500).json({error:'An error occured. Please try again!'});
                                                                    } else {
                                                                        /** ERROR */
                                                                    }
                                                                });
                                                            }
                                                        }); 
                                                        
                                                    if(checker === true) {
                                                        return res.status(200).json({
                                                            error:0,
                                                            orderId:r1.insertId
                                                        });
                                                    } else {
                                                        return res.status(500).json({error:'An error occured. Please try again!'});
                                                    }
                                                    
                                                }   
                                            });
                                        } 
                                    });    
                                }
                            });
                        }
                    })
                }
            }) 
}

exports.orders_get_all = (req,res,next) => {
    const tokenEmail = req.userData.email;

    if(tokenEmail === process.env.adminEmail) {
        pool.getConnection(function(err,conn){
            if(err) {
                return res.status(500).json({error:'An error occured. Please try again!'});
            } else {
                conn.query(`select * from orderSchema order by id DESC`, function(err,orders){
                    conn.release();
                    if(err) {
                        return res.status(500).json({error:'An error occured. Please try again!'});
                    } else {
                        // res.status(200).json(orders);
                        return res.status(200).json(orders.map(order=>{
                            return {
                                id:order.id,
                                userId:order.userId,
                                status:order.status,
                                total:order.total,
                                timestamp:order.timestamp
                            }
                        }));
                    }
                });
            }
        }); 
    } else {
        res.status(401).json({error:'Auth failed!'});
    }
}

exports.get_status_orders = (req,res,next) => { 
    // unfulfilled // fulfilled // cancelled
    const { status } = req.params;
    const tokenEmail = req.userData.email;

    if(tokenEmail === process.env.adminEmail || tokenEmail === process.env.logisticsUsername) {
        pool.getConnection(function(err,conn){
            if(err) {
                return res.status(500).json({error:'An error occured. Please try again!'});
            } else {
                conn.query(`select * from orderSchema where status = ? order by id DESC`, [status], function(err,orders){ /** order by latest */
                    conn.release();
                    if(err) {
                        return res.status(500).json({error:'An error occured. Please try again!'});
                    } else {
                        return res.status(200).json(orders);
                    }
                });
            }
        });
    } else {
        return res.status(401).json({error:'Auth failed!'});
    }
}

exports.get_all_previous_orders_for_user = (req,res,next) => {
    const { userId } = req.params;
    const tokenUserId = req.userData.userId;
    const tokenEmail = req.userData.email;

    console.log(userId, tokenUserId, tokenEmail, req.userDa)

    if(userId == tokenUserId || tokenEmail === process.env.adminEmail) {
        pool.getConnection(function(err,conn){
            if(err) {
                return res.status(500).json({error:'An error occured. Please try again!'});
            } else {
                conn.query(`select * from orderSchema where userId = ? order by id DESC`, [userId], function(err,orders){
                    conn.release();
                    if(err) {
                        return res.status(500).json({error:'An error occured. Please try again!'});
                    } else {
                        return res.status(200).json(orders.map((o)=>{
                            return {
                                id: o.id,
                                userId:o.userId,
                                status:o.status,
                                total:o.total,
                                timestamp:o.timestamp,
                                request: {
                                    type:'GET',
                                    url:`${process.env.rootUrl}order/d/${o.id}`
                                }
                            }
                        }))
                    }
                });
            }
        });
    } else {
        res.status(401).json({error:'No authorization!'});
    }
}

exports.orders_get_order = (req,res,next) => {
    // only for particular user & admin
    const {orderId} = req.params;
    const tokenUserId = req.userData.userId;
    const tokenEmail = req.userData.email;

    pool.getConnection(function(err,conn){
        if(err) {
            return res.status(500).json({error:'An error occured. Please try again!'});
        } else {
            conn.query(`select * from orderSchema where id = '${orderId}'`, function(err,order){
                conn.release();
                if(err) {
                    return res.status(500).json({error:'An error occured. Please try again!'});
                } else {
                    if(order.length > 0) {
                        if(order[0].userId === tokenUserId || tokenEmail === process.env.adminEmail || tokenEmail === process.env.logisticsUsername) {
                            order.map((o)=>{
                                pool.getConnection(function(err,conn){
                                    if(err) {
                                        return res.status(500).json({error:'An error occured. Please try again!'});
                                    } else {
                                        conn.query(`select * from orderedProductSchema where orderId = ?`, [orderId], function(err,orderedProducts){
                                            conn.release();
                                            if(err) {
                                                return res.status(500).json({error:'An error occured. Please try again!'});
                                            } else {
                                                return res.status(200).json({
                                                    id:o.id,
                                                    userId:o.userId,
                                                    status:o.status,
                                                    subtotal:o.subtotal,
                                                    logisticFee:o.logisticFee,
                                                    delivery:o.delivery,
                                                    total:o.total,
                                                    timestamp:o.timestamp,
                                                    orderedProducts
                                                });
                                            }
                                        });
                                    }
                                });
                            })
                        } else {
                            return res.status(401).json({error:'No authorization!'});
                        }
                    } else {
                        return res.status(404).json({error:'Order does not exist!'});
                    }
                    
                }
            }); 
        }
    });
}



exports.orders_update_order_status = (req,res,next) => {
    // {{ from pending }}
    // update to fulfilled
    // update to cancelled

    // users can update from unfulfilled to cancelled
    // only admin/logistics can update from unfulfilled to fulfilled
    const { orderId } = req.params;
    const {status} = req.body;
    const tokenUserId = req.userData.userId;
    const tokenEmail = req.userData.email;

    pool.getConnection(function(err,conn){
        if(err) {
            return res.status(500).json({eror:'An error occured. Please try again!0'});
        } else {
            conn.query(`select * from orderSchema where id = ?`, [orderId], function(err,order){
                conn.release();
                if(err) {
                    return res.status(500).json({eror:'An error occured. Please try again!1'});
                } else {
                    if(order.length > 0) {
                        if(order[0].userId === tokenUserId || tokenEmail === process.env.adminEmail || tokenEmail === process.env.logisticsUsername) {
                            pool.getConnection(function(err,conn){
                                if(err) {
                                    return res.status(500).json({error:'An error occured. Please try again!2'});
                                } else {
                                    conn.query(`update orderSchema set status = ? where id = ?`, [status,orderId], function(err,result){
                                        conn.release();
                                        if(err) {
                                            return res.status(500).json({error:'An error occured. Please try again!2'});
                                        } else {
                                            // res.status(200).json(result);
                                            pool.getConnection(function(err,conn){
                                                if(err) {
                                                    return res.status(500).json({error:'An error occured. Please try again!3'});
                                                } else {
                                                    conn.query(`select * from orderSchema where id = ?`, [orderId], function(err,order){
                                                        conn.release();
                                                        if(err) {
                                                            return res.status(500).json({error:'An error occured. Please try again!4'});
                                                        } else {
                                                            return res.status(200).json(order[0]);
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        } else {
                            return res.status(401).json({error:'No authorization!'});
                        }
                    } else {
                        return res.status(404).json({error:'Order does not exist!'});
                    }
                }
            });
        }
    })
}
