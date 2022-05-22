const express = require('express');
const { DEC8_BIN } = require('mysql/lib/protocol/constants/charsets');
const server = express();
const port = 9001;
const conn = require('./src/config/dbConnection');
const router = require('./src/controller/user.controller');
const userTaskRouter = require('./src/controller/usertask.controller')
const cors = require('cors')



server.use(cors());
server.use(express.urlencoded({extended : false}));
server.use(express.json())
server.use('/user' , router)
server.use('/usertask',userTaskRouter )
server.use('*',(req,res) =>{
    res.status(400).send({message : 'Page Not Found'}).end();
})



server.use('/' , (req,res)=>{
    res.status(200).send({message : ' berhasil terkoneksi'}).end();
})


server.listen(port, () => console.log(`Server Running at port ${port}`));