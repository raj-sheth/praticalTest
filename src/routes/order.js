const express = require("express");
const router = express.Router();
const { create, getAll , getDetail, update, deleteProduct} = require("../controller/order.controller");
const auth = require('../middleware/jwt');
const admin = require('../middleware/admin');
const verifyToken = require('../middleware/verifyToken');
router.post("/create",auth, create);
router.get("/", auth, getAll);
router.get("/:id", verifyToken, getDetail);
router.put("/:id",verifyToken, update);
router.delete("/:id",admin, deleteProduct);

module.exports = router;
