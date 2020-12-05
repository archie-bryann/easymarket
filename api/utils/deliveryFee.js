const locationFee = require('./locationFee');

const dotenv = require('dotenv');
dotenv.config();

const deliveryFee = (subtotal,city) => {

    // console.log('subtotal',subtotal)

    const logisticFees = locationFee(city);

    // console.log('logisticFees', logisticFees)

    let FoodNetFees;

    if(subtotal < 1000) {   
        FoodNetFees = ((2/100)*subtotal) + 100; 
    } else if(subtotal <= 5000) {
        FoodNetFees = ((2.5/100)*subtotal) + 100; 
    } else if(subtotal > 5000 && subtotal <= 50000){
        FoodNetFees = ((3/100)*subtotal) + 100;
    } else { // above 50000
        FoodNetFees = ((3.5/100)*subtotal) + 100;
    }

    // console.log('Foodnet Fees', FoodNetFees)

    const totalFees = Number(subtotal) + Number(FoodNetFees) + Number(logisticFees);

    // console.log('totalFees', totalFees)

    let paystackPaymentFee;

    if(totalFees < 2500) { // (+100)
        paystackPaymentFee = (0.015 * totalFees);
    } else {
        paystackPaymentFee = ((0.015 * totalFees) + 100);
    }
    

    // console.log('paystackPaymentFee', paystackPaymentFee)

    const paystackTransferFee = 10 + 50; /** 25 for transfer */
    
    
    const totalDeliveryFee = logisticFees + FoodNetFees + paystackPaymentFee + paystackTransferFee;

    // console.log('totalDeliveryFee',totalDeliveryFee)

    return {logisticFees,totalDeliveryFee};
}


module.exports = deliveryFee