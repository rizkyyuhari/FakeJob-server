const conn = require("../config/dbConnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { DEC8_BIN } = require("mysql/lib/protocol/constants/charsets");

exports.register = async (data, res) => {
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(data.password, salt);

  conn.query(
    `SELECT * FROM users WHERE LOWER(email) = ${conn.escape(data.email)}`,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          status: false,
          message: "This user email is already in use!",
        });
      } else {
        conn.query(
          `INSERT INTO users (name, email, password) VALUES ('${
            data.name
          }', ${conn.escape(data.email)}, ${conn.escape(hashPassword)})`,
          (err, result) => {
            if (err) {
              console.log(err);
              return res.status(400).send({
                status: false,
                message: err,
              });
            }
            return res.status(201).send({
              status: true,
              message: "Register Succesfully",
            });
          }
        );
      }
    }
  );
};

exports.login = (data, res) => {
  conn.query(
    `SELECT * FROM users WHERE email = ?`,
    [data.email],
    (err, result) => {
      if (err) {
        throw err;
      }

      if (!result.length) {
        return res.status(401).send({
          status: false,
          message: "Email Tidak Ditemukan",
        });
      }

      bcrypt.compare(data.password, result[0]["password"], (bErr, bResult) => {
        if (bErr) {
          throw err;
        }

        if (bResult) {
          result[0].password = undefined;
          const data = JSON.parse(JSON.stringify(result[0]));
          const token = jwt.sign(
            { id: data.id, name: data.name, email: data.email },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
          );

          return res.send({
            status: true,
            message: "Logged In!",
            token,
          });
        }

        return res.status(401).send({
          status: false,
          message: "password salah",
        });
      });
    }
  );
};

exports.updateBio = (data, res) => {
  conn.query(
    "UPDATE users SET name = ?,ProfilePhoto = ? ,BirthDay = ? , Nation = ?, updated_at = CURRENT_TIMESTAMP  WHERE id =?",
    [data.name, data.profilephoto, data.birthday, data.nation, data.id],
    (err, result) => {
      if (err) throw err;

      return res.send({
        status: true,
        message: "Update Succesfully",
      });
    }
  );
};

// exports.ownHistory = (id, res) => {
//   conn.query(
//     "SELECT UserID,input,output,created_at FROM result WHERE UserID = ? ORDER BY created_at DESC ",
//     [id],
//     (err, result) => {
//       if (err) throw err;
//       const data = {
//         status: 1,
//         datas: JSON.parse(JSON.stringify(result)),
//       };
//       return res.status(200).send(data);
//     }
//   );
// };

// exports.allHistory = (res) => {
//   conn.query(
//     "SELECT UserID,input,output,created_at FROM result  ORDER BY created_at DESC ",
//     (err, result) => {
//       if (err) throw err;
//       const data = {
//         status: 1,
//         datas: JSON.parse(JSON.stringify(result)),
//       };
//       return res.status(200).send(data);
//     }
//   );
// };

// exports.insertParam = (data, res) => {
//   conn.query(
//     "INSERT INTO result (UserID,input) VALUES (?,?)",
//     [data.userid, data.input],
//     (err, result) => {
//       if(err) throw err;
//       return res.send({status : 1, message: 'Succesfully added Input'})
//     }
//   );
// };
