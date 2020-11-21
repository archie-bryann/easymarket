const pool = require('../../utils/pool');
const moment = require('moment'); // npm i moment
const bcrypt = require('bcrypt');
const transporter = require('../../utils/mail');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');

IsEmail = (email) => {
    if(email.includes("@")) {
        var array = email.split("@")
        var sub = array[1]
        if(sub.includes(".")) {
            return true // email
        } else {
            return false // not an email
        }
    } else {
        return false // not an email
    }
}

exports.user_get_all = (req,res,next) => { // put middleware - admin

    // verify that he is an admin
    if(process.env.adminEmail === req.userData.email) {
        pool.getConnection(function(err,conn){
            if(err) {
                res.status(500).json({error:'An error occured. Please try again!'});
            } else {
                conn.query(`select * from userSchema`, function(err,users){
                    conn.release();
                    if(err) {
                        res.status(500).json({error:'An error occured. Please try again!'});
                    } else {
                        res.status(200).json(users);
                    }
                });
            }
        });
    } else {
        // not an admin
        res.status(401).json({error:'Auth failed'});
    }

    
}

exports.get_users_online = (req,res,next) => { // put middleware - admin 

    // verify that he is an admin

    if(process.env.adminEmail === req.userData.email) {
        pool.getConnection(function(err,conn){
            if(err) {
                res.status(500).json({error:'An error occured. Please try again!'});
            } else {
                conn.query(`select * from onlineUserSchema`, function(err,users){
                    conn.release();
                    if(err) {
                        res.status(500).json({error:'An error occured. Please try again!'});
                    } else {
                        // get the actual users online
                        res.status(200).json(users.map(user=>{
                            // get each user
                            pool.getConnection(function(err,conn){
                                if(err) {
                                    res.status(500).json({error:'An error occured. Please try again!'});
                                } else {
                                    conn.query(`select * from userSchema where jsonwebtoken = '${user.jsonwebtoken}'`, function(err,result){
                                        conn.release();
                                        if(err) {
                                            res.status(500).json({error:'An error occured. Please try again!'});
                                        } else {
                                            return result[0];
                                        }
                                    });
                                }
                            });
                        }));
                    }
                });
            }
        });
    } else {
        // not an admin
        res.status(401).json({error:'Auth failed'});
    }
    
}

exports.get_people_online = (req,res,next) => { // put middleware - admin

    // verify that he is an admin
    if(process.env.adminEmail === req.userData.email) {
        pool.getConnection(function(err,conn){
            if(err) {
                res.status(500).json({error:'An error occured. Please try again!'});
            } else {
                conn.query(`select * from onlineVisitorSchema`, function(err,people){
                    conn.release();
                    if(err) {
                        res.status(500).json({error:'An error occured. Please try again!'});
                    } else {
                        res.status(200).json(people);
                    }
                });
            }
        });
    } else {
        // not an admin
        res.status(401).json({error:'Auth failed'});
    }
}


exports.verify_user = (req,res,next) => {
    const {userId,email} = req.userData;
    return res.status(200).json({valid:1,userId,email});
}

exports.user_signup = (req,res,next) => {
    const { firstname, lastname, email, password } = req.body;
    
    const timestamp = moment().unix();

    const token = uuid.v4();

    if(firstname.length < 1 || lastname.length < 1 || email.length < 1 || password.length < 1) {
        res.status(200).json({error:'All fields are required!'});
    } else {

        if(!IsEmail(email)) {
            res.status(200).json({error:'You entered an invalid email'});
        } else {
            pool.getConnection(function(err,conn){
                if(err) {
                    res.status(500).json({error:'An error occured. Please try again!'});
                } else {
                    conn.query(`select * from userSchema where email = ?`, [email], function(err,user) {
                        if(err) {
                            res.status(500).json({error:'An error occured. Please try again!'});
                        } else {
                            if(user.length > 0) {
                                res.status(200).json({error:'The email has already been used'});
                            } else {
                                bcrypt.hash(password, 10, (err,hash) => {
                                    if(err) {
                                        return res.status(500).json({
                                            error: err
                                        });
                                    } else {
                                        /** Use Website mail (when i've bought & paid for my domain & hosting) not gmail for my MAIL */
                                        const mailOptions = {
                                            from: "webfulservices@gmail.com",
                                            to: email,
                                            subject: "E-mail Account Confirmation", 
                                            html: `<a href = "${process.env.clientRootUrl}verify/${email}/${token}">${process.env.clientRootUrl}verify/${email}/${token}</a>`
                                        }   

                                        transporter.sendMail(mailOptions, function(err,info){
                                            
                                            if(err) {
                                                return res.status(500).json({error:'An error occured. Please try again!'});
                                            } else {
                                                // the mail is sent before the user is saved to make sure the mail is sent first
                                                conn.query(`insert into userSchema (firstname, lastname, email, password, token, joined_timestamp) values (?, ?, ?, ?, ?, ?)`, [firstname,lastname,email,hash,token,timestamp], function (err,result){
                                                    conn.release();
                                                    if(err) {
                                                        res.status(500).json({error:'An error occured. Please try again!'});
                                                    } else {
                                                        res.status(201).json({
                                                            error: 0,
                                                            message: 'You have successfully signed up. A confirmation link has been sent to your email for verification!',    
                                                            user: {
                                                                firstname,
                                                                lastname,
                                                                email,
                                                                password, // store the password in cookie and save in login input // same for login
                                                                timestamp
                                                            }
                                                        })
                                                    }
                                                });
                                    }
                                });
                                    }
                                });
                            }
                        }
                    });
                }
            });
        }
    }
}

