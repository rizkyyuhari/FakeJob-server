const conn = require("../config/dbConnection");


exports.getHistoryByAcc = (id, res) =>{
    conn.query('SELECT * FROM result WHERE userID = ? ORDER BY created_at DESC',[id],
    (err,result) =>{
        const data = {
            message : 1,
            datas : JSON.parse(JSON.stringify(result))
        }
        return res.status(200).send(data).end();
    })
}