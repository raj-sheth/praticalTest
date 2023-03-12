const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  orderStatus: {
    type: String,
    enum: ["NEW", "PENDING", "SHIPPED"],
    default: "NEW",
  },
  orderCode: String,
  requiredDate: String,
  shippedDate: String,
  productId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  orderDate: String,
  quantity: {
    type: String,
  },
  isDelete:{
    type:Number,
    enum:[0, 1],
    default:0
  }
});
orderSchema.plugin(timestamps);

module.exports = mongoose.model("orders", orderSchema);
