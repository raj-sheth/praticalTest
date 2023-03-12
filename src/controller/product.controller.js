const productModel = require("../models/product.model");
const path = require("path");
/**
 * Create the product with his Data
 * @param {*} req
 * @param {*} res
 */
const create = async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).send("No files were uploaded.");
    }
    const images = req.files.images;
    const extensionName = path.extname(images.name); // fetch the file extension
    const allowedExtension = [".png", ".jpg", ".jpeg"];

    if (!allowedExtension.includes(extensionName)) {
      return res.status(422).send("Invalid Image");
    }
    const path1 = __dirname + "/../files/" + images.name;
    images.mv(path1, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
    });

    // Create a Product
    const product = new productModel({
      name: req.body.name,
      size: req.body.size,
      images: images.name,
      colour: req.body.colour,
      price: req.body.price,
      quantity: req.body.quantity,
    });

    // Save Product in the database
    product
      .save(product)
      .then((data) => {
        res.json({
          statusCode: 200,
          message: "Product Created Successfully",
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Product.",
        });
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
 * Get the List of the product
 * @param {*} req
 * @param {*} res
 */
const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", sort = "name" } = req.query;
    const skip = (page - 1) * limit;

    const regex = new RegExp(search, "i");
    const total = await productModel.countDocuments({ name: regex });
    const products = await productModel
      .find({ name: regex })
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const nextPage = hasNextPage ? parseInt(page) + 1 : null;

    res.json({
      statusCode: 200,
      message: "Product get successfully",
      products,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages,
        hasNextPage,
        nextPage,
      },
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
 * Get the Product Detail By Id
 * @param {*} req
 * @param {*} res
 */
const getDetail = async (req, res) => {
  try {
    const id = req.params.id;
    let data = await productModel.findById(id);
    if (data) {
      res.json({
        statusCode: 200,
        message: "Product get successfully",
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
 * Update the Product Data
 * @param {*} req
 * @param {*} res
 */
const update = async (req, res) => {
  try {
    const id = req.params.id;
    let updatedData = await productModel.findByIdAndUpdate(id, req.body, {
      new: true,
      upsert: true,
    });
    if (updatedData) {
      res.json({
        statusCode: 200,
        message: "Product Updated  successfully",
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
 * Delete the Particular Product By Admin
 * @param {*} req 
 * @param {*} res 
 */
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    let DeletedData = await productModel.findByIdAndUpdate(id, {isDelete:1}, {
      new: true,
    });
    if (DeletedData) {
      res.json({
        statusCode: 200,
        message: "Product Deleted successfully",
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
  deleteProduct
};
