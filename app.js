const express = require('express');
const app = express();
const doctor = require('./routes/doctor');
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/covid19Help", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("Connected to database...."))
    .catch(err => console.log("Error to connect database"));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/doctor',doctor);

app.get('/', (req, res) => {
    res.render("home");
});

app.listen(5000, () => console.log("app running on port 5000"));