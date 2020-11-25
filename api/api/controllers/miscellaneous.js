const pool = require('../../utils/pool');
const PayStack = require('paystack-node');
const checkLocationFee = require('../../utils/locationFee');
const environment = process.env.NODE_ENV;
const paystackTestSecretKey = process.env.paystackTestSecretKey;
const paystackLiveSecretKey = process.env.paystackLiveSecretKey;
const paystack = new PayStack(paystackTestSecretKey, environment);
/** Logistics Info */
const logisticName = "Runsmith Logistics";
const logisticAccNumber = "0000000000";
const logisticBankCode = "011";
const logisticReason = "Logistic Services";
const logisticDefaultFee = 600;
let logisticFees;

/** talk to them, more trips (to anywhere in Ibadan) -> heavily discounted price -> may depend  */ /** start from 500 per trip */

/** TRANSFER MONEY TO FOOD AGENT TOO */

/** WRITE A FUNCTION TO CALCULATE THEIR DELIVERY FEE */

exports.city_cost = (req,res,next) => {
    const {city} = req.params;
    console.log(city)
    return res.status(200).json({
        fee:checkLocationFee(city)
    })    
}

exports.delivery_cost = (req,res,next) => {
   
    const {userId} = req.userData;

    /** Get the city of the user */
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

    console.log(logisticFees)

    // const logisticFees = 1000; /** logistic fees varies based on LOCATION */

    const { subtotal } = req.body;

    /** FoodNet Logic */
    let FoodNetFees;

    if(subtotal < 1000) {   
        FoodNetFees = ((2.5/100)*subtotal) + 100;  // 1.5 (down)
    } else if(subtotal <= 5000) {
        FoodNetFees = ((3/100)*subtotal) + 100; 
    } else if(subtotal > 5000 && subtotal <= 50000){
        FoodNetFees = ((3.5/100)*subtotal) + 100;
    } else { // above 50000
        FoodNetFees = ((4/100)*subtotal) + 100;
    }
    /** ../end */

    const paystackPaymentFee = ( subtotal + FoodNetFees + logisticFees ) * (1.5/100);

    const paystackTransferFee = 10; // off transfer made to them

    const totalCost = FoodNetFees + logisticFees + paystackPaymentFee + paystackTransferFee; // err to add subtotal

    return res.status(200).json({
        cost: totalCost
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
                        amount: 900 * 100,
                        recipient: recipient_code,
                        reference: Math.floor((Math.random() * 1000000000) + 1)
                    })
                    promise3.then(function({body}){
                        if(body.data.status === "success") {
                            // will only work with real transactions
                            res.status(200).json({error:0})
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