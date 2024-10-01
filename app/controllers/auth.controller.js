const db = require("../../app/models");
const Users = db.outsourceAccount;
const Application = db.outsourceApplication;
const Logs = require("../controllers/logs.controller")
const md5 = require('md5');
require("dotenv").config();
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
exports.signSystem = (req, res) => {
  const username = req.body.username;
  const appName = req.body.appname;
  console.log(appName);
  return false;
  var condition = { username: username, isActive : 1};
  var conditionApp = { applicationName : appName, isDeleted : 0};
  const salt = bcrypt.genSaltSync(10);
  const handleNotValid = () => {
    res.status(401).send({ status: "401", message: "Invalid Password." });
  }
  const handleNotFound = () => {
    res.status(401).send({ status: "401", message: "User not found." });
  }
  const handleError = () => {
    res.status(500).send({ status: "500", message: "Some error occurred while Retrieve Data." });
  }
  Application.findOne({
    attributes: ["applicationName"],
    where: conditionApp,
  }).then(async(data) =>{
    const jsonData = JSON.parse(JSON.stringify(data));
    if (!jsonData) {
      return handleNotFound();
    }
    await db.sequelize
    .query(
      "SELECT U.ID, U.username, U.password, U.isActive FROM outsourceAccount U LEFT JOIN outsourceApplication A ON U.applicationId = A.ID "+
      "WHERE U.username = '" + username + "' AND U.isActive = 1 AND A.applicationName = 'BIZ Portal'", { type: db.Sequelize.QueryTypes.SELECT }
    )
    .then((data) => {
      console.log(jsonData);
      if (!jsonData) {
        return handleNotFound();
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        jsonData['password']
      );
      if (!passwordIsValid) {
        return handleNotValid();
      }
      var token = jwt.sign({ id: jsonData['ID'], level: jsonData['isActive']}, process.env.JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: 86400, // 24 hours
      });
      Logs.createAuthLog(req,res);
      res.status(200).send({
        status: 200,
        level: jsonData['isActive']?"normal":"guest",
        api_token: token
      });
    })
  })
  .catch(() => {
    handleNotFound();
  });
};
exports.verifyToken = (req, res) => {
  const handleError = () => {
    res.status(500).send({ status: "500", message: "Some error occurred while Retrieve Data." });
  }
  try {
    const token = req.headers["authorization"].replace("Bearer ", "");
    res.status(200).send({
      api_token: token,
    });
  } catch (err) {
    handleError();
  }
};