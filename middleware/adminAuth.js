const session = require('express-session');
function adminAuth(req,res,next){
    if(req.session.userType!="admin")
        return res.render("./admin/adminLogin",{errMsg:"Login Require"});
    next();
}
module.exports = adminAuth;