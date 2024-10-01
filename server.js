const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()
var corsOptions = { origin:'*'};
const db = require("./app/models");
db.sequelize.sync({force: false});
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('./app/routes/auth.routes')(app);
require('./app/routes/account.routes')(app);
//setting//
require('./app/routes/setting/customerprefix.routes')(app);
//
app.set('trust proxy', true);
app.all('*',(req,res)=>{res.status(404).send("404 Not Found")})
require("dotenv").config()
let port = process.env.SERVER_PORT
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
