const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authModel = require("../authmodels/authModel");
const empModel = require("../employeeModel/empModel");
const { ObjectId } = require('mongodb');

router.post("/pay",async(req,res)=>{
    const token = req.body.token;
  let user = jwt.verify(token, "aashman-016");
  user = new ObjectId(user);
  let empid = new ObjectId(req.body.empid);

  await empModel.findOneAndUpdate({
    _id : empid,
    userId : user
  },{
    paid : true
  }).then((d)=>{
    res.status.json(d)
  }).catch((err)=>{
    res.status(200).json(err);
  })


})

module.exports = router;