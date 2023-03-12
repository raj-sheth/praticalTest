const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
/**
 * Register the User with name, email and password
 * @param {*} req
 * @param {*} res
 */
const register = async (req, res) => {
  try {
    let { params } = req.body;

    const existingUser = await userModel.findOne({ mobileNo: params.mobileNo });
    if (existingUser) {
      return res.status(409).json({ message: "Mobile Number already exists" });
    }
    params.password = await bcrypt.hash(params.password, 5);
    await userModel.create(params);
    res.json({
      statusCode: 200,
      message: "user Created Successfully",
      data: [],
    });
  } catch (err) {
    res.json({
      statusCode: 500,
      message: "Something went Wrong",
      data: err,
    });
  }
};



/**
 * login the user with email and password
 * @param {*} req
 * @param {*} res
 */
const login = async (req, res) => {
  try {
    const { params } = req.body;
    
    let userData = await userModel.findOne({
      mobileNo: params.mobileNo,
    });
    if (userData) {
      let decryptedPassword = await bcrypt.compare(
        params.password,
        userData.password
      );
      if (decryptedPassword) {
        let token = jwt.sign({ mobileNo: userData.mobileNo }, "Pratical");
        res.json({
          statusCode: 200,
          message: "Login Successfull",
          data: token,
        });
      } else {
        res.json({
          statusCode: 400,
          message: "Invalid Password and Email",
          data: [],
        });
      }
    }
  } catch (err) {
    res.json({
      statusCode: 500,
      message: "Something went Wrong",
      data: err,
    });
  }
};

/**
 * Genrate the excel sheet of User data
 * @param {*} req 
 * @param {*} res 
 */
const getUser = async (req, res) => {
  try {
    let userData = await userModel.find({isDelete:0}).lean();
    
    if (!userData) {
      res.json({
        statusCode: 404,
        message: "User Not Found",
        data: [],
      });
    }else{
      res.json({
        statusCode: 200,
        message: "User List Get Successfully",
        data: userData,
      });
    }
  } catch (err) {
    res.json({
      statusCode: 500,
      message: "Something went Wrong",
      data: err,
    });
  }
};

module.exports = {
  register,
  login,
  getUser,
};
