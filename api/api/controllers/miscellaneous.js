const pool = require('../../utils/pool');
const PayStack = require('paystack-node');
const checkLocationFee = require('../../utils/locationFee');
const deliveryFee = require('../../utils/deliveryFee');
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

    const { reference } = req.params;

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
                        amount: 900 * 100, /** GET LOGISTIC AMOUN */
                        recipient: recipient_code,
                        reference: Math.floor((Math.random() * 1000000000) + 1)
                    })
                    promise3.then(function({body}){
                        if(body.data.status === "success") {
                            // will only work with real transactions
                            // res.status(200).json({error:0})


                            /** FROM HERE WE MAKE TRANSFER TO THE WHOLESALER */
                            const promise4 = paystack.createTransferRecipient({
                                type:"nuban",
                                name: wholesalersName,
                                account_number: wholesalersAccNumber,
                                bank_code: wholesalersBankCode,
                                currency: "NGN"
                            })

                            promise4.then(function({body}){
                                if(body.data.active === true) {
                                    /** Make Transfer */
                                    const recipient_code_2 = body.data.recipient_code;

                                    const promise5 = paystack.initiateTransfer({
                                        source:"balance",
                                        reason:wholesalersReason,
                                        amount: 900 * 100, /** GET WHOLESALERS AMOUNT */
                                        recipient: recipient_code_2,
                                        reference: Math.floor((Math.random() * 1000000000) + 1)
                                    })

                                    promise5.then(function({body}){
                                        if(body.data.status === "success") {
                                            // res.status(200).json({error:0})
                                        }   else {
                                            /** Handle Error */
                                            return res.status(500).json({error:'An error occured. Please try again!'})
                                        }
                                    })

                                } else {
                                    /** Handle Error */
                                    return res.status(500).json({error:'An error occured. Please try again!'})
                                }
                            })

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