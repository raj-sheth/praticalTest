const mongoose = require("mongoose");
const timestamps = require('mongoose-timestamp');
const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  size: {
    type: String,
  },
  colour:{
    type:String,
  },
  price:{
    type:String,
  },
  quantity: {
    type: String,
  },
  images:[{
    type:String
  }],
  isDelete:{
    type:Number,
    enum:[0, 1], // 1:deleted , 0:not deleted
    default:0
  }
});
productSchema.plugin(timestamps);

module.exports = mongoose.model("products", productSchema);
