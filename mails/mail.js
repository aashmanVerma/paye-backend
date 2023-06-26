const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
const authModel = require('../authmodels/authModel');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

router.post("/send/mail",async (req,res)=>{

    let arr = [];

    const token = jwt.verify(req.body.token, "aashman-016");
    const user = new ObjectId(token);
    await authModel.find({
        _id : user
    }).then((d)=>{
        arr = d;
    }).catch((err)=>{
        res.status(200).json(err);
    })

    if (arr.length!=0) {
        const transporter = nodemailer.createTransport({
            service : 'gmail',
            auth : {
                user : "collab.content.aa@gmail.com",
                pass : "moocflxubmwfglgn"
            }
        })
    
        const mailOptions = {
            from : req.body.sender,
            to : req.body.to,
            subject : req.body.subject,
            text : req.body.text
        }
    
        transporter.sendMail(mailOptions, function(err,info) {
            if (err) {
                res.status(200).json(err);
            } else {
                res.status(200).json("email sent");
            }
        })
    }

});

module.exports = router;


