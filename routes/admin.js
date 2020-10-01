const express = require("express");
const route = express.Router();
const nodemailer = require('nodemailer');
const randomstring = require("randomstring");
require('dotenv').config()

const adminAuth = require("../middleware/adminAuth.js");

const { Admin } = require("../models/admin.js");
const { Doctor } = require("../models/doctor.js");
const { Patient } = require("../models/patient.js");
const { Service } = require("../models/service.js");

route.get("/", (req, res) => {
  res.render("./admin/adminLogin");
});

route.post("/", async (req, res) => {  
  let admin = await Admin.findOne({ email: req.body.txtEmail });
  if (!admin) return res.render("./admin/adminLogin", { errMsg: "Invalid User" });

  if (admin.pass != req.body.txtPass) return res.render("./admin/adminLogin", { errMsg: "Invalid Password" });

  req.session.user = admin;
  req.session.userType = "admin";

  res.redirect("/admin/allDoctor");
});

route.get('/allAdmin',async (req,res)=>{
  // const newAdmin = new Admin({
  //   name:"jk",
  //   email:"Admin@admin.com",
  //   pass:"1234"
  // });
  // newAdmin.save();
  let admin = await Admin.find({});
  res.send(admin);
})

route.get('/allDoctor', adminAuth, async (req, res) => {
  let doctors = await Doctor.find({ status: 0 });
  let cnt = doctors.length;
  res.render("./admin/displayDoctor", { title: "Doctor List", data: doctors, link: 2, count: cnt });
  //link=2 display select and reject button
});

route.get('/selectedDoctor', adminAuth, async (req, res) => {
  let doctors = await Doctor.find({ status: 1 });
  let cnt = doctors.length;
  res.render("./admin/displayDoctor", { title: "Selected Doctor List", data: doctors, link: 1, count: cnt });
  //link=1 display reject button
});

route.get('/rejectedDoctor', adminAuth, async (req, res) => {
  let doctors = await Doctor.find({ status: 2 });
  let cnt = doctors.length;
  res.render("./admin/displayDoctor", { title: "Rejected Doctor List", data: doctors, link: 0, count: cnt });
  //link=2 display select button
});

route.get('/select/:id', adminAuth, async (req, res) => {
  let doctorData = await Doctor.findOne({ _id: req.params.id });

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
  });
  const randPass = randomstring.generate({ length: 12 });

  var mailOptions = {
    from: process.env.USER,
    to: doctorData.email,
    subject: 'Confirmation From Covid19Help',
    text: 'Thank You for your registration your user name is your registed Email and password is : ' + randPass
  };

  transporter.sendMail(mailOptions,async function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      let doctor = await Doctor.updateOne({ _id: req.params.id }, { status: 1, pass: randPass });
      res.redirect("/admin/allDoctor");
    }    
  });
});

route.get('/reject/:id', adminAuth, async (req, res) => {
  let doctor = await Doctor.updateOne({ _id: req.params.id }, { status: 2 });
  res.redirect("/admin/allDoctor");
});


route.get('/patientList', adminAuth, async (req, res) => {
  let patient = await Patient.find();

  let pendingCase = await Patient.count({ status: 0 });
  let completeCase = await Patient.count({ status: 1 });
  let cnt = patient.length;

  res.render("./admin/patientList", {
    data: patient, total: cnt
    , pendingCase: pendingCase, completeCase: completeCase
  });
});

route.get('/serviceList', adminAuth, async (req, res) => {
  let service = await Service.find({ status: 0 });
  let cnt = service.length;
  res.render("./admin/serviceList", { title: "Service List", data: service, link: 2, count: cnt });
  //link=2 display select and reject button
});

route.get('/selectedService', adminAuth, async (req, res) => {
  let service = await Service.find({ status: 1 });
  let cnt = service.length;
  res.render("./admin/serviceList", { title: "Selected Service List", data: service, link: 1, count: cnt });
  //link=1 display reject button
});

route.get('/rejectedService', adminAuth, async (req, res) => {
  let service = await Service.find({ status: 2 });
  let cnt = service.length;
  res.render("./admin/serviceList", { title: "Rejected Service List", data: service, link: 0, count: cnt });
  //link=0 display select button
});

route.get('/selectService/:id', adminAuth, async (req, res) => {
  let service = await Service.updateOne({ _id: req.params.id }, { status: 1 });
  res.redirect("/admin/serviceList");
});

route.get('/rejectService/:id', adminAuth, async (req, res) => {
  let service = await Service.updateOne({ _id: req.params.id }, { status: 2 });
  res.redirect("/admin/serviceList");
});

route.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin');
});

module.exports = route