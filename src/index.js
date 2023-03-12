const express = require("express");
const app = express();
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

var bodyParser = require("body-parser");

const router = require("./routes/index");

// parse application/json
app.use(bodyParser.json());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    createParentPath: true,
  })
);
mongoose
  .connect("mongodb://127.0.0.1:27017/praticalDb")
  .catch("Database not connected");

app.use("/", router);

app.listen(3010, () => {
  console.log("Server started successfully");
});
