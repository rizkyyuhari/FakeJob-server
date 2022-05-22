const express = require("express");
const router = express.Router();
const UserModel = require("../model/User.model");
const { verifyToken } = require("../auth/verify");
const { route } = require("express/lib/application");
// const Multer = require('multer')
const ImageModel = require('../model/image.model')

// const multer = Multer({
//   storage: Multer.memoryStorage(),
//   limits: {
//     fileSize: 5 * 1024 * 1024,
//   },
// });

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



module.exports = router;
