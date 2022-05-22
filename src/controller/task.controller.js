const express = require('express')
const router = express.Router();
const { verifyToken } = require("../auth/verify");
const TaskModel = require('../model/Task.model')



router.get("/getHistory/:id",verifyToken, (req, res) => {
    const id = req.params.id;
    TaskModel.ownHistory(id, res);
  });
  
  router.get("/getHistory", verifyToken,(req, res) => {
    TaskModel.allHistory(res);
  });

  router.post('/', verifyToken,(req,res)=>{
    const data = {
      userid : req.body.userid,
      input : req.body.input,
    }
    TaskModel.insertParam(data,res);
  })


module.exports = router;