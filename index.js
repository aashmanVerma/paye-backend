const express = require('express');
const mongoose = require('mongoose');
const authroutes = require("./authmodels/authController");
const mail = require('./mails/mail');
const form = require("./form/controller");
const emp = require('./employeeModel/empController');
const pay = require("./payment/payment")
const cors = require('cors');
const app = express();
require('dotenv').config();

const port = process.env.PORT;
const url = process.env.URL;

app.use(express.json())
app.use(cors());
app.use(authroutes);
app.use(mail);
app.use(form);
app.use(emp);
app.use(pay);

app.listen(port,()=>{
    console.log(`server listening on ${port}`);
    mongoose.connect(url).then((d)=>{
        console.log("connected to db");
    }).catch((err)=>{
        console.log(err);
    })
})

app.get("/",(req,res)=>{
    console.log("hi from server");
})