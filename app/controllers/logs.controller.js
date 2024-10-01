const db = require("../../app/models");
const sqlString = require("sqlstring");
const fs = require('fs');
const AuthLog = db.authLogs;
const Op = db.Sequelize.Op;
const path = require('path');
const moment = require("moment");
const { DATE } = require("sequelize");

exports.getAuthLogList = async (req, res) => {
  const handleError = () => {
    res.status(500).send({ status: "500", message: "Some error occurred while retrieve data." });
  }
  await AuthLog.findAll({attributes: ["id", "applicationName", "username", "ipAddress", "loginDate"]})
    .then((data) => {
      const AuthLogList =[]
      const jsonData = data;
      for (var i in jsonData) {
        AuthLogList.push({
          id : jsonData[i]['ID'],
          applicationName : jsonData[i]['applicationName'],
          username : jsonData[i]['username'],
          ipAddress : jsonData[i]['ipAddress'],
          loginDate : jsonData[i]['loginDate']?moment(jsonData[i]['loginDate']).format('DD-MM-YYYY (HH:mm:ss)'):"-",
        });
      }
      res.status(200).send(AuthLogList);
    })
    .catch(() => {
      handleError();
    });
};

exports.createAuthLog = (req, res) => {
  const jsonData = JSON.parse(JSON.stringify(req.body));
  const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
  const idAddress = req.ip;
  const handleError = () => {
    res.status(500).send({ status: "500", message: "Some error occurred while insert data." });
  }
  if (jsonData["appname"]) {
        const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
        const AuthLogData = {
          applicationName: jsonData["appname"],
          username: jsonData["username"],
          ipAddress: idAddress,
          loginDate: timestamp,
        };
        AuthLog.create(AuthLogData)
        .then(() => { return true;})
        .catch(() => { handleError(); });
    }
};
