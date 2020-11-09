const pool = require("../../utils/pool");
const moment = require('moment');
const fs = require('fs');
const { products_delete_product } = require("./product");

exports.categories_get_all_and_products = (req,res,next) => {
    pool.getConnection(function(err,conn){
        if(err) {
            res.status(500).json({error:'An error occured. Please try again!'});
        } else {
            conn.query(`select * from categorySchema`, function(err,categories){
                conn.release();
                if(err) {
                    res.status(500).json({error:'An error occured. Please try again!'});
                } else {
                    res.status(200).json(categories.map((category)=>{
                        return {
                            id: category.id,
                            name: category.name,
                            image:category.image,
                            timestamp: category.timestamp,
                            request: {
                                type: 'GET',
                                url: `${process.env.rootUrl}category/${category.id}`
                            }
                        }
                    }))
                    
                    // let c = [];
                    // categories.map((category)=>{
                    //         pool.getConnection(function(err,conn){
                    //             if(err) {
                    //                 res.status(500).json({error:'An error occured. Please try again!'});
                    //             } else {
                    //                 conn.query(`select * from productSchema where categoryId = '${category.id}'`, function(err, products){
                    //                     conn.release();
                    //                     if(err) {
                    //                         res.status(500).json({error:'An error occured. Please try again!'});
                    //                     } else {
                    //                         console.log(products);
                    //                         c.push({
                    //                             id: category.id,
                    //                             name: category.name,
                    //                             image: category.image,
                    //                             timestamp: category.timestamp,
                    //                             request: {
                    //                                 type:'GET',
                    //                                 url:`${process.env.rootUrl}category/${category.id}`
                    //                             },
                    //                             products 
                    //                         });
                    //                     }
                    //                 });
                    //             }
                    //         });
                    // });
                    // res.status(200).json(c);
                }
            });
        }
    });
}


// can upload an image
exports.categories_create_category = (req,res,next) => {
    const tokenEmail = req.userData.email;
    const { name } = req.body;
    const image = req.files.categoryImage[0].filename;
    const timestamp = moment().unix();

    if(tokenEmail === process.env.adminEmail) {
        pool.getConnection(function(err,conn){
            if(err){
                res.status(500).json({error:'An error occured. Please try again!'});
            } else {
                conn.query(`insert into categorySchema (name,image,timestamp) values (?,?,?)`, [name,image,timestamp], function(err,result){
                    conn.release();
                    if(err) {
                        res.status(500).json({error:'An error occured. Please try again!'});
                    } else {
                        res.status(200).json({
                            error:0,
                            request: {
                                type: 'GET',
                                url: `${process.env.rootUrl}category/${result.insertId}`
                            }
                        });
                    }
                });
            }
        }); 
    }
}

exports.categories_get_category_and_products = (req,res,next) => {
    const { categoryId } = req.params;

    // get the category data

    pool.getConnection(function(err,conn){
        if(err) {
            res.status(500).json({error:'An error occured. Please try again!'});
        } else {
            conn.query(`select * from productSchema where ( categoryId = ? ) and ( visible = 1 )`, [categoryId], function(err,products){
                conn.release();
                if(err) {
                    res.status(500).json({error:'An error occured. Please try again!'});
                } else {
                    pool.getConnection(function(err,conn){
                        if(err){
                            res.status(500).json({error:'An error occured. Please try again!'});
                        } else {
                            conn.query(`select * from categorySchema where id = ?`, [categoryId], function(err,category){
                                conn.release();
                                if(err){
                                    res.status(500).json({error:'An error occured.  Please try again!'});
                                } else {
                                    if(category[0]) {
                                        res.status(200).json({
                                            id:categoryId,
                                            name:category[0].name,
                                            image:category[0].image,
                                            timestamp:category[0].timestamp,
                                            products
                                        });
                                    } else {
                                        res.status(200).json({error:'Not found'});
                                    }
                                    
                                }
                            })
                        }
                    });
                    
                }
            });
        }
    });
}

