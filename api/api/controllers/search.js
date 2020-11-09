const pool = require("../../utils/pool");

exports.get_search_results = (req,res,next) => {
    // categories
    // products
    var { q } = req.params;
    const t = '%'+q+'%';
    let result = {};
    pool.getConnection(function(err,conn){
        if(err) {
            res.status(500).json({error:'An error occured. Please try again!'});
        } else {
            conn.query(`select * from categorySchema where name LIKE ?`, [t], function(err,categories){
                conn.release();
                if(err) {
                    res.status(500).json({error:'An error occured. Please try again!'});
                } else {
                    result.categories = categories;
                    pool.getConnection(function(err,conn){
                        if(err) {
                            res.status(500).json({error:'An error occured. Please try again!'});
                        } else {
                            conn.query(`select * from productSchema where (name LIKE ? or price LIKE ?) and ( visible = 1 )`, [t,t], function(err,products){
                                conn.release();
                                if(err) {
                                    res.status(500).json({error:'An error occured. Please try again!'});
                                } else {
                                    result.products = products;
                                    res.status(200).json(result);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}