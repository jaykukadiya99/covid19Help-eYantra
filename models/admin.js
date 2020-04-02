const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    pass:{
        type: String,
        required: true
    }
});

const Admin = new mongoose.model("Admin",adminSchema);
exports.Admin = Admin;