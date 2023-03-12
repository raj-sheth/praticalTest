const mongoose = require("mongoose");
const timestamps = require('mongoose-timestamp');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  role:{
    type:String,
  },
  mobileNo:{
    unique:true,
    type:String,
    required:true
  },
  password: {
    type: String,
  },
  isDelete:{
    type:Number,
    enum:[0, 1],
    default:0
  }
});
userSchema.plugin(timestamps);

module.exports = mongoose.model("users", userSchema);
