const express = require("express");
const router = express.Router();
const { create, getAll, getDetail, update, deleteProduct } = require("../controller/product.controller");
const auth = require('../middleware/jwt');
const admin = require('../middleware/admin');
const verifyToken =require('../middleware/verifyToken');
router.post("/create", admin,create);
router.get("/",verifyToken, getAll);
router.get("/:id", verifyToken, getDetail);
router.put("/:id",admin, update);
router.delete("/:id", admin, deleteProduct);

module.exports = router;
