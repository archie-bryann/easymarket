const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();


exports.admin_login = (req,res,next) => {
    const { username, password } = req.body;
    if(username !== process.env.adminEmail) {
        res.status(200).json({error:'Invalid login credentials'});
    } else {
        if(password !== process.env.adminPassword) {
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

exports.verify_admin = (req,res,next) => {
    return res.status(200).json({valid:1});
}