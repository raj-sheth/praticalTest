const orderModel = require("../models/order.model");
const path = require("path");
/**
 * Create the Order and Store to DB
 * @param {*} req
 * @param {*} res
 */
const create = async (req, res) => {
  try {
    let user = req.user;

    // Create a Order
    const order = new orderModel({
      userId: user,
      productId: req.body.productId,
      quantity: req.body.quantity,
      orderCode: "ord" + Math.floor(Math.random() * 10000),
      orderDate: req.body.orderDate,
      requiredDate: req.body.requiredDate,
      shippedDate: req.body.shippedDate,
    });
    let orderData = await order.save();
    res.json({
      statusCode: 200,
      message: "Product Created Successfully",
      data: orderData,
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
 * Get the List of the Order
 * @param {*} req
 * @param {*} res
 */
const getAll = async (req, res) => {
  try {
    let user = req.user;
    let orderData = await orderModel.find({ userId: user, isDelete: 0 });
    res.json({
      statusCode: 200,
      message: "Orders get successfully",
      data: orderData,
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
 * Get the Order Detail By Id
 * @param {*} req
 * @param {*} res
 */
const getDetail = async (req, res) => {
  try {
    const id = req.params.id;
    let data = await orderModel.findById(id);
    if (data) {
      res.json({
        statusCode: 200,
        message: "Order Detail get successfully",
        data: data,
      });
    } else {
      res.json({
        statusCode: 404,
        message: "Data not found",
        data: [],
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

/**
 * Update the Order Data
 * @param {*} req
 * @param {*} res
 */
const update = async (req, res) => {
  try {
    const id = req.params.id;
    let updatedData = await orderModel.findByIdAndUpdate(id, req.body, {
      new: true,
      upsert: true,
    });
    if (updatedData) {
      res.json({
        statusCode: 200,
        message: "Order Updated  successfully",
        data: updatedData,
      });
    } else {
      res.json({
        statusCode: 404,
        message: "Data not found",
        data: [],
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

/**
 * Delete the Particular Order By Admin
 * @param {*} req
 * @param {*} res
 */
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    let DeletedData = await orderModel.findByIdAndUpdate(
      id,
      { isDelete: 1 },
      {
        new: true,
      }
    );
    if (DeletedData) {
      res.json({
        statusCode: 200,
        message: "order Deleted successfully",
        data: DeletedData,
      });
    } else {
      res.json({
        statusCode: 404,
        message: "Data not found",
        data: [],
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
  create,
    getAll,
    getDetail,
    update,
    deleteProduct,
};
