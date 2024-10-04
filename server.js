const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
var corsOptions = { origin: "*" };
const db = require("./app/models");
db.sequelize.sync({ force: false });
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("./app/routes/auth.routes")(app);
require("./app/routes/account.routes")(app);
////setting////
////customersetting////
require("./app/routes/setting/customersetting/customerprefix.routes")(app);
require("./app/routes/setting/customersetting/customertype.routes")(app);
require("./app/routes/setting/customersetting/customerpayment.routes")(app);
require("./app/routes/setting/customersetting/customeraddresstype.routes")(app);
////
////access////
require("./app/routes/setting/assesssetting/customeraddresstype.routes")(app);
////
app.set("trust proxy", true);
app.all("*", (req, res) => {
  res.status(404).send("404 Not Found");
});
require("dotenv").config();
let port = process.env.SERVER_PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