exports.user_login = (req,res,next) => {
    const { email, password } = req.body;

    pool.getConnection(function(err,conn){
        if(err) {
            res.status(200).json({error:'An error occured. Please try again!'});
        } else {
            conn.query(`select * from userSchema where email =  ?`, [email], function(err,user){
                conn.release();
                if(err) {
                    res.status(200).json({error:'An error occured. Please try again!'});
                } else {
                    if(user.length < 1) {
                        res.status(200).json({error:'You used an invalid email or password!'}); // email
                    } else {
                        // check if user is verified / NOT
                        if(user[0].verified === 1) {
                            bcrypt.compare(password, user[0].password, (err,result)=>{
                                if(err) {
                                    res.status(200).json({error:'An error occured. Please try again!'});
                                    // return res.status(200).json({error:'You used an invalid password!'});
                                } else {
                                    if(result) { // true
                                        const token = jwt.sign(
                                            {
                                                userId: user[0].id,
                                                email: user[0].email
                                            },
                                            process.env.JWT_KEY,
                                            {
                                                expiresIn:"365 days"
                                            }
                                        );
        
                                        // update token to database
                                        pool.getConnection(function(err,conn){
                                            if(err) {
                                                res.status(200).json({error:'An error occured. Please try again!'});
                                            } else {
                                                conn.query(`update userSchema set jsonwebtoken = '${token}' where email = '${email}'`, function(err,result){
                                                    conn.release();
                                                    if(err) {
                                                        res.status(20).json({error:'An error occured. Please try again!'});
                                                    } else {
                                                        res.status(200).json({
                                                            error: 0,
                                                            message: 'Auth successful', // user will be logged in
                                                            token
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    } else { // false
                                        res.status(200).json({error:'You used an invalid email or password!'}); // password
                                    }
                                }
                            });
                        } else {
                            const mailOptions = {
                                from: process.env.mailUser,
                                to: email,
                                subject: "E-mail Account Confirmation",
                                html: `<a href = "${process.env.clientRootUrl}verify/${email}/${token}">${process.env.clientRootUrl}verify/${email}/${token}</a>`
                            }

                            transporter.sendMail(mailOptions, function(err,info){
                                if(err) {
                                    res.status(200).json({error:'An error occured. Please try again!'});
                                } else {
                                    res.status(200).json({
                                        error:933,
                                        message: 'Your email account has not been verified yet. A confirmation link has been sent to your email for verification!'
                                    });
                                }
                            });
                        }
                    }
                }
            });
        }
    });
}

exports.user_verification = (req,res,next) => {

    const { email, token } = req.params;

    pool.getConnection(function(err,conn){
        if(err) {
            res.status(200).json({error:'An error occured. Please try again!'});
        } else {
            conn.query(`select * from userSchema where email = ?`, [email], function(err,user){
                conn.release();
                if(err) {
                    res.status(200).json({error:'An error occured. Please try again!'});
                } else {
                    if(user.length < 1) {
                        res.status(200).json({error:'An error occured. Please try again!'}); // Invalid user
                    } else {
                        if(user[0].token === token) {
                            // update user to verified
                            pool.getConnection(function(err,conn){
                                if(err) {
                                    res.status(200).json({error:'An error occured. Please try again!'});
                                } else {
                                    conn.query(`update userSchema set verified = 1 where email = '${email}'`,function(err,u){
                                        conn.release();
                                        if(err) {
                                            res.status(200).json({error:'An error occured. Please try again!'});
                                        } else {   
                                            
                                            

                                            console.log(user)
                                            // user has been verified
                                            // login user
                                            const new_token = jwt.sign(
                                                {
                                                    userId: user[0].id,
                                                    email: user[0].email
                                                },
                                                process.env.JWT_KEY,
                                                {
                                                    expiresIn:"365 days"
                                                }
                                            );
                                            res.status(200).json({
                                                error:0,
                                                token:new_token
                                            })



                                        }
                                    });
                                }
                            });
                        } else {
                            res.status(200).json({error:'An error occured. Please try again!'})
                        }
                    }
                }
            });
        }
    });  
}

exports.user_password_recovery = (req,res,next) => {
    const { email } = req.body;
 
    // check if email is valid
    pool.getConnection(function(err,conn){
        if(err) {
            res.status(500).json({error:'An error occured. Please try again!'});
        } else {
            conn.query(`select * from userSchema where email = ?`, [email], function(err,user){
                conn.release();
                if(err) {
                    res.status(500).json({error:'An error occured. Please try again!'});
                } else {
                    if(user.length < 1) {
                        // invalid email
                        res.status(200).json({error:'You entered an invalid email!'});
                    } else {
                        // send mail
                        const mailOptions = {
                            from: process.env.mailUser,
                            to: email,
                            subject: "E-mail Account Confirmation",
                            text: `<a href = "${process.env.clientRootUrl}/reset_password/{${email}/${user[0].token}">${process.env.clientRootUrl}/reset_password/{${email}/${user[0].token}</a>`
                        }

                        transporter.sendMail(mailOptions, function(err,info){
                            if(err) {
                                res.status(500).json({error:'An error occured. Please try again!'});
                            } else {
                                res.status(200).json({
                                    error:0,
                                    message: 'A password reset link has been sent to your email!'
                                });
                            }
                        });
                    }
                }
            });
        }
    });
}

exports.user_reset_password = (req,res,next) => {
    const { email, token } = req.params; // 1. verify this
    const { password } = req.body; // change this

    pool.getConnection(function(err,conn){
        if(err) {
            res.status(500).json({error:'An error occured. Please try again!'});
        } else {
            conn.query(`select * from userSchema where email = ?`, [email], function(err,user){
                conn.release();
                if(err) {
                    res.status(500).json({error:'An error occured. Please try again!'});
                } else {
                    if(user.length < 1) {
                        res.status(200).json({error:'Invalid password reset link!'}); /** Invalid email! */
                    } else {
                        if(user[0].token === token) {
                            // hash & update password
                            bcrypt.hash(password, 10, (err,hash) => {
                                if(err) {
                                    return res.status(500).json({
                                        error: err
                                    });
                                } else {
                                    // update password
                                    pool.getConnection(function(err,conn){
                                        if(err) {
                                            res.status(500).json({error:'An error occured. Please try again!'});
                                        } else {
                                            conn.query(`update userSchema set password = '${hash}' where email = '${email}'`, function(err,result){
                                                conn.release();
                                                if(err) {
                                                    res.status(500).json({error:'An error occured. Please try again!'});
                                                } else {
                                                    res.status(200).json({
                                                        error:0 // success: redirect to login page
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                          
                        } else {
                            res.status(200).json({error:'Invalid password reset link!'}); // invalid token
                        }
                    }
                }
            });
        }
    });
}

exports.users_get_user = (req,res,next) => {
    const { userId } = req.params;
    const tokenUserId = req.userData.userId;
    const tokenEmail = req.userData.email;
    // only for specific user & for admin
    if(userId == tokenUserId || tokenEmail === process.env.adminEmail) {
        pool.getConnection(function(err,conn){
            if(err) {
                res.status(500).json({error:'An error occured. Please try again!'});
            } else {
                conn.query(`select * from userSchema where id = ?`, [userId], function(err,user){
                    conn.release();
                    if(err) {
                        res.status(500).json({error:'An error occured. Please try again!'});
                    } else {
                        res.status(200).json(user[0]);
                    }
                })
            }
        });
    } else {
        res.status(401).json({error:'No authorization!'});
    }
}

exports.users_update_user = (req,res,next) => {
    const { userId } = req.params;
    const tokenUserId = req.userData.userId;
    const tokenEmail = req.userData.email;

    const { firstname, lastname, mobile_phone_number, additional_mobile_number, address,additional_info, state_region, city } = req.body;
    
    /*
        // the person can change this in the order - will not be saved { ONLY FOR THE ORDER }
        --{{Tell them}} this will be the default location for any order you place 
        flat no.
        block no.
        street no.
        zone

        FRONT-END
        empty input_box for address
        input box: Games Village {Default} {disabled}
        state_region {Default} {disabled}  -- ABUJA_KAURA_DISTRICT
        city {Default} {disabled} -- FEDERAL CAPITAL TERRITORY
        country {Default} {disabled} -- Nigeria
    */
    
    if(userId == tokenUserId || tokenEmail === process.env.adminEmail) { // valid user
        pool.getConnection(function(err,conn){
            if(err) {
                res.status(500).json({error:'An error occured. Please try again!'});
            } else {
                conn.query(`update userSchema set 
                    firstname = ?,
                    lastname = ?,
                    mobile_phone_number = ?,
                    additional_mobile_number = ?,
                    address = ?,
                    additional_info = ?,
                    state_region = ?,
                    city = ?
                    where id = ?
                    `, [firstname, lastname, mobile_phone_number, additional_mobile_number, address,additional_info, state_region, city,userId], function(err,result){
                    conn.release();
                    if(err) {
                        res.status(500).json({error:'An error occured. Please try again!'});
                    } else {
                        pool.getConnection(function(err,conn){
                            if(err) {
                                res.status(500).json({error:'An error occured. Please try again!'});
                            } else {
                                conn.query(`select * from userSchema where id = '${userId}'`, function(err,user){
                                    conn.release();
                                    if(err) {
                                        res.status(500).json({error:'An error occured. Please try again!'});
                                    } else {
                                        res.status(200).json({error:0});
                                    }
                                })
                            }
                        });
                    }
                });
            }
        });
    } else {
        res.status(401).json({error:'No authorization!'});
    }
}