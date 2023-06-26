const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const {ObjectId} = require('mongodb');
const empModel = require('./empModel');
const authModel = require("../authmodels/authModel");

router.get("/emp/add",async (req,res)=>{
    let arr = [];

    const token = jwt.verify(req.query.token, "aashman-016");
    const user = new ObjectId(token);
    let id = user;

    await authModel.find({
        _id : user
    }).then((d)=>{
        arr = d;
    }).catch((err)=>{
        res.status(200).json(err);
    })

    if (arr.length!=0) {
        const emp = new empModel({
            name : req.query.name,
            age : req.query.age,
            role : req.query.role,
            email : req.query.email,
            salary : req.query.salary,
            userId : id,
            paid : false
        })
        
        await emp.save().then(()=>{
            res.status(200).json({
                employeeadded : true,
            })
        }).catch((err)=>{
            res.status(200).json({
                employeeadded : false,
                err : err,
            })
        })
    }
})

router.delete("/emp/del",async(req,res)=>{
    let arr = [];

    const token = jwt.verify(req.body.token, "aashman-016");
    const user = new ObjectId(token);
    let id = new ObjectId(req.body.id);

    await authModel.find({
        _id : user
    }).then((d)=>{
        arr = d;
    }).catch((err)=>{
        res.status(200).json(err);
    })
    if (arr.length!=0) {
        await empModel.findByIdAndDelete({
            _id : id
        }).then(()=>{
            res.status(200).json({
                employeedel : true
            })
        }).catch((err)=>{
            res.status.json({
                employeedel : false,
                err : err
            })
        })
    }
})

router.get("/emp/fetch",async(req,res)=>{
    let arr = [];

    const token = jwt.verify(req.query.token, "aashman-016");
    const user = new ObjectId(token);

    await empModel.find({
        userId : user,
    }).then((d)=>{
        arr = d;
        res.status(200).json({
            data : arr
        })
    }).catch((err)=>{
        res.status(200).json({
            err : err,
        })
    })
})

router.put("/emp/pay",async(req,res)=>{
    let arr = [];

    const token = jwt.verify(req.body.token, "aashman-016");
    const user = new ObjectId(token);
    let id = new ObjectId(req.body.id);

    await authModel.find({
        _id : user
    }).then((d)=>{
        arr = d;
    }).catch((err)=>{
        res.status(200).json(err);
    })
    if (arr.length!=0) {
        await empModel.findOneAndUpdate({
            _id : id,
        }, {paid : true}).then(()=>{
            res.status(200).json({
                paid : true,
            })
        }).catch((err)=>{
            res.status(200).json({
                paid : false,
                err : err
            })
        })
    }
})

 

module.exports = router;