const pool = require("../../utils/pool");
const moment = require('moment');
const fs = require('fs');
// const metaphone = require('metaphone');
// const stemmer = require('stemmer');
const enhance = require("../../utils/enhance");

exports.products_get_all = (req,res,next) => {
    const tokenEmail = req.userData.email;
    
    if(tokenEmail === process.env.adminEmail) {
        pool.getConnection(function(err,conn){
            if(err) {
                res.status(500).json({error:'An error occured. Please try again!'});
            } else {
                conn.query(`select * from productSchema`, function(err,products){
                    conn.release();
                    if(err) {
                        res.status(500).json({error:'An error occured. Please try again!'});
                    } else {
                        res.status(200).json(products);
                    }
                });
            }
        }); 
    } else {
        res.status(401).json({error:'Auth failed!'});
    }
}

exports.products_get_product = (req,res,next) => {
    const { productId } = req.params;

    pool.getConnection(function(err,conn){
        if(err) {
            res.status(500).json({error:'An error occured. Please try again!'});
        } else {
            conn.query(`select * from productSchema where ( id = ? ) and ( visible = 1 )`, [productId], function(err,product){
                conn.release();
                if(err) {
                    res.status(500).json({error:'An error occured. Please try again!'});
                } else {
                    if(product.length > 0) {
                        res.status(200).json(product[0]);
                    } else {
                        res.status(200).json({error:'Product does not exist'});
                    }
                }
            });
        }
    }); 
}

exports.products_get_random = (req,res,next) => {
    const { limit } = req.params;

    pool.getConnection(function(err,conn){
        if(err) {
            res.status(500).json({error:'An error occured. Please try again!'});
        } else {
            conn.query(`select * from productSchema order by RAND() LIMIT ${limit}`, function(err,products){
                conn.release();
                if(err) {
                    res.status(500).json({error:'An error occured. Please try again!'});
                } else {
                    res.status(200).json(products);
                }
            }); 
        }
    });
}

exports.products_get_starred = (req,res,next) => {
    const { limit } = req.params;

    pool.getConnection(function(err,conn){
        if(err) {
            res.status(500).json({error:'An error occured. Please try again!'});
        } else {
            conn.query(`select * from productSchema where ( starred = 1 ) LIMIT ${limit}`, function(err,products){
                conn.release();
                if(err) {
                    res.status(500).json({error:'An error occured. Please try again!'});    
                } else {
                    res.status(200).json(products)
                }
            });
        }
    });
}

exports.products_add_product = (req,res,next) => {
    const tokenEmail = req.userData.email;
    const { name, description, price, categoryId } = req.body; 
    const image = req.files.productImage[0].filename;
    let sounds_like = "";
    const timestamp = moment().unix();

    if(tokenEmail === process.env.adminEmail) {
        pool.getConnection(function(err,conn){
            if(err) {
                res.status(500).json({error:'An error occured. Please try again!'});
            } else {
                /** sounds_like: name, description */
                sounds_like += `${enhance(name)} `;
                sounds_like += `${enhance(description)} `;

                conn.query(`insert into productSchema (categoryId, name, description, image, price, sounds_like, timestamp) values (?, ?, ?, ?, ?, ?, ?)`, [categoryId,name,description,image,price,sounds_like,timestamp], function(err,result){
                    conn.release();
                    if(err) {
                        res.status(500).json({error:'An error occured. Please try again!'});
                    } else {
                        res.status(200).json({
                            error:0,
                            request: {
                                type: 'GET',
                                url: `${process.env.rootUrl}product/${result.insertId}`
                            }
                        });
                    }
                });
            }
        });
    } else {
        res.status(401).json({error:'Auth failed!'});
    }
}

