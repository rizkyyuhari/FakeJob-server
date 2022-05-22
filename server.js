const express = require('express');
const { DEC8_BIN } = require('mysql/lib/protocol/constants/charsets');
const server = express();
const port = 9001;
const userRouter = require('./src/controller/user.controller');
const cors = require('cors')
const taskRouter = require('./src/controller/task.controller')



server.use(cors());
server.use(express.urlencoded({extended : false}));
server.use(express.json())
server.use('/v1/user' , userRouter)
server.use('/v1/user/task' , taskRouter)
server.use('*',(req,res) =>{
    res.status(400).send({message : 'Page Not Found'}).end();
})



server.use('/' , (req,res)=>{
    res.status(200).send({message : ' berhasil terkoneksi'}).end();
})


server.listen(port, () => console.log(`Server Running at port ${port}`));