const express = require("express");
const { verifyAcc } = require("../auth/verify");
const router = express.Router();
const UserModel = require("../model/User.model");
const { verifyToken } = require("../auth/verify");

router.post("/register", (req, res) => {
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  UserModel.register(data, res);
});

router.post("/login", (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };
  UserModel.login(data, res);
});

router.post("/updateBio", verifyToken, (req, res) => {
  const data = {
    id: req.body.id,
    name: req.body.name,
    profilephoto: req.body.profilephoto,
    birthday: req.body.birthday,
    nation: req.body.nation,
  };
  UserModel.updateBio(data, res);
});

router.get("/ownHistory/:id", (req, res) => {
  const id = req.params.id;
  UserModel.ownHistory(id, res);
});

router.get("/allHistory", (req, res) => {
  UserModel.allHistory(res);
});

module.exports = router;
