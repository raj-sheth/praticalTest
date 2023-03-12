const express = require("express");
const router = express.Router();
const { register, login, getUser } = require("../controller/auth.controller");
const auth = require('../middleware/jwt');
const admin = require('../middleware/jwt');
router.post("/register", register);
router.post("/login", login);
router.get("/getUser",admin, getUser);

module.exports = router;
