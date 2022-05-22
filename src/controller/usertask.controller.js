const express = require('express')
const router = express.Router();
const UserTask = require('../model/Usertask.model')

router.post('/getOwnHistory', (req,res)=>{
    const id = req.body.id;
    UserTask.getHistoryByAcc(id,res);
})


module.exports = router;