const session = require('express-session');
function adminAuth(req,res,next){
    if(req.session.userType!="doctor")
        return res.render("./doctor/doctorLogin",{errMsg:"Login Require"});
    next();
}
module.exports = adminAuth;