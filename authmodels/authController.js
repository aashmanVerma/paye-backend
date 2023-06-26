const authModel = require("./authModel");
const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {ObjectId} = require('mongodb');

// route to sign up to website
router.post("/signup", async (req, res, next) => {
  let arr = [];

  const user = await new authModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  await authModel
    .find({
      email: req.body.email,
    })
    .then((d) => {
      arr = d;
    });
  if (arr.length == 0) {
      await user
        .save()
        .then((d) => {
          const userId = (d._id);
          const token = jwt.sign({ id: userId }, "aashman-016");
          res.status(200).json({
            token: token,
            saved: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.status(200).json({
        exists: true,
      });
  }

  next();
});

// route to login into website
router.get("/login", async (req, res) => {
  const token = req.query.token;
  let user = jwt.verify(token, "aashman-016");
  user = new ObjectId(user.id)
  console.log(user);
  await authModel
    .findById({
      _id: user,
    })
    .then((d) => {
      res.status(200).json({
        login : true
      });
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
});

// route to fetch profile
router.get("/profile",async (req,res)=>{
  const token = req.query.token;
  let user = jwt.verify(token, "aashman-016");
  user = new ObjectId(user);
  await authModel.findById({
    _id : user
  }).then((d)=>{
    res.status(200).json(d);
  }).catch((err)=>{
    res.status(200).json(d);
  })
})

// route to delete account - code has security issues
router.get("/del", async (req, res) => {
  const token = req.query.token;
  let user = jwt.verify(token, "aashman-016");
  user = new ObjectId(user);
  await authModel
    .findOneAndDelete({
      _id: user,
    })
    .then(() => {
      res.status(200).json({
        deleted: true,
      });
    })
    .catch((err) => {
      res.json(err);
      console.log(err);
    });
});

module.exports = router;
