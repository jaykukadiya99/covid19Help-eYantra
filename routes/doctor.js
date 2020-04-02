const express = require("express");
const mongoose = require("mongoose");
const route = express.Router();
const {Doctor} = require("../models/doctor.js");

route.get('/',(req,res)=>{
    res.render("doctor");
});

route.post('/',(req,res)=>{    
    const newDoctor = new Doctor({      
        firstName:req.body.txtFirstName,
        lastName:req.body.txtLastName,
        email:req.body.txtEmail,
        gender:req.body.txtGender,
        mobile:req.body.txtMobile,
        state:req.body.txtState,
        qualification:req.body.txtQualification,
        speQualification:req.body.txtSpeQualification,
        regNo:req.body.txtRegNo,
    });
    newDoctor.save((err,result)=>{
        if (err) throw err;
        else
            res.redirect('/');
    });
});

module.exports = route