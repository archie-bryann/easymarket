const jwt = require('jsonwebtoken');

exports.admin_login = (req,res,next) => {
    const { username, password } = req.body;
    if(username !== process.env.adminEmail) {
        res.status(401).json({error:'Invalid login credentials'});
    } else {
        if(password !== process.env.adminPassword) {
            res.status(401).json({error:'Invalid login credentials'});
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