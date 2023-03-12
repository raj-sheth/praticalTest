const jwt = require('jsonwebtoken');
const userModel = require("../models/user.model");

module.exports = async function auth(req, res, next) {
    const token =  req.headers.authorization;
    if(!token) {
        res.json({
            statusCode:400,
            message:"Access Denied"
        })
    }    
    try{
        const verified = jwt.verify(token, "Pratical");
        let userData = await userModel.findOne({mobileNo:verified.mobileNo, isDelete:0})
        if (userData) {     
            req.user = userData._id;
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

