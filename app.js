const express = require('express');
const app = express();
const doctor = require('./routes/doctor.js');
const admin = require('./routes/admin.js');
const patient = require('./routes/patient.js');
const service = require('./routes/service.js');
const mongoose = require("mongoose");
const session = require('express-session');

mongoose.connect("mongodb://localhost/covid19Help", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("Connected to database...."))
    .catch(err => console.log("Error to connect database"));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session({secret: "Shh, its a secret!",resave: true,saveUninitialized: true,cookie: {maxAge:86400}}));

app.use('/doctor',doctor);
app.use('/admin',admin);
app.use('/patient',patient);
app.use('/service',service);

app.get('/', (req, res) => {
    res.render("home",{err:req.session.error,succ:req.session.sucess});
    req.session.error="";
    req.session.sucess="";
});

app.listen(5000, () => console.log("app running on port 5000"));