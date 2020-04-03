const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    age:{
        type:Number
    },
    disease : {
        type: String,
        required: true,
        maxlength:30
    },
    diseaseDetails: {
        type: String,
    },
    //new disease or long-time disease
    fromDays:{
        type:String,
        required:true
    },
    doctorId:{
        type:String,
    },
    rejectedDoctorId:{
        type:[String],
    },
    status:{
        type:Number,
        default:0
        //0 - new
        //1 - completed
    },
});

const Patient = new mongoose.model("Patient", patientSchema);
exports.Patient = Patient;