exports.categories_get_related_products_except_current = (req,res,next) => {
    const {categoryId, productId} = req.params;
    
    pool.getConnection(function(err,conn){
        if(err) {
            res.status(500).json({error:'An error occured. Please try again!'});
        } else {7
            conn.query(`select * from productSchema where (categoryId = ?) and ( id != ? ) and ( visible = 1 ) limit 8`, [categoryId,productId], function(err,products){
                conn.release();
                if(err) {
                    res.status(500).json({error:'An error occured. Please try again!'});
                } else {
                    res.status(200).json(products);
                }
            })
        }
    })
}

exports.categories_update_category = (req,res,next) => {
    // update category
    const { categoryId } = req.params;
    const { name } = req.body;
    const image = req.files.categoryImage[0].filename;
    const tokenEmail = req.userData.email;

    if(tokenEmail === process.env.adminEmail) {
        pool.getConnection(function(err,conn){
            if(err) {
                res.status(500).json({error:'An error occured. Please try again!'});
            } else {
                conn.query(`select * from categorySchema where id = ?`, [categoryId], function(err,category){
                    conn.release();
                    if(err) {
                        res.status(500).json({error:'An error occured. Please try again!'});
                    } else {

                        if(category.length > 0) {

                        // delete file
                        fs.unlink(`./uploads/${category[0].image}`, function (err) {
                            if(err) {
                                res.status(500).json({error:'An error occured. Please try again!'});
                            } else {
                                // update record
                                pool.getConnection(function(err,conn){
                                    if(err) {
                                        res.status(500).json({error:'An error occured. Please try again!'});
                                    } else {
                                        conn.query(`update categorySchema set
                                            name = '${name}',
                                            image = '${image}'
                                            where id = '${categoryId}'
                                        `, function(err,result){
                                            conn.release();
                                            if(err) {
                                                res.status(500).json({error:'An error occured. Please try again!'});
                                            } else {
                                                // display category
                                                pool.getConnection(function(err,conn){
                                                    if(err){
                                                        res.status(500).json({error:'An error occured. Please try again!'});
                                                    } else {
                                                        conn.query(`select * from categorySchema where id = '${categoryId}'`,function(err,category){
                                                            conn.release();
                                                            if(err){
                                                                res.status(500).json({error:'An error occured.  Please try again!'});
                                                            } else {
                                                                if(category[0]) {
                                                                    res.status(200).json({
                                                                        id:categoryId,
                                                                        name:category[0].name,
                                                                        image:category[0].image,
                                                                        timestamp:category[0].timestamp,
                                                                    });
                                                                } else {
                                                                    res.status(404).json({error:'Not found'});
                                                                }
                                                                
                                                            }
                                                        })
                                                    }
                                                });
                                            }
                                        }); 
                                    }
                                });
                            }
                        });
                    } else {
                        res.status(200).json({error:'Category does not exist.'})
                    }
                    }
                });
            }
        });
    }
}

exports.categories_delete_category = (req,res,next) => {
    const { categoryId } = req.params;
    const tokenEmail = req.userData.email;

    if(tokenEmail ===  process.env.adminEmail) {
        pool.getConnection(function(err,conn){
            if(err) {
                res.status(500).json({error:'An error occured. Please try again!'});
            } else {

                conn.query(`select * from categorySchema where id = ?`, [categoryId], function(err, category){
                    conn.release();
                    if(err) {
                        res.status(500).json({error:'An error occured. Please try again!'});
                    } else {

                        if(category.length > 0) {
                        

                        // delete file
                        fs.unlink(`./uploads/${category[0].image}`, function(err){
                            if(err) {
                                res.status(500).json({error:'An error occured. Please try again!'});
                            } else {
                                pool.getConnection(function(err,result){
                                    if(err) {
                                        res.status(500).json({error:'An error occured. Please try again!'});
                                    } else {
                                        conn.query(`delete from categorySchema where id = ?`, [categoryId], function(err,result){
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
                        res.status(200).json({error:'Category does not exist.'})
                    } 
                    }
                })

                
                



            }
        });
    }
}