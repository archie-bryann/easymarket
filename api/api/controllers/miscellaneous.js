const pool = require('../../utils/pool');
const PayStack = require('paystack-node');
const checkLocationFee = require('../../utils/locationFee');
const deliveryFee = require('../../utils/deliveryFee');
const enhance = require('../../utils/enhance');
const { categories_create_category } = require('./category');
const environment = process.env.NODE_ENV;
const paystackTestSecretKey = process.env.paystackTestSecretKey;
const paystackLiveSecretKey = process.env.paystackLiveSecretKey;
const paystack = new PayStack(paystackTestSecretKey, environment);
/** Logistics Info */
const logisticName = "Runsmith Logistics";
const logisticAccNumber = "0000000000";
const logisticBankCode = "011";
const logisticReason = "Logistic Service";
const logisticDefaultFee = 600;
let logisticFees;
/** Wholesales Info */
const wholesalersName = "Oby's Food Supplies";
const wholesalersAccNumber = "0000000000";
const wholesalersBankCode = "011";
const wholesalersReason = "Wholesale Service";
let wholesalersFees;

/** talk to them, more trips (to anywhere in Ibadan) -> heavily discounted price -> may depend  */ /** start from 500 per trip */

/** TRANSFER MONEY TO FOOD AGENT TOO */

/** WRITE A FUNCTION TO CALCULATE THEIR DELIVERY FEE */

const dotenv = require('dotenv');
dotenv.config();


exports.city_cost = (req,res,next) => {
    const {city} = req.params;
    return res.status(200).json({
        fee:checkLocationFee(city)
    })    
}

exports.delivery_cost = (req,res,next) => {
    const {subtotal,city} = req.params;
    console.log(subtotal)
    console.log(city)
    return res.status(200).json({
        fee:deliveryFee(subtotal,city)
    })
}

exports.verify_transaction = (req,res,next) => {

    const {userId} = req.userData;
    const { reference,logisticFee,subtotal } = req.params;

    pool.getConnection((err,conn)=>{
        if(err) {
            logisticFees = logisticDefaultFee;
        } else {
            conn.query(`select * from userSchema where id = ?`, [userId], (err,user)=>{
                if(err) {
                    logisticFees = logisticDefaultFee;
                } else {
                    logisticFees = checkLocationFee(user[0].city); 
                }
            });
        }
    });


    /** Verify Transaction (1) */
    const promise = paystack.verifyTransaction({
        reference
    })

    promise.then(function ({body}){
        if(body.data.status === 'success') {
            /** Create Transfer Recepient (2) */
            const promise2 = paystack.createTransferRecipient({
                type:"nuban",
                name: logisticName,
                account_number:logisticAccNumber,
                bank_code:logisticBankCode,
                currency:"NGN"
            })
            promise2.then(function({body}){
                if(body.data.active === true) {
                    /** Make Transfer with Recipient(3) */
                    // store recipient_code
                    const recipient_code = body.data.recipient_code;
                    console.log(recipient_code)
                    
                    /** JUST FOR DEVELOPMENT MODE ( REMOVE IN PRODUCTION MODE ) */
                    return res.status(200).json({error:0});

                    /** FOR PRODUCTION MODE BELOW */
                    // initiate transfer
                    const promise3 = paystack.initiateTransfer({
                        source:"balance",
                        reason: logisticReason,
                        amount: (subtotal+logisticFee) * 100, /** Market Cost & Logistic Fee */
                        recipient: recipient_code,
                        reference: Math.floor((Math.random() * 1000000000) + 1)
                    })
                    promise3.then(function({body}){
                        if(body.data.status === "success") {
                            // will only work with real transactions
                            return res.status(200).json({error:0})


                            /** FROM HERE WE MAKE TRANSFER TO THE WHOLESALER */
                            // const promise4 = paystack.createTransferRecipient({
                            //     type:"nuban",
                            //     name: wholesalersName,
                            //     account_number: wholesalersAccNumber,
                            //     bank_code: wholesalersBankCode,
                            //     currency: "NGN"
                            // })

                            // promise4.then(function({body}){
                            //     if(body.data.active === true) {
                            //         /** Make Transfer */
                            //         const recipient_code_2 = body.data.recipient_code;

                            //         const promise5 = paystack.initiateTransfer({
                            //             source:"balance",
                            //             reason:wholesalersReason,
                            //             amount: subtotal * 100, /** GET WHOLESALERS AMOUNT */
                            //             recipient: recipient_code_2,
                            //             reference: Math.floor((Math.random() * 1000000000) + 1)
                            //         })

                            //         promise5.then(function({body}){
                            //             if(body.data.status === "success") {
                            //                 // res.status(200).json({error:0})
                            //             }   else {
                            //                 /** Handle Error */
                            //                 return res.status(500).json({error:'An error occured. Please try again!'})
                            //             }
                            //         })

                            //     } else {
                            //         /** Handle Error */
                            //         return res.status(500).json({error:'An error occured. Please try again!'})
                            //     }
                            // })

                        } else {
                            /** Handle Error */
                            return res.status(500).json({error:'An error occured. Please try again!'})
                        }
                    }).catch(function(err){
                        /** Handle Error */
                        return res.status(500).json({error:'An error occured. Please try again!'})
                    });
                    /** FOR PRODUCTION MODE ABOVE */

                } else {
                    /** Handle Error */
                    return res.status(500).json({error:'An error occured. Please try again!'})
                }
            })
        } else {
            /** Handle Error */
            // console.log(2)  
            return res.status(500).json({error:'An error occured. Please try again!'})
        }
    }).catch(function(err){
        /** Handle Error */
        return res.status(500).json({error:'An error occured. Please try again!'})
    })
    // put return in all response
}

