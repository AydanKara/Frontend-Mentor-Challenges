const express = require("express");
const serverless =  require("serverless-http");
const api = express();

const path = require("path");
const authRoutes = require("./routes/auth.routes");

api.set("view engine", "ejs");
api.set("views", path.join(__dirname, "views"));

api.use(authRoutes);

api.listen(9000);

module.exports.handler = serverless(api);
