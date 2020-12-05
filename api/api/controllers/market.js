const pool = require("../../utils/pool")

// market id: 1 in marketSchema

const dotenv = require('dotenv');
dotenv.config();


exports.get_market_status = (req,res,next) => {
    pool.getConnection(function(err,conn){
        if(err) {
            return res.status(500).json({error:'An error occured. Please try again!'});
        } else {
            conn.query(`select * from marketSchema where id = 1`, function(err,market){
                conn.release();
                if(err) {
                    return res.status(500).json({error:'An error occured. Please try again!'});
                } else {
                    return res.status(200).json(market[0]);
                }
            });
        }
    });
}

exports.update_market_status = (req,res,next) => {
    const {status} = req.params; // open / closed
    const tokenEmail = req.userData.email;

    if(tokenEmail === process.env.adminEmail) {
        pool.getConnection(function(err,conn){
            if(err) {
                return res.status(500).json({error:'An error occured. Please try again!'});
            } else {
                conn.query(`update marketSchema set status = ? where id = 1`, [status], function(err,result){
                    conn.release();
                    if(err) {
                        return res.status(500).json({error:'An error occured. Please try again!'});
                    } else {
                        pool.getConnection(function(err,conn){
                            if(err) {
                                return res.status(500).json({error:'An error occured. Please try again!'});
                            } else {
                                conn.query(`select * from marketSchema where id = 1`, function(err,market){
                                    conn.release();
                                    if(err) {
                                        return res.status(500).json({error:'An error occured. Please try again!'});
                                    } else {
                                        return res.status(200).json(market[0]);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    } else {
        res.status(401).json({error:'Auth failed!'});
    }
}