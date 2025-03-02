const express = require("express");
const serverless =  require("serverless-http");
const api = express();
/* const router = express.Router(); */

const path = require("path");
const authRoutes = require("./routes/auth.routes");

api.set("view engine", "ejs");
api.set("views", path.join(__dirname, "views"));

api.use(authRoutes);

/* router.get('/demo', (req, res) => {
    res.json([
      {
        id: '001',
        name: 'Smith',
        email: 'smith@gmail.com',
      },
      {
        id: '002',
        name: 'Sam',
        email: 'sam@gmail.com',
      },
      {
        id: '003',
        name: 'lily',
        email: 'lily@gmail.com',
      },
    ]);
  });
  
api.use('/.netlify/functions/api', router); */

api.listen(3000);

module.exports.handler = serverless(api);
