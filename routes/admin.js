const express = require("express");
const mongoose = require("mongoose");
const route = express.Router();
const session = require('express-session');
const adminAuth = require("../middleware/adminAuth");

const {Admin} = require("../models/admin.js");
const {Doctor} = require("../models/doctor.js");

route.get("/",(req,res)=>{
    res.render("./admin/adminLogin");
});

route.post("/",async(req,res)=>{
    let admin = await Admin.findOne({email:req.body.txtEmail});
    if(!admin) return res.render("./admin/adminLogin",{errMsg:"Invalid User"});

    if(admin.pass!=req.body.txtPass) return res.render("./admin/adminLogin",{errMsg:"Invalid Password"});

    req.session.user=admin;
    req.session.userType="admin";

    res.redirect("/admin/allDoctor");
});

route.get('/allDoctor',async(req,res)=>{
    let doctors = await Doctor.find();
    res.render("./admin/displayDoctor");
});

module.exports = route