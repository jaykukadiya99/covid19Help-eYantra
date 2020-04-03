const express = require("express");
const route = express.Router();
const {Service} = require("../models/service.js")

route.get('/',(req,res)=>{
    res.render("service");
});

route.post('/',async(req,res)=>{
    const newPatient = new Patient({
        firstName:req.body.txtFirstName,
        lastName:req.body.txtLastName,
        email:req.body.txtEmail,
        gender:req.body.txtGender,
        mobile:req.body.txtMobile,
        state:req.body.txtState,
        age:req.body.txtAge,
        category:req.body.txtCategory,
        disease:req.body.txtDisease,
        diseaseDetails:req.body.txtDiseaseDetails,
        fromDays:req.body.txtFromDays
    });
    newPatient.save((err,result)=>{
        if (err)
            req.session.error = 'Somthing goes wrong try again after sometime';
        else
            req.session.sucess = 'Thank You! for registration';
        
        res.redirect('/');
    });
});

module.exports = route;