exports.products_update_product = (req,res,next) => {
    
    const {productId} = req.params;
    const tokenEmail = req.userData.email;
    const {name,price,categoryId,visible,starred,out_of_stock} = req.body;
    const image = req.files.productImage[0].filename;

    if(tokenEmail === process.env.adminEmail) {
        pool.getConnection(function(err,conn){
            if(err) {
                res.status(500).json({error:'An error occured. Please try again!'});
            } else {
                conn.query(`select * from productSchema where id = ?`, [productId], function(err,product){
                    conn.release();
                    if(err) {
                        res.status(500).json({error:'An error occured. Please try again!'});
                    } else {
                        if(product.length > 0) {
                            fs.unlink(`./uploads/${product[0].image}`, function(err){
                                if(err) {
                                    res.status(500).json({error:'An error occured. Please try again!'});
                                } else {
                                    pool.getConnection(function(err,conn){
                                        if(err) {
                                            res.status(500).json({error:'An error occured. Please try again!'});
                                        } else {
                                            conn.query(`update productSchema set
                                                categoryId = ?,
                                                name = ?,
                                                image = ?,
                                                price = ?,
                                                visible = ?,
                                                starred = ?,
                                                out_of_stock = ?
                                                where id = ?
                                            `, [categoryId,name,image,price,visible,starred,out_of_stock,productId], function(err,result){
                                                conn.release();
                                                if(err) {
                                                    res.status(500).json({error:'An error occured. Please try again!'});
                                                } else {
                                                    // display full products
                                                    pool.getConnection(function(err,conn){
                                                        if(err) {
                                                            res.status(500).json({error:'An error occured. Please try again!'});
                                                        } else {
                                                            conn.query(`select * from productSchema where id = '${productId}'`, function(err,product){
                                                                conn.release();
                                                                if(err) {
                                                                    res.status(500).json({error:'An error occured. Please try again!'});
                                                                } else {
                                                                    res.status(200).json(product);
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        } else {
                            res.status(200).json({error:'Product does not exist.'})
                        }
                    }
                })
            }
        });
    }
}

exports.products_delete_product = (req,res,next) => {
    // make product invisible
    // it will not be possible to delete a product ===> JUST UPDATE TO ( NOT VISIBLE )
    const { productId } = req.params;
    const tokenEmail = req.userData.email;

    if(tokenEmail ===  process.env.adminEmail) {
        pool.getConnection(function(err,conn){
            if(err) {
                res.status(500).json({error:'An error occured. Please try again!'});
            } else {

                conn.query(`select * from productSchema where id = ?`, [productId], function(err, product){
                    conn.release();
                    if(err) {
                        res.status(500).json({error:'An error occured. Please try again!'});
                    } else {

                        if(product.length > 0) {
                        

                        // delete file
                        fs.unlink(`./uploads/${product[0].image}`, function(err){
                            if(err) {
                                res.status(500).json({error:'An error occured. Please try again!'});
                            } else {
                                pool.getConnection(function(err,result){
                                    if(err) {
                                        res.status(500).json({error:'An error occured. Please try again!'});
                                    } else {
                                        conn.query(`update productSchema set visible = 0 where id = '${productId}'`, function(err,result){
                                            conn.release();
                                            if(err) {
                                                res.status(500).json({error:'An error occured. Please try again!'});
                                            } else {
                                                res.status(200).json({error:0})
                                            }
                                        });
                                    }
                                });
                            }
                        });

                    } else {
                        res.status(200).json({error:'Product does not exist.'})
                    } 
                    }
                })

            }
        });
    }
}


// exports.products_fix = (req,res,next) => {
//     /** fields: name & description - (creating & updating) */
//     pool.getConnection(function(err,conn){
//         if(err) {
//             console.log('Err1: '+err);            
//         } else {
//             conn.query(`select * from productSchema`, function(err,products){
//                 if(err) {
//                     console.log('Err2: '+err);            
//                 } else {
//                     console.log(products)
//                     products.map((product)=>{
//                         let sounds_like = "";
//                         sounds_like +=  `${metaphone(stemmer(product.name))} `;
//                         sounds_like +=  `${metaphone(stemmer(product.description))} `;
//                         conn.query(`update productSchema set sounds_like = '${sounds_like}' where id = '${product.id}'`, function(err,results){
//                             if(err) {
//                                 console.log(err)
//                             } else {
//                                 return;
//                             }
//                         });
//                     })
//                 }
//             });
//         }
//     });
// }

// can make product invisible