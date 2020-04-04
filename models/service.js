const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({    
    nameOfOrg: {
        type: String,
        required: true
    },
    contactPersonName: {
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
    city:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    service : {
        type: String,
        required: true,
        maxlength:30
    },
    serviceDetails: {
        type: String,
    },
    areaOfService:{
        type:String,
        required:true
    },
    status:{
        type:Number,
        default:0
        //0 - new
        //1 - selected
    },
});

const Service = new mongoose.model("Service", serviceSchema);
exports.Service = Service;