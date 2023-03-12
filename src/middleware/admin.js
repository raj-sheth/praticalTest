const jwt = require('jsonwebtoken');
const userModel = require("../models/user.model");

module.exports = async function admin(req, res, next) {
    const token =  req.headers.authorization;
    if(!token) {
        res.json({
            statusCode:400,
            message:"Access Denied"
        })
    }    
    try{
        const verified = jwt.verify(token, "Pratical");
        let adminData = await userModel.findOne({mobileNo:verified.mobileNo, role:'admin'});
        if (adminData) {     
            req.user = adminData;
            next();
        }else{
            res.json({
                statusCode:400,
                message:"Authentication Failed"
            })
        }
    } catch(err){
        res.json({
            statusCode:400,
            message:"Authentication Failed"
        })
    }
}