const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,process.env.JWT_KEY);
        req.userData = decoded;
        console.log(req.headers);
        next();
    } catch (error) {
        console.log(error)
        return res.status(200).json({message:'Auth failed',valid:0});
    }
}