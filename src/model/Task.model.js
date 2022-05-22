const conn = require("../config/dbConnection");


exports.ownHistory = (id, res) => {
    conn.query(
      "SELECT UserID,input,output,created_at FROM result WHERE UserID = ? ORDER BY created_at DESC ",
      [id],
      (err, result) => {
        if (err) throw err;
        const data = {
          status: 1,
          datas: JSON.parse(JSON.stringify(result)),
        };
        return res.status(200).send(data);
      }
    );
  };


  exports.allHistory = (res) => {
    conn.query(
      "SELECT UserID,input,output,created_at FROM result  ORDER BY created_at DESC ",
      (err, result) => {
        if (err) throw err;
        const data = {
          status: 1,
          datas: JSON.parse(JSON.stringify(result)),
        };
        return res.status(200).send(data);
      }
    );
  };


  exports.insertParam = (data, res) => {
    conn.query(
      "INSERT INTO result (UserID,input) VALUES (?,?)",
      [data.userid, data.input],
      (err, result) => {
        if(err) throw err;
        return res.send({status : 1, message: 'Succesfully added Input'})
      }
    );
  };