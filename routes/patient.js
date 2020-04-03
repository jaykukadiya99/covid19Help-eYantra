const express = require("express");
const mongoose = require("mongoose");
const route = express.Router();
const {Patient} = require("../models/patient.js");

route.get('/', (req, res) => {
    res.render("patient");
});

route.post('/',async(req,res)=>{
    //res.send(req.body);
    const newPatient = new Patient({
        firstName:req.body.txtFirstName,
        lastName:req.body.txtLastName,
        email:req.body.txtEmail,
        gender:req.body.txtGender,
        mobile:req.body.txtMobile,
        state:req.body.txtState,
        age:req.body.txtAge,
        disease:req.body.txtDisease,
        diseaseDetails:req.body.txtDiseaseDetails,
        fromDays:req.body.txtFromDays
    });
    newPatient.save((err,result)=>{
        if (err)
            req.session.error = 'Somthing goes wrong try again after sometime';
        else
            req.session.sucess = 'Doctor will contact you soon';
        
        res.redirect('/');
    });
});


module.exports = route