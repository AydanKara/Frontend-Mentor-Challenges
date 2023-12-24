const serverless =  require("serverless-http");

const path = require("path");
const express = require("express");
const authRoutes = require("../routes/auth.routes");

const api = express();

api.set("view engine", "ejs");
api.set("views", path.join(__dirname, "views"));
api.use(authRoutes);

api.listen(9000);

module.exports.handler = serverless(api);
