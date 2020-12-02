const jwt = require('jsonwebtoken');

exports.login = (req,res,next) => {
    const { username, password } = req.body;
    if(username !== process.env.logisticsUsername) {
        res.status(200).json({error:'Invalid login credentials'});
    } else {
        if(password !== process.env.logisticsPassword) {
            res.status(200).json({error:'Invalid login credentials'});
        } else {
            const token = jwt.sign(
                {
                    email: username
                },
                process.env.JWT_KEY,
                {
                    expiresIn:"365 days"
                }
            );
            res.status(200).json({
                error:0,
                token
            })
        }
    }
}

exports.verify = (req,res,next) => {
    res.status(200).json({valid:1});
}