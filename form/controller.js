const formModel = require('./model');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const authModel = require('../authmodels/authModel');

router.post("/form",async function(req,res) {

    let arr = [];
    const token = jwt.verify(req.body.token, "aashman-016");
    const user = new ObjectId(token);
    let id = user;

    await authModel.find({
        _id : user
    }).then((d)=>{
        arr=d;
    }).catch((err)=>{
        res.status(200).json(err);
    })

    if (arr.length!=0) {
        const form = new formModel({
            title : req.body.title,
            requirements : req.body.requirements,
            description : req.body.description,
            userId : id,       
        })
        await form.save().then((d)=>{
            res.status(200).json(d);
        }).catch((err)=>{
            res.status(200).json(err);
        })
    }
})

router.get("/form/fetch", async(req,res)=>{

    let arr = [];
    const token = jwt.verify(req.query.token, "aashman-016");
    const user = new ObjectId(token);
    let id = user;

    await authModel.find({
        _id : user
    }).then((d)=>{
        arr=d;
    }).catch((err)=>{
        res.status(200).json(err);
    })
    if (arr.length!=0) {
        await formModel.find({
            userId : id
        }).then((d)=>{
            res.status(200).json(d);
        }).catch((err)=>{
            res.status(200).json(err);
        })
    }

})

router.post("/form/del",async (req,res)=>{

    let arr = [];
    const token = jwt.verify(req.body.token, "aashman-016");
    const user = new ObjectId(token);
    let id = user;
    let formId = new ObjectId(req.body.formid);

    await authModel.find({
        _id : user
    }).then((d)=>{
        arr=d;
    }).catch((err)=>{
        res.status(200).json(err);
    })

    if (arr.length!=0) {
        await formModel.findByIdAndDelete({
            _id : formId,
        }).then(()=>{
            res.status(200).json({
                deleted : true
            })
        }).catch((err)=>{
            res.status(200).json({
                deleted : false,
                err : err
            })
        })
    }

})

module.exports = router;