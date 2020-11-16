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
    const FoodNetFees = 1500; /** must cover nylon & also the value we provide */
    const logisticFees = 500; /** talk to them, more trips (to anywhere in Ibadan) -> heavily discounted price -> may depend  */
    
    const paystackPaymentFee = ( subtotal * FoodNetFees * logisticFees ) * (1.5/100);
    
    const paystackTransferFee = 10;

    const totalCost = subtotal + FoodNetFees + logisticFees + paystackPaymentFee + paystackTransferFee;

    res.status(200).json({
        cost: totalCost
    })
}