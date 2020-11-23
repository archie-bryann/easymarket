const pool = require('../../utils/pool');
const PayStack = require('paystack-node');
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
function checkLocationFee(location) {
    switch (location) {
        case "ABAJI":
            return 3500;
        case "ABUJA AIRPORT ROAD-ABUJA TECHNOLOGY VILLAGE":
            return 800;
        case "ABUJA AIRPORT ROAD-CHIKA":
            return 600;
        case "ABUJA AIRPORT ROAD-GOSA / SABON LUGBE":
            return 600;
        case "ABUJA AIRPORT ROAD-KUCHINGORO":
            return 600;
        case "ABUJA AIRPORT ROAD-KYAMI / CENTENARY CITY":
            return 800;
        case "ABUJA AIRPORT ROAD-NNAMDI AZIKE AIRPORT":
            return 1500;
        case "ABUJA AIRPORT ROAD-PIWOYI":
            return 800;
        case "ABUJA AIRPORT ROAD-PYAKASA":
            return 600;
        case "ABUJA AIRPORT ROAD-RIVERPARK /TRADEMORE":
            return 800;
        case "ABUJA AIRPORT ROAD-SAUKA/IMMIGRATION HQ":
            return 1000;
        case "ABUJA-APO CENTRAL":
            return 500;
        case "ABUJA-APO LEGISLATIVE ZONE A":
            return 500;
        case "ABUJA-APO LEGISLATIVE ZONE B":
            return 500;
        case "ABUJA-APO LEGISLATIVE ZONE C":
            return 500;
        case "ABUJA-APO LEGISLATIVE ZONE D":
            return 500;
        case "ABUJA-APO LEGISLATIVE ZONE E":
            return 500;
        case "ABUJA-APO MECHANIC VILLAGE":
            return 600;
        case "ABUJA-APO RESETTLEMENT ZONE A":
            return 600;
        case "ABUJA-APO RESETTLEMENT ZONE B":
            return 600;
        case "ABUJA-APO RESETTLEMENT ZONE C":
            return 600;
        case "ABUJA-APO RESETTLEMENT ZONE D":
            return 600;
        case "ABUJA-APO RESETTLEMENT ZONE E":
            return 600;
        case "ABUJA-DURUMI":
            return 400;
        case "ABUJA-DURUMI PHASE 2":
            return 400;
        case "ABUJA-GARKI AREA 1":
            return 1500;
        case "ABUJA-GARKI AREA 10":
            return 500;
        case "ABUJA-GARKI AREA 11":
            return 500;
        case "ABUJA-GARKI AREA 2":
            return 500;
        case "ABUJA-GARKI AREA 3":
            return 500;
        case "ABUJA-GARKI AREA 7":
            return 500;
        case "ABUJA-GARKI AREA 8":
            return 500;
        case "ABUJA-GWARINPA 1ST AVENUE":
            return 600;
        case "ABUJA-GWARINPA 2ND AVENUE":
            return 600;
        case "ABUJA-GWARINPA 3RD AVENUE":
            return 600;
        case "ABUJA-GWARINPA 4TH AVENUE":
            return 600;
        case "ABUJA-GWARINPA 5TH AVENUE":
            return 600;
        case "ABUJA-GWARINPA 6TH AVENUE":
            return 600;
        case "ABUJA-GWARINPA 7TH AVENUE":
            return 600;
        case "ABUJA-GWARINPA EXTENSION":
            return 700;
        case "ABUJA-KATAMPE EXTENSION":
            return 600;
        case "ABUJA-KATAMPE MAIN":
            return 600; /** HERE BRO */
        case "ABUJA-KUBWA 2/1 PHASE 1":
            return 800;
        case "ABUJA-KUBWA 2/2 PHASE 2":
            return 800;
        case "ABUJA-KUBWA ARAB ROAD":
            return 900;
        case "ABUJA-KUBWA BYAZHIN":
            return 900;
        case "ABUJA-KUBWA EXTENSION 3":
            return 900;
        case "ABUJA-KUBWA GBAZANGO":
            return 900;
        case "ABUJA-KUBWA PHASE 3":
            return 800;
        case "ABUJA-KUBWA PW":
            return 800;
        case "ABUJA-KUBWA- FCDA/FHA":
            return 800;
        case "ABUJA-LIFE CAMP EXTENSION":
            return 600;
        case "ABUJA-MABUSHI":
            return 600;
        case "ABUJA-MAITAMA ALEIRO":
            return 700;
        case "ABUJA-MAITAMA ASO DRIVE":
            return 800;
        case "ABUJA-MAITAMA CENTRAL":
            return 800;
        case "ABUJA-MAITAMA EXTENSION":
            return 800;
        case "ABUJA-ASOKORO":
            return 800;
        case "ABUJA-BWARI":
            return 2000;
        case "Abuja-Central":
            return 600;
        case "Abuja-Dakibiyu":
            return 600;
        case "ABUJA-DAWAKI":
            return 700;
        case "ABUJA-DEI-DEI":
            return 1200;
        case "ABUJA-DUTSE":
            return 800;
        case "ABUJA-EFAB":
            return 700;
        case "ABUJA-GALADIMAWA":
            return 500;
        case "ABUJA-GAMES VILLAGE":
            return 500;
        case "ABUJA-GARKI2":
            return 500;
        case "ABUJA-GUDU":
            return 500;
        case "ABUJA-GUZAPE":
            return 800;
        case "ABUJA-GWAGWALADA":
            return 2000;
        case "ABUJA-JABI":
            return 600;
        case "ABUJA-JAHI":
            return 600;
        case "ABUJA-KABUSA":
            return 700;
        case "ABUJA-KADO":
            return 700;
        case "ABUJA-KARU":
            return 1500;
        case "ABUJA-KAURA DISTRICT":
            return 400;
        case "ABUJA-KUJE":
            return 1500;
        case "ABUJA-LIFE CAMP":
            return 600;
        case "ABUJA-LOKOGOMA":
            return 700;
        case "Abuja-Lugbe Across Zone1-9":
            return 800;
        case "Abuja-Lugbe Kapwa":
            return 800;
        case "Abuja-Lugbe MrBiggs":
            return 800;
        case "Abuja-Lugbe New Site":
            return 800;
        case "Abuja-Lugbe Peace Village":
            return 800;
        case "Abuja-Lugbe Police Sign Post":
            return 800;
        case "Abuja-Lugbe Premier Academy":
            return 800;
        case "Abuja-Lugbe Sector F":
            return 800;
        case "Abuja-Lugbe Skye Bank":
            return 800;
        case "Abuja-Lugbe Total":
            return 800;
        case "Abuja-Lugbe Tudun Wada":
            return 800;
        case "ABUJA-MARARABA":
            return 2000;
        case "ABUJA-NYANYA":
            return 1500;
        case "Abuja-Prince and Princess":
            return 500;
        case "ABUJA-SUNCITY":
            return 500;
        case "ABUJA-SUNNY VALLE":
            return 600;
        case "ABUJA-UTAKO":
            return 600;
        case "ABUJA-WUSE ZONE 1":
            return 600;
        case "ABUJA-WUSE ZONE 2":
            return 600;
        case "ABUJA-WUSE ZONE 3":
            return 600;
        case "ABUJA-WUSE ZONE 4":
            return 600;
        case "ABUJA-WUSE ZONE 5":
            return 600;
        case "ABUJA-WUSE ZONE 6":
            return 600;
        case "ABUJA-WUSE ZONE 7":
            return 600;
        case "ABUJA-WUSE11":
            return 600;
        case "Abuja-Wuye":
            return 600;
        case "Airport Road Iddo": /**  */
            return 1000;
        case "Airport Road Kuchingoro / Chika / Pyakasa":
            return 1000;
        case "Airport Road Sauka /Trademore / Airport":
            return 1500;
        case "Dutse":
            return 800;
        case "GIDAN MANGORO":
            return 2000;
        case "GWAGWALADA":
            return 2000;
        case "IDU":
            return 500;
        case "Jikowyi":
            return 2000;
        case "Karimo":
            return 1200;
        case "KARU":
            return 1500;
        case "Kubwa Central":
            return 1000;
        case "KWALI":
            return 3000;
        case "Lugbe":
            return 800;
        case "MINISTERS HILL":
            return 700;
        case "Mpape":
            return 700;
        case "NICON JUNCTION":
            return 600;
        case "Tungan Maje":
            return 4000;
        case "Zuba":
            return 3000;
        default:
            return logisticDefaultFee;
    }
}

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