const express = require("express");
const route = express.Router();
const { Service } = require("../models/service.js")
const nodemailer = require('nodemailer');
require('dotenv').config()

route.get('/', (req, res) => {
    res.render("service");
});

route.post('/', async (req, res) => {
    const newService = new Service({
        nameOfOrg: req.body.txtNameOfOrg,
        contactPersonName: req.body.txtContactPersonName,
        mobile: req.body.txtMobile,
        state: req.body.txtState,
        city: req.body.txtCity,
        category: req.body.txtCategory,
        service: req.body.txtService,
        serviceDetails: req.body.txtServiceDetails,
        areaOfService: req.body.txtAreaOfService
    });
    newService.save((err, result) => {
        if (err) {
            console.log(err);
            req.session.error = 'Somthing goes wrong try again after sometime';
        }
        else
            req.session.sucess = 'Thank You! for registration';

        res.redirect('/');
    });
});


//display list for need service
route.get("/getAll", async (req, res) => {
    let service = await Service.find({ status: 1 });
    let cnt = service.length;
    res.render("serviceList", { title: "Service List", data: service, count: cnt });
});

route.get("/sendMail/:id/:email",async(req,res)=>{

    let service = await Service.findOne({ _id: req.params.id });

    const msg = "<h1>Your Requested Details</h1><table border='1'> <tr> <td> Name of Organization.</td> <td>"+ service.nameOfOrg +"</td> </tr> <tr> <td> Mobile No.</td> <td>"+ service.mobile +"</td> </tr> <tr> <td> State </td> <td>"+ service.state +"</td> </tr> <tr> <td> Type of Service </td> <td>"+ service.category +"</td> </tr> <tr> <td> Service </td> <td>"+ service.service +"</td> </tr> <tr> <td> Service Details</td> <td>"+ service.serviceDetails +"</td> </tr> </table>";

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER,
          pass: process.env.PASS
        }
      });

      var mailOptions = {
        from: process.env.USER,
        to: req.params.email,
        subject: 'Service Details From Covid19-Help',
        html: msg
      };
    
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.send("error");
        } else {
          console.log('Email sent: ' + info.response);
          res.send("mailsend");
        }
      });
})

module.exports = route;