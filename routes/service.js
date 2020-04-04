const express = require("express");
const route = express.Router();
const {Service} = require("../models/service.js")

route.get('/',(req,res)=>{
    res.render("service");
});

route.post('/',async(req,res)=>{
    const newService = new Service({
        nameOfOrg:req.body.txtNameOfOrg,
        contactPersonName:req.body.txtContactPersonName,        
        mobile:req.body.txtMobile,
        state:req.body.txtState,
        city:req.body.txtCity,
        category:req.body.txtCategory,
        service:req.body.txtService,
        serviceDetails:req.body.txtServiceDetails,
        areaOfService:req.body.txtAreaOfService
    });
    newService.save((err,result)=>{
        if (err){
            console.log(err);
            req.session.error = 'Somthing goes wrong try again after sometime';}
        else
            req.session.sucess = 'Thank You! for registration';
        
        res.redirect('/');
    });
});

module.exports = route;