const express = require("express");
const mongoose = require("mongoose");
const route = express.Router();
const {Doctor} = require("../models/doctor.js");
const {Patient} = require("../models/patient.js");

const doctorAuth = require("../middleware/doctorAuth.js");

route.get('/',(req,res)=>{
    res.render("doctor");
});

route.post('/',async(req,res)=>{
    let doctor = await Doctor.findOne({email:req.body.txtEmail});
    if(doctor) return res.render('doctor',{errMsg:'your email is already registed'});
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

route.get('/login',(req,res)=>{
    res.render("./doctor/doctorLogin")
});

route.post("/login",async(req,res)=>{

    if(req.session.userType=="doctor")
        return res.redirect("/doctor/patientList");

    let doctor = await Doctor.findOne({email:req.body.txtEmail});
    if(!doctor) return res.render("./doctor/doctorLogin",{errMsg:"Invalid User"});

    if(doctor.pass!=req.body.txtPass) return res.render("./doctor/doctorLogin",{errMsg:"Invalid Password"});

    req.session.user=doctor;
    req.session.userType="doctor";

    res.redirect("/doctor/patientList");
});

route.get('/patientList',doctorAuth,async(req,res)=>{
    let patient = await Patient.find({status:0});
    res.render("./doctor/patientList",{data:patient});
});

route.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/doctor/login');
});

module.exports = route