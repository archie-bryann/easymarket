const pool = require("../../utils/pool");
const moment = require('moment');
const fs = require('fs');
const { products_delete_product } = require("./product");
const enhance = require("../../utils/enhance");

const dotenv = require('dotenv');
dotenv.config();


exports.categories_get_all_and_products = (req,res,next) => {

    console.log(1);

    pool.getConnection(function(err,conn){
        console.log(err)
        if(err) {
            return res.status(500).json({error:'An error occured. Please try again!'});
        } else {
            conn.query(`select * from categorySchema`, function(err,categories){
                conn.release();
                if(err) {
                console.log(1);
                    return res.status(500).json({error:'An error occured. Please try again!'});
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
    let sounds_like = "";
    const timestamp = moment().unix();

    if(tokenEmail === process.env.adminEmail) {
        pool.getConnection(function(err,conn){
            if(err){
                return res.status(500).json({error:'An error occured. Please try again!'});
            } else {
                /** category: name */
                sounds_like += `${enhance(name)} `;
                conn.query(`insert into categorySchema (name,image,sounds_like,timestamp) values (?,?,?,?)`, [name,image,sounds_like,timestamp], function(err,result){
                    conn.release();
                    if(err) {
                        return res.status(500).json({error:'An error occured. Please try again!'});
                    } else {
                        return res.status(200).json({
                            error:0,
                            categoryId: result.insertId,
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
            return res.status(500).json({error:'An error occured. Please try again!'});
        } else {
            conn.query(`select * from productSchema where ( categoryId = ? ) and ( visible = 1 )`, [categoryId], function(err,products){
                conn.release();
                if(err) {
                    return res.status(500).json({error:'An error occured. Please try again!'});
                } else {
                    pool.getConnection(function(err,conn){
                        if(err){
                            return res.status(500).json({error:'An error occured. Please try again!'});
                        } else {
                            conn.query(`select * from categorySchema where id = ?`, [categoryId], function(err,category){
                                conn.release();
                                if(err){
                                    return res.status(500).json({error:'An error occured.  Please try again!'});
                                } else {
                                    if(category[0]) {
                                        return res.status(200).json({
                                            id:categoryId,
                                            name:category[0].name,
                                            image:category[0].image,
                                            timestamp:category[0].timestamp,
                                            products
                                        });
                                    } else {
                                        return res.status(200).json({error:'Not found'});
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
            return res.status(500).json({error:'An error occured. Please try again!'});
        } else {
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
                return res.status(500).json({error:'An error occured. Please try again!'});
            } else {
                conn.query(`select * from categorySchema where id = ?`, [categoryId], function(err,category){
                    conn.release();
                    if(err) {
                        return res.status(500).json({error:'An error occured. Please try again!'});
                    } else {

                        if(category.length > 0) {

                        // delete file
                        fs.unlink(`./uploads/${category[0].image}`, function (err) {
                            if(err) {
                                return res.status(500).json({error:'An error occured. Please try again!'});
                            } else {
                                // update record
                                pool.getConnection(function(err,conn){
                                    if(err) {
                                        return res.status(500).json({error:'An error occured. Please try again!'});
                                    } else {
                                        /** category: name */
                                        let sounds_like = "";
                                        sounds_like += `${enhance(name)} `; 
                                        
                                        conn.query(`update categorySchema set
                                            name = '${name}',
                                            image = '${image}',
                                            sounds_like = '${sounds_like}'
                                            where id = '${categoryId}'
                                        `, function(err,result){
                                            conn.release();
                                            if(err) {
                                                return res.status(500).json({error:'An error occured. Please try again!'});
                                            } else {
                                                // display category
                                                pool.getConnection(function(err,conn){
                                                    if(err){
                                                        return res.status(500).json({error:'An error occured. Please try again!'});
                                                    } else {
                                                        conn.query(`select * from categorySchema where id = '${categoryId}'`,function(err,category){
                                                            conn.release();
                                                            if(err){
                                                                return res.status(500).json({error:'An error occured.  Please try again!'});
                                                            } else {
                                                                if(category[0]) {
                                                                    return res.status(200).json({
                                                                        id:categoryId,
                                                                        name:category[0].name,
                                                                        image:category[0].image,
                                                                        timestamp:category[0].timestamp,
                                                                    });
                                                                } else {
                                                                    return res.status(404).json({error:'Not found'});
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
                        return res.status(200).json({error:'Category does not exist.'})
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
                return res.status(500).json({error:'An error occured. Please try again!'});
            } else {

                conn.query(`select * from categorySchema where id = ?`, [categoryId], function(err, category){
                    if(err) {
                        return res.status(500).json({error:'An error occured. Please try again!'});
                    } else {

                        if(category.length > 0) {
                        

                        // delete file
                        fs.unlink(`./uploads/${category[0].image}`, function(err){
                            if(err) {
                                return res.status(500).json({error:'An error occured. Please try again!'});
                            } else {
                                   
                                        conn.query(`delete from categorySchema where id = ?`, [categoryId], function(err,result){
                                            conn.release();
                                            if(err) {
                                                return res.status(500).json({error:'An error occured. Please try again!'});
                                            } else {
                                                return res.status(200).json({error:0})
                                            }
                                        });
                            }
                        });

                    } else {
                        return res.status(200).json({error:'Category does not exist.'})
                    } 
                    }
                })
            }
        });
    }
}

exports.products_fix = (req,res,next) => {
    /** fields: name */
    pool.getConnection(function(err,conn){
        if(err) {
            console.log('Err1: '+err);            
        } else {
            conn.query(`select * from categorySchema`, function(err,products){
                if(err) {
                    console.log('Err2: '+err);            
                } else {
                    console.log(products)
                    products.map((product)=>{
                        let sounds_like = "";
                        sounds_like +=  `${enhance(product.name)} `;
                        conn.query(`update categorySchema set sounds_like = '${sounds_like}' where i;d = '${product.id}'`, function(err,results){
                            if(err) {
                                console.log(err);
                            } else {
                                return;
                            }
                        });
                    })
                }
            });
        }
    });
}
