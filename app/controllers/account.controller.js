const db = require("../../app/models");
const { common } = require("../middleware");
const fs = require("fs");
const Users = db.outsourceAccount;
const Op = db.Sequelize.Op;
const path = require("path");
const moment = require("moment");
const { DATE } = require("sequelize");

exports.accountMenuProfile = async (req, res) => {
  const id = common.getUID(req, res);
  var condition = { ID: id, isActive : 1};
  const handleEmpty = () => {
    res.status(401).send({ status: "401", message: "Data not found." });
  };
  const handleError = () => {
    res.status(500).send({status: "500", message: "Some error occurred while retrieve data." });
  };
  Users.findOne({ attributes: ["firstname","lastname","email"], where: condition })
    .then((data) => {
      const jsonData = JSON.parse(JSON.stringify(data));
      if (!jsonData) {
        return handleEmpty();
      }
      data = {
        firstnameTh: jsonData["firstname"] ? jsonData["firstname"] : "-",
        lastnameTh: jsonData["lastname"] ? jsonData["lastname"] : "-",
        email: jsonData["email"] ? jsonData["email"] : "-",
        image: "",
      };
      res.status(200).send(data);
    })
    .catch((e) => {console.log(e);
      handleError();
    });
};