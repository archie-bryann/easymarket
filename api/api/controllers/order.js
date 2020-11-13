const pool = require("../../utils/pool");
const moment = require('moment');
const https = require('https');

exports.orders_create_order = (req,res,next) => {

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
    
    const {reference} = req.body;
    const timestamp = moment().unix();
    const {userId} = req.userData;

    // MAKE SURE PAYMENTS ARE MADE + MOVE FROM CART TO HERE {{ Place order <HERE> }}
    // - after the person has paid, make a request to node in the callback function, verify the payment and create order
    // use WebTooEasy

    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: `/transaction/verify/${reference}`,
        method: 'GET',
        headers: {
            Authorization: 'Bearer SECRET_KEY'
        }
    }

    https.request(options, res => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', ()=>{
            // console.log(JSON.parse(data))
            // check documentation // only when transaction is successful do we continue

            // get products & total price from cartSchema & delete all from cartSchema
            let products = [];
            let price = 0;
            pool.getConnection(function(err,conn){
                if(err) {
                    res.status(500).json({error:'An error occured. Please try again!'});
                } else {
                    conn.query(`select * from cartSchema where userId = ?`, [userId], function(err,cart_products){
                        if(err) {
                            res.status(500).json({error:'An error occured. Please try again!'});
                        } else {
                            cart_products.map((p)=>{
                                // first get the product price
                                // delete all from cart
                                conn.query(`select * from productSchema where id = ?`, [p.productId], function(err,result){
                                    if(err) {
                                        res.status(500).json({error:'An error occured. Please try again!'});
                                    } else {
                                        products.push({
                                            id:p.productId,
                                            price:result[0].price,
                                            quantity: p.quantity
                                        }) 
                                        // add price
                                        price += Number(result[0].price);

                                    }
                                });
                            });

                            // delete all from cart
                            conn.query(`delete from cartSchema where userId = ?`, [userId], function(err,result){
                                if(err) {
                                    res.status(500).json({error:'An error occured. Please try again!'});
                                } else {
                                    pool.getConnection(function(err,conn){
                                        if(err) {
                                            res.status(500).json({error:'An error occured. Please try again!'});
                                        } else {
                                            conn.query(`insert into orderSchema (userId, price, timestamp) values (?, ?, ?)`, [userId,price,timestamp], function(err,result){
                                                conn.release();
                                                if(err) {
                                                    res.status(500).json({error:'An error occured. Please try again!'});
                                                } else {
                                                    // loop through products and store it in the database
                                                    pool.getConnection(function(err,conn){
                                                        products.map((product)=>{
                                                            if(err) {
                                                                
                                                                res.status(500).json({error:'An error occured. Please try again!'});
                                                            } else {
                                                                conn.query(`insert into orderedProductSchema (productId, price, quantity, orderId) values ('${product.id}', '${product.price}', '${product.quantity}', ${result.insertId})`, function(err,result){
                                                                    conn.release();
                                                                    if(err) {
                                                                        res.status(500).json({error:'An error occured. Please try again!'});
                                                                    } else {
                                                                        console.log(result)
                                                                        res.status(200).json({
                                                                            error:0,
                                                                            request: {
                                                                                type:'GET',
                                                                                url:`${process.env.rootUrl}order/d/${result.insertId}`
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        }); 
                                                    });
                                                    
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

        });
    }).on('error', error => {
        res.status(200).json({error:'Invalid transaction'});
    })


    // pool.getConnection(function(err,conn){
    //     if(err) {
    //         res.status(500).json({error:'An error occured. Please try again!'});
    //     } else {
    //         conn.query(`insert into orderSchema (userId, price, timestamp) values (?, ?, ?)`, [userId,price,timestamp], function(err,result){
    //             conn.release();
    //             if(err) {
    //                 res.status(500).json({error:'An error occured. Please try again!'});
    //             } else {
    //                 // loop through products and store it in the database
    //                 pool.getConnection(function(err,conn){
    //                     products.map((product)=>{
    //                         if(err) {
                                
    //                             res.status(500).json({error:'An error occured. Please try again!'});
    //                         } else {
    //                             conn.query(`insert into orderedProductSchema (productId, price, quantity, orderId) values ('${product.id}', '${product.price}', '${product.quantity}', ${result.insertId})`, function(err,result){
    //                                 conn.release();
    //                                 if(err) {
    //                                     res.status(500).json({error:'An error occured. Please try again!'});
    //                                 } else {
    //                                     console.log(result)
    //                                     res.status(200).json({
    //                                         error:0,
    //                                         request: {
    //                                             type:'GET',
    //                                             url:`${process.env.rootUrl}order/d/${result.insertId}`
    //                                         }
    //                                     });
    //                                 }
    //                             });
    //                         }
    //                     }); 
    //                 });
                    
    //             }   
    //         });
    //     } 
    // });    
}

exports.orders_get_all = (req,res,next) => {
    const tokenEmail = req.userData.email;

    if(tokenEmail === process.env.adminEmail) {
        pool.getConnection(function(err,conn){
            if(err) {
                res.status(500).json({error:'An error occured. Please try again!'});
            } else {
                conn.query(`select * from orderSchema`, function(err,orders){
                    conn.release();
                    if(err) {
                        res.status(500).json({error:'An error occured. Please try again!'});
                    } else {
                        // res.status(200).json(orders);
                        res.status(200).json(orders.map(order=>{
                            return {
                                id:order.id,
                                userId:order.userId,
                                product:JSON.parse(order.product),
                                status:order.status,
                                amount:order.amount,
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

    if(tokenEmail === process.env.adminEmail) {
        pool.getConnection(function(err,conn){
            if(err) {
                res.status(500).json({error:'An error occured. Please try again!'});
            } else {
                conn.query(`select * from orderSchema where status = ? order by id DESC`, [status], function(err,orders){ /** order by latest */
                    conn.release();
                    if(err) {
                        res.status(500).json({error:'An error occured. Please try again!'});
                    } else {
                        res.status(200).json(orders);
                    }
                });
            }
        });
    } else {
        res.status(401).json({error:'Auth failed!'});
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
                res.status(500).json({error:'An error occured. Please try again!'});
            } else {
                conn.query(`select * from orderSchema where userId = ?`, [userId], function(err,orders){
                    conn.release();
                    if(err) {
                        res.status(500).json({error:'An error occured. Please try again!'});
                    } else {
                        res.status(200).json(orders.map((o)=>{
                            return {
                                id: o.id,
                                userId:o.userId,
                                status:o.status,
                                price:o.price,
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
            res.status(500).json({error:'An error occured. Please try again!'});
        } else {
            conn.query(`select * from orderSchema where id = '${orderId}'`, function(err,order){
                conn.release();
                if(err) {
                    res.status(500).json({error:'An error occured. Please try again!'});
                } else {
                    if(order.length > 0) {
                        if(order[0].userId === tokenUserId || tokenEmail === process.env.adminEmail) {
                            order.map((o)=>{
                                pool.getConnection(function(err,conn){
                                    if(err) {
                                        res.status(500).json({error:'An error occured. Please try again!'});
                                    } else {
                                        conn.query(`select * from orderedProductSchema where orderId = ?`, [orderId], function(err,orderedProducts){
                                            // conn.release();
                                            if(err) {
                                                res.status(500).json({error:'An error occured. Please try again!'});
                                            } else {
                                                console.log(o);
                                                res.status(200).json( {
                                                    id:o.id,
                                                    userId:o.userId,
                                                    status:o.status,
                                                    price:o.price,
                                                    timestamp:o.timestamp,
                                                    orderedProducts
                                                })
                                            }
                                        });
                                    }
                                });
                            })
                        } else {
                            res.status(401).json({error:'No authorization!'});
                        }
                    } else {
                        res.status(404).json({error:'Order does not exist!'});
                    }
                    
                }
            }); 
        }
    });
}



exports.orders_update_order_status = (req,res,next) => {
    // {{ from unfulfilled }}
    // update to fulfilled
    // update to cancelled

    // users can update from unfulfilled to cancelled
    // only admin/logistics can update from unfulfilled to fulfilled
    const { orderId, status } = req.params;
    const tokenUserId = req.userData.userId;
    const tokenEmail = req.userData.email;

    pool.getConnection(function(err,conn){
        if(err) {
            res.status(500).json({eror:'An error occured. Please try again!'});
        } else {
            conn.query(`select * from orderSchema where id = ?`, [orderId], function(err,order){
                conn.release();
                if(err) {
                    res.status(500).json({eror:'An error occured. Please try again!'});
                } else {
                    if(order.length > 0) {
                        if(order[0].userId === tokenUserId || tokenEmail === process.env.adminEmail) {
                            pool.getConnection(function(err,conn){
                                if(err) {
                                    res.status(500).json({error:'An error occured. Please try again!'});
                                } else {
                                    conn.query(`update orderSchema set status = ? where id = ?`, [status,orderId], function(err,result){
                                        conn.release();
                                        if(err) {
                                            res.status(500).json({error:'An error occured. Please try again!'});
                                        } else {
                                            // res.status(200).json(result);
                                            pool.getConnection(function(err,conn){
                                                if(err) {
                                                    res.status(500).json({error:'An error occured. Please try again!'});
                                                } else {
                                                    conn.query(`select * from orderSchema where id = ?`, [orderId], function(err,order){
                                                        conn.release();
                                                        if(err) {
                                                            res.status(500).json({error:'An error occured. Please try again!'});
                                                        } else {
                                                            res.status(200).json(order[0]);
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        } else {
                            res.status(401).json({error:'No authorization!'});
                        }
                    } else {
                        res.status(404).json({error:'Order does not exist!'});
                    }
                }
            });
        }
    })
    
   
}