/** admin search */
exports.sudo_search = (req,res,next) => {
    // users & orders {{ exactly_like }}
    // products & categories {{ use sounds_like }}
    var {q} = req.params;
    t = '%'+q+'%'; // normal

    var r = enhance(q);
    r = '%'+r+'%';

    const result = {};
    pool.getConnection((err,conn)=>{
        if(err) {
            return res.status(500).json({error:'An error occured. Please try again!'});
        } else {
            conn.query(`select * from userSchema where 
                        id like ? or
                        firstname like ? or 
                        lastname like ? or
                        email like ? or
                        location like ? or 
                        mobile_phone_number like ? or
                        additional_mobile_number like ? or
                        address like ? or
                        additional_info like ? or
                        state_region like ? or
                        city like ? or
                        country like ? or
                        joined_timestamp like ?
            `, [t,t,t,t,t,t,t,t,t,t,t,t,t], (err,users)=>{
                if(err) {
                    return res.status(500).json({error:'An error occured. Please try again!'})
                } else {
                    result["users"] = users;

                    conn.query(`select * from orderSchema where
                                id like ? or
                                userId like ? or
                                status like ? or
                                subtotal like ? or
                                delivery like ? or
                                total like ? or
                                timestamp like ?                      
                    `, [t,t,t,t,t,t,t], (err,orders)=>{
                        if(err) {
                            return res.status(500).json({error:'An error occured. Please try again!'})
                        } else {
                            result["orders"] = orders;

                            conn.query(`select * from categorySchema where sounds_like like ?`, [r], (err,categories)=>{
                                conn.release();
                                if(err) {
                                    return res.status(500).json({error:'An error occured. Please try again!'})
                                } else {
                                    result["categories"] = categories;

                                    conn.query(`select * from productSchema where sounds_like like ?`, [r], (err,products)=>{
                                        if(err) {
                                            return res.status(500).json({error:'An error occured. Please try again!'})
                                        } else {
                                            result["products"] = products;

                                            return res.status(200).json(result);
                                        }
                                    })
                                }
                            })

                        }
                    })
                }
            })

        }
    })
}

exports.dashboard = (req,res,next) => {

    var result = {};

    pool.getConnection((err,conn)=>{
        if(err) {
            return res.status(500).json({error:'An error occured. Please try again!'});
        } else {
            conn.query(`select count(*) from userSchema`, (err,users)=>{
                if(err) {
                    return res.status(500).json({error:'An error occured. Please try again!'});
                } else {
                    result.users = users[0]["count(*)"];
                    
                    conn.query(`select count(*) from orderSchema`, (err,orders)=>{
                        if(err) {
                            return res.status(500).json({error:'An error occured. Please try again!'});
                        } else {
                            result.orders = orders[0]["count(*)"];
                            
                            conn.query(`select count(*) from orderSchema where status = 'fulfilled'`, (err,fulfilledOrders)=>{
                                if(err) {
                                    return res.status(500).json({error:'An error occured. Please try again!'});
                                } else {
                                    result.fulfilledOrders = fulfilledOrders[0]["count(*)"];
                                    
                                    conn.query(`select count(*) from orderSchema where status = 'pending'`, (err,pendingOrders)=>{
                                        if(err) {
                                            return res.status(500).json({error:'An error occured. Please try again!'});
                                        } else {
                                            result.pendingOrders = pendingOrders[0]["count(*)"];

                                            conn.query(`select count(*) from orderSchema where status = 'cancelled'`, (err,cancelledOrders)=>{
                                                if(err) {
                                                    return res.status(500).json({error:'An error occured. Please try again!'});
                                                } else {
                                                    result.cancelledOrders = cancelledOrders[0]["count(*)"];

                                                    conn.query(`select count(*) from categorySchema`, (err,categories)=>{
                                                        if(err) {
                                                            return res.status(500).json({error:'An error occured. Please try again!'});
                                                        } else {
                                                            result.categories = categories[0]["count(*)"];

                                                            conn.query(`select count(*) from productSchema`, (err,products)=>{
                                                                conn.release();
                                                                if(err) {
                                                                    return res.status(500).json({error:'An error occured. Please try again!'});
                                                                } else {
                                                                    result.products = products[0]["count(*)"];

                                                                    res.status(200).json(result);
                                                                }
                                                            })
                                                        }
                                                    })
                                                }
                                            });
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            });
        }
    })
}

exports.order_search = (req,res,next) => {
    const {q} = req.params;
    
    pool.getConnection((err,conn)=>{
        if(err) {
            return res.status(500).json({error:'An error occured. Please try again!'});
        } else {
            conn.query(`select * from orderSchema where id = ?`, [q], (err,orders)=>{
                conn.release();
                if(err) {
                    return res.status(500).json({error:'An error occured. Please try again!'})
                } else {
                    res.status(200).json(orders);
                }
            })
        }
    })
}