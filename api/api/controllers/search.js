const pool = require("../../utils/pool");
const enhance = require("../../utils/enhance");

const dotenv = require('dotenv');
dotenv.config();


exports.get_search_results = (req,res,next) => {
    // categories: name
    // products: name & description
    var { q } = req.params;
    q = enhance(q);
    q = '%'+q+'%';
    let result = {};
    pool.getConnection(function(err,conn){
        if(err) {
            return res.status(500).json({error:'An error occured. Please try again!'});
        } else {
            conn.query(`select * from categorySchema where sounds_like LIKE ?`, [q], function(err,categories){
                conn.release();
                if(err) {
                    return res.status(500).json({error:'An error occured. Please try again!'});
                } else {
                    result.categories = categories;
                    pool.getConnection(function(err,conn){
                        if(err) {
                            return res.status(500).json({error:'An error occured. Please try again!'});
                        } else {
                            conn.query(`select * from productSchema where sounds_like like ? and ( visible = 1 )`, [q], function(err,products){
                                conn.release();
                                if(err) {
                                    return res.status(500).json({error:'An error occured. Please try again!'});
                                } else {
                                    result.products = products;
                                    return res.status(200).json(result);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}