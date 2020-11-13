const pool = require('../../utils/pool');

exports.cart_get_all_for_user = (req,res,next) => {
    const { userId } = req.params;
    const tokenUserId = req.userData.userId;
    const tokenEmail = req.userData.email;

    if(userId == tokenUserId || tokenEmail === process.env.adminEmail) {
        pool.getConnection(function(err,conn){
            if(err) {
                res.status(500).json({error:'An error occured. Please try again!'});
            } else {
                conn.query(`select * from cartSchema where userId = ?`, [userId], function(err,result){
                    conn.release();
                    if(err) {
                        res.status(500).json({error:'An error occured. Please try again!'});
                    } else {
                        res.status(200).json(result);
                    }
                });
            }
        });
    } else {
        res.status(401).json({error:'No authorization!'});
    }
}


exports.add_to_cart = (req,res,next) => {
    const { productId, quantity } = req.body;
    // if product already exists in cart, give error message
    const { userId } = req.userData;

    pool.getConnection(function(err,conn){
        if(err) {
            res.status(500).json({error:'An error occured. Please try again!'});
        } else {
            
            pool.getConnection(function(err,conn){
                if(err) {
                    res.status(500).json({error:'An error occured. Please try again!'});
                } else {
                    conn.query(`select * from cartSchema where ( productId = ?) and ( userId = ? )`, [ productId,userId], function(err,cart_product){
                        // conn.release();
                        if(err) {
                            res.status(500).json({error:'An error occured. Please try again!'});
                        } else {
                            if(cart_product.length > 0) {

                                // update quantity in cart
                                conn.query(`update cartSchema set quantity = ? where ( productId = ?) and ( userId = ? )`, [quantity,productId,userId], function(err,result){
                                    if(err) {
                                        res.status(500).json({error:'An error occured. Please try again!'});
                                    } else {
                                        res.status(200).json({error:'Product already exists in cart'});
                                    } 
                                });

                            } else {
                                // so i don't have to put pool all the time, i just have to release connection
                                conn.query(`insert into cartSchema (userId, productId, quantity) values (?,?,?)`, [userId,productId, quantity], function(err,result){
                                    conn.release();
                                    if(err) {
                                        res.status(500).json({error:'An error occured. Please try again!'});
                                    } else {
                                        res.status(200).json({
                                            error: 0,
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

exports.remove_from_cart = (req,res,next) => {
    const { cartId } = req.params;

    pool.getConnection(function(err,conn){
        if(err) {
            res.status(500).json({error:'An error occured. Please try again!'});
        } else {
            conn.query(`delete from cartSchema where id = ?`, [cartId], function(err,result){
                conn.release();
                if(err) {
                    res.status(500).json({error:'An error occured. Please try again!'});
                } else {
                    res.status(200).json({error:0});
                }
            });
        }
    });
}