const jwt = require('jsonwebtoken');
const userModel = require("../models/user.model");

module.exports = async function verifyToken(req, res, next){
    const token =  req.headers.authorization;
  
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
  
    jwt.verify(token, "Pratical", (err, decoded) => {
      if (err) {
        return catchError(err, res);
      }
      req.userId = decoded.id;
      next();
    });
  };