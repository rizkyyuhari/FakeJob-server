const {createPool}  = require('mysql');
require('dotenv').config()



let conn = createPool({
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.database,
    connectionLimit:process.env.conLimit
})


module.exports = conn;