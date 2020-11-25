const metaphone = require('metaphone');
const pool = require('../../utils/pool');
const locationFee = require('../../utils/locationFee');


exports.cart_get_all_for_user = (req,res,next) => {
    const tokenUserId = req.userData.userId;
    // const tokenEmail = req.userData.email;

    // if(userId == tokenUserId || tokenEmail === process.env.adminEmail) {
        pool.getConnection(function(err,conn){
            if(err) {
                return res.status(500).json({error:'An error occured. Please try again!'});
            } else {
                conn.query(`select * from cartSchema where userId = ?`, [tokenUserId], function(err,result){
                    // conn.release();
                    if(err) {
                        return res.status(500).json({error:'An error occured. Please try again!'});
                    } else {

                        conn.query(`select * from userSchema where id = ?`, [tokenUserId], (err,user)=>{
                            conn.release();
                            if(err) {
                                return res.status(500).json({error:'An error occured. Please try again!'});
                            } else {
                                return res.status(200).json({
                                    cartItems:result,
                                    fee: locationFee(user[0].city)
                                });
                            }
                        })

                        
                    }
                });
            }
        });

        // res.end();
    // } else {
    //     res.status(401).json({error:'No authorization!'});
    // }
}

exports.add_to_cart = (req,res,next) => {
    const { productId, quantity } = req.body;
    const { userId } = req.userData;

    pool.getConnection(function(err,conn){
        if(err) {
            return res.status(500).json({error:'An error occured. Please try again!'});
        } else {
            pool.getConnection(function(err,conn){
                if(err) {
                    return res.status(500).json({error:'An error occured. Please try again!'});
                } else {
                    conn.query(`select * from cartSchema where ( productId = ?) and ( userId = ? )`, [ productId,userId], function(err,cart_product){
                        // conn.release();
                        if(err) {
                            return res.status(500).json({error:'An error occured. Please try again!'});
                        } else {
                            if(cart_product.length > 0) {

                                // update quantity in cart
                                conn.query(`update cartSchema set quantity = ? where ( productId = ?) and ( userId = ? )`, [quantity,productId,userId], function(err,result){
                                    if(err) {
                                        return res.status(500).json({error:'An error occured. Please try again!'});
                                    } else {
                                        return res.status(200).json({error:455,message:'Product already exists in cart but the quantity has been updated'});
                                    } 
                                });

                            } else {
                                conn.query(`insert into cartSchema (userId, productId, quantity) values (?,?,?)`, [userId,productId, quantity], function(err,result){
                                    conn.release();
                                    if(err) {
                                        return res.status(500).json({error:'An error occured. Please try again!'});
                                    } else {
                                        return res.status(200).json({
                                            error: 0,
                                            message: 'Product has been added to cart',
                                            id: result.insertId,
                                            userId,
                                            productId,
                                            quantity
                                        });
                                    }
                                });
                            }
                        }
                    })
                }
            });
        }
    }); 
}

// update quantity
exports.update_cart_product_details = (req,res,next) => {
    const {cartId} = req.params;
    const {quantity} = req.body;
    const {userId} = req.userData;

    /** 
     * check if cartItem exists <i>
     * check if the user is authorized to change <i>
     * update cartItem
     * give success message
     */
    pool.getConnection((err, conn) => {
            if (err) {
                return res.status(500).json({ error: 'An error occured. Please try again!' });
            } else {
                conn.query(`select * from cartSchema where id = ? and userId = ?`, [cartId,userId], (err,cartItem) => {
                    if(err) {
                        return res.status(500).json({ error: 'An error occured. Please try again!' });
                    } else {
                        console.log(cartItem)
                        if(cartItem.length < 1) {
                            return res.status(500).json({ error: 'An error occured. Please try again!' }); // The CartItem you're trying to update does not exist
                        } else {
                            conn.query(`update cartSchema set quantity = ? where ( id = ? and userId = ? )`, [quantity,cartId,userId], (err,result)=>{
                                conn.release();
                                if(err) {
                                    return res.status(500).json({ error: 'An error occured. Please try again!' });
                                } else {
                                    return res.status(200).json({error:0,message:"Quantity updated successfully"});
                                }
                            })
                        }
                    }
                });
            }
        })
}

exports.remove_from_cart = (req,res,next) => {
    const { cartId } = req.params;
    const {userId} = req.userData;

    pool.getConnection(function(err,conn){
        if(err) {
            return res.status(500).json({error:'An error occured. Please try again!'});
        } else {

            conn.query(`select * from cartSchema where id = ? and userId = ?`, [cartId,userId], (err,cartItem)=>{
                if(err) {
                    return res.status(500).json({ error: 'An error occured. Please try again!' });
                } else {
                    if(cartItem.length < 1) {
                        return res.status(500).json({ error: 'An error occured. Please try again!' }); // The CartItem you're trying to update does not exist
                    } else {
                        conn.query(`delete from cartSchema where id = ?`, [cartId], function(err,result){   
                            conn.release();
                            if(err) {
                                return res.status(500).json({error:'An error occured. Please try again!'});
                            } else {
                                return res.status(200).json({error:0,message:'Product successfully removed from cart'});
                            }
                        });
                    }
                }
            })

            
        }
    });
}