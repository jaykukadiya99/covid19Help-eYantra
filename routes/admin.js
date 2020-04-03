const express = require("express");
const route = express.Router();
const nodemailer = require('nodemailer');
const randomstring = require("randomstring");
require('dotenv').config()

const adminAuth = require("../middleware/adminAuth.js");

const { Admin } = require("../models/admin.js");
const { Doctor } = require("../models/doctor.js");

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

route.get('/allDoctor', adminAuth, async (req, res) => {
  let doctors = await Doctor.find({ status: 0 });
  res.render("./admin/displayDoctor", { title: "Doctor List", data: doctors, link: 2 });

  //link=2 display select and reject button
});

route.get('/selectedDoctor', adminAuth, async (req, res) => {
  let doctors = await Doctor.find({ status: 1 });
  res.render("./admin/displayDoctor", { title: "Selected Doctor List", data: doctors, link: 1 });
  //link=1 display reject button
});

route.get('/rejectedDoctor', adminAuth, async (req, res) => {
  let doctors = await Doctor.find({ status: 2 });
  res.render("./admin/displayDoctor", { title: "Rejected Doctor List", data: doctors, link: 0 });
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

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      let doctor = Doctor.updateOne({ _id: req.params.id }, { status: 1, pass: randPass });
    }
  });
  res.redirect("/admin/allDoctor");
});

route.get('/reject/:id', adminAuth, async (req, res) => {
  let doctor = await Doctor.updateOne({ _id: req.params.id }, { status: 2 });
  res.redirect("/admin/allDoctor");
});

route.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/admin');
});

module.exports = route