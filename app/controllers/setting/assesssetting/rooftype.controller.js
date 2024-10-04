const db = require("../../../models");
const { common } = require("../../../middleware");
const sqlString = require("sqlstring");
const { console } = require("inspector");
const { log } = require("console");
exports.getRoofTypeList = async (req, res) => {
  const key = req.query["key"];
  const page = req.query["page"];
  const offset = 5 * (page - 1 <= 0 ? 0 : page - 1);
  const jsonData = [];
  let sqlCommand;
  if (key != "") {
    sqlCommand =
      "SELECT ENROOFTYPE.ID ID, ENROOFTYPE.NAME NAME, " +
      "ENROOFTYPE.DESCRIPTION DESCRIPTION, CASE WHEN ENROOFTYPE.ISACTIVE = TRUE THEN 1 ELSE 0 END AS ISACTIVE, " +
      "ENROOFTYPE.CREATORID CREATORID, ENROOFTYPE.CREATORNAME CREATORNAME, " +
      "ENROOFTYPE.CREATEDDATE CREATEDDATE, ENROOFTYPE.MODIFIEDID MODIFIEDID, " +
      "ENROOFTYPE.MODIFIEDNAME MODIFIEDNAME, ENROOFTYPE.MODIFIEDDATE MODIFIEDDATE, " +
      "ENROOFTYPE.DELETEDID DELETEDID, ENROOFTYPE.DELETEDNAME DELETEDNAME, " +
      "ENROOFTYPE.DELETEDDATE DELETEDDATE " +
      "FROM OSUSR_X6Q_ROOFTYPE ENROOFTYPE " +
      "WHERE (ENROOFTYPE.ISACTIVE = 1) AND (ENROOFTYPE.NAME LIKE '%key%') " +
      "ORDER BY ENROOFTYPE.ID DESC LIMIT 5 OFFSET @offset";
    sqlCommand = sqlCommand.replace("@key", key).replace("@offset", offset);
  } else {
    sqlCommand =
      "SELECT ENROOFTYPE.ID ID, ENROOFTYPE.NAME NAME, " +
      "ENROOFTYPE.DESCRIPTION DESCRIPTION, CASE WHEN ENROOFTYPE.ISACTIVE = TRUE THEN 1 ELSE 0 END AS ISACTIVE, " +
      "ENROOFTYPE.CREATORID CREATORID, ENROOFTYPE.CREATORNAME CREATORNAME, " +
      "ENROOFTYPE.CREATEDDATE CREATEDDATE, ENROOFTYPE.MODIFIEDID MODIFIEDID, " +
      "ENROOFTYPE.MODIFIEDNAME MODIFIEDNAME, ENROOFTYPE.MODIFIEDDATE MODIFIEDDATE, " +
      "ENROOFTYPE.DELETEDID DELETEDID, ENROOFTYPE.DELETEDNAME DELETEDNAME, " +
      "ENROOFTYPE.DELETEDDATE DELETEDDATE " +
      "FROM OSUSR_X6Q_ROOFTYPE ENROOFTYPE " +
      "WHERE (ENROOFTYPE.ISACTIVE = 1) " +
      "ORDER BY ENROOFTYPE.ID DESC LIMIT 5 OFFSET @offset";
    sqlCommand = sqlCommand.replace("@offset", offset);
  }
  let countsql;
  if (key != "") {
    countsql =
      "SELECT COUNT(ENROOFTYPE.ID) AS Count " +
      "FROM OSUSR_X6Q_ROOFTYPE ENROOFTYPE " +
      "WHERE (ENROOFTYPE.ISACTIVE = 1) AND (ENROOFTYPE.NAME LIKE '%key%') " +
      "ORDER BY ENROOFTYPE.ID DESC";
    countsql = countsql.replace("@key", key).replace("@key", key);
  } else {
    countsql =
      "SELECT COUNT(ENROOFTYPE.ID) AS Count " +
      "FROM OSUSR_X6Q_ROOFTYPE ENROOFTYPE " +
      "WHERE (ENROOFTYPE.ISACTIVE = 1) " +
      "ORDER BY ENROOFTYPE.ID DESC";
  }
  const totaldata = await db.sequelize
    .query(countsql, { type: db.Sequelize.QueryTypes.SELECT })
    .then((data) => {
      return data[0]["Count"];
    })
    .catch(() => {
      res.status(500).send();
    });
  await db.sequelize
    .query(sqlCommand, { type: db.Sequelize.QueryTypes.SELECT })
    .then(async (data) => {
      const item = [];
      let i = 0;
      let createdate, modifydate, deletedate;
      while (i in data) {
        createdate = String(
          new Date(data[i].CREATEDDATE)
            .toISOString()
            .slice(0, 10)
            .split("-")
            .reverse()
            .join("/")
        );
        modifydate = String(
          new Date(data[i].MODIFIEDDATE)
            .toISOString()
            .slice(0, 10)
            .split("-")
            .reverse()
            .join("/")
        );
        deletedate = String(
          new Date(data[i].DELETEDDATE)
            .toISOString()
            .slice(0, 10)
            .split("-")
            .reverse()
            .join("/")
        );
        item.push({
          id: data[i].ID,
          no: offset + (i + 1),
          name: data[i].NAME,
          description: data[i].DESCRIPTION,
          isactive: data[i].ISACTIVE == "1" ? true : false,
          creatorid: data[i].CREATORID,
          creatorname: data[i].CREATORNAME,
          createddate: createdate
            .replace("01/01/1900", "")
            .replace("01/01/1970", ""),
          modifiedid: data[i].MODIFIEDID,
          modifiedname: data[i].MODIFIEDNAME,
          modifieddate: modifydate
            .replace("01/01/1900", "")
            .replace("01/01/1970", ""),
          deletedid: data[i].DELETEDID,
          deletedname: data[i].DELETEDNAME,
          deleteddate: deletedate
            .replace("01/01/1900", "")
            .replace("01/01/1970", ""),
        });
        i++;
      }
      jsonData.push({ data: item, totaldata: totaldata });
    })
    .catch((e) => {
      res.status(500).send("error");
    });
  return res.status(200).send(jsonData);
};
exports.updateRoofTypeById = async (req, res) => {
  const jsonData = JSON.parse(JSON.stringify(req.body));
  const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
  const sqlCommand = "UPDATE OSUSR_X6Q_ROOFTYPE SET ? WHERE ? ";
  let sdatecreate, sdatedelete;
  if (jsonData.data[0].createddate.trim() != "") {
    sdatecreate = jsonData.data[0].createddate.split("/");
  }
  if (jsonData.data[0].deleteddate.trim() != "") {
    sdatedelete = jsonData.data[0].deleteddate.split("/");
  }
  const id = { ID: jsonData.data[0].id };
  const data = {
    NAME: jsonData.data[0].name,
    DESCRIPTION: jsonData.data[0].description,
    ISACTIVE: jsonData.data[0].isactive,
    CREATORID: jsonData.data[0].creatorid,
    CREATORNAME: jsonData.data[0].creatorname,
    CREATEDDATE:
      jsonData.data[0].createddate == ""
        ? null
        : new Date(
            sdatecreate[2] + "/" + sdatecreate[1] + "/" + sdatecreate[0]
          ),
    MODIFIEDID: jsonData.data[0].modifiedid,
    MODIFIEDNAME: jsonData.data[0].modifiedname,
    MODIFIEDDATE: timestamp,
    DELETEDID: jsonData.data[0].deletedid,
    DELETEDNAME: jsonData.data[0].deletedname,
    DELETEDDATE:
      jsonData.data[0].deleteddate == ""
        ? null
        : new Date(
            sdatedelete[2] + "/" + sdatedelete[1] + "/" + sdatedelete[0]
          ),
  };
  await db.sequelize
    .query(sqlString.format(sqlCommand, [data, id]), {
      type: db.Sequelize.QueryTypes.UPDATE,
    })
    .then(() => {
      return res.status(200).send("ok");
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
};
exports.deleteRoofTypeById = async (req, res) => {
  const jsonData = JSON.parse(JSON.stringify(req.body));
  const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
  const sqlCommand = "UPDATE OSUSR_X6Q_ROOFTYPE SET ? WHERE ? ";
  let sdatecreate, sdatemodify;
  if (jsonData.data[0].createddate.trim() != "") {
    sdatecreate = jsonData.data[0].createddate.split("/");
  }
  if (jsonData.data[0].modifieddate.trim() != "") {
    sdatemodify = jsonData.data[0].modifieddate.split("/");
  }
  const id = { ID: jsonData.data[0].id };
  const data = {
    NAME: jsonData.data[0].name,
    DESCRIPTION: jsonData.data[0].description,
    ISACTIVE: jsonData.data[0].isactive,
    CREATORID: jsonData.data[0].creatorid,
    CREATORNAME: jsonData.data[0].creatorname,
    CREATEDDATE:
      jsonData.data[0].createddate == ""
        ? null
        : new Date(
            sdatecreate[2] + "/" + sdatecreate[1] + "/" + sdatecreate[0]
          ),
    MODIFIEDID: jsonData.data[0].modifiedid,
    MODIFIEDNAME: jsonData.data[0].modifiedname,
    MODIFIEDDATE:
      jsonData.data[0].modifieddate == ""
        ? null
        : new Date(
            sdatemodify[2] + "/" + sdatemodify[1] + "/" + sdatemodify[0]
          ),
    DELETEDID: jsonData.data[0].deletedid,
    DELETEDNAME: jsonData.data[0].deletedname,
    DELETEDDATE: timestamp,
  };
  await db.sequelize
    .query(sqlString.format(sqlCommand, [data, id]), {
      type: db.Sequelize.QueryTypes.UPDATE,
    })
    .then(() => {
      return res.status(200).send("ok");
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
};
exports.insertRoofType = async (req, res) => {
  const jsonData = JSON.parse(JSON.stringify(req.body));
  const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
  const sqlCommand = "INSERT INTO OSUSR_X6Q_ROOFTYPE SET ? ";

  const data = {
    NAME: jsonData.data[0].name,
    DESCRIPTION: jsonData.data[0].description,
    ISACTIVE: true,
    CREATORID: jsonData.data[0].creatorid,
    CREATORNAME: jsonData.data[0].creatorname,
    CREATEDDATE: timestamp,
    MODIFIEDID: jsonData.data[0].modifiedid,
    MODIFIEDNAME: jsonData.data[0].modifiedname,
    MODIFIEDDATE: null,
    DELETEDID: jsonData.data[0].deletedid,
    DELETEDNAME: jsonData.data[0].deletedname,
    DELETEDDATE: null,
  };
  await db.sequelize
    .query(sqlString.format(sqlCommand, data), {
      type: db.Sequelize.QueryTypes.INSERT,
    })
    .then(() => {
      return res.status(200).send("ok");
    })
    .catch((err) => {
      return res.status(500).send(err);
    });
};
