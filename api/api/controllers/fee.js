exports.delivery_cost = (req,res,next) => {
    // Capital(SO FAR): 1,200 (domain) + 1,600 (h.plan) + 10,000 (fliers) + 10,000 (nylon) = 22,800 naira
    /** Things To Consider:
     * <Focus on Above-Average and Rich Family</People> Market>
     * Market Product: veries
     * FoodNet Fees: 1500
     * Logistics: 1000
     * Nylons
     * Paystack(1): calculate paystack fees based on TOTAL_COST_OF_PRODUCTS & FEES ABOVE & add it to above (1.5%)
     * Paystack(2): calculate percentage on money to be transferred: 
     * (5k & below) - 10 naira
     */
    /** 
     * Calculate E.T.A. based on location
     */
    const { subtotal } = req.body;

    /** FoodNet Logic */
    let FoodNetFees;
    if(subtotal < 1000) {
        FoodNetFees = ((5/100)*subtotal) + 100; 
    } else if(subtotal <= 5000) {
        FoodNetFees = ((10/100)*subtotal) + 100; 
    } else if(subtotal > 5000 && subtotal <= 50000){
        FoodNetFees = ((15/100)*subtotal) + 100;
    } else { // above 50000
        FoodNetFees = ((20/100)*subtotal) + 100;
    }
    /** ../end */

    const logisticFees = 900; /** talk to them, more trips (to anywhere in Ibadan) -> heavily discounted price -> may depend  */
    
    const paystackPaymentFee = ( subtotal + FoodNetFees + logisticFees ) * (1.5/100);

    const paystackTransferFee = 10; // off transfer made to them

    const totalCost = FoodNetFees + logisticFees + paystackPaymentFee + paystackTransferFee; // err to add subtotal

    return res.status(200).json({
        cost: totalCost
    })
}