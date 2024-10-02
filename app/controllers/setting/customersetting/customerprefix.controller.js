const db = require("../../../models");
const { common } = require("../../../middleware");
const sqlString = require("sqlstring");
const { console } = require("inspector");
const { log } = require("console");
exports.getPrefixList = async (req, res) => {
  const key = req.query["key"];
  const page = req.query["page"];
  const offset = 5 * (page - 1 <= 0 ? 0 : page - 1);
  const jsonData = [];
  let sqlCommand;
  if (key != "") {
    sqlCommand =
      "SELECT ENCUSTOMERPREFIX.ID ID, ENCUSTOMERPREFIX.TEXT TEXT, " +
      "CASE WHEN ENCUSTOMERPREFIX.ISACTIVE = TRUE THEN 1 ELSE 0 END AS ISACTIVE, ENCUSTOMERPREFIX.CREATORID CREATORID, " +
      "ENCUSTOMERPREFIX.CREATORNAME CREATORNAME, ENCUSTOMERPREFIX.CREATEDDATE CREATEDDATE, " +
      "ENCUSTOMERPREFIX.MODIFIEDID MODIFIEDID, ENCUSTOMERPREFIX.MODIFIEDNAME MODIFIEDNAME, " +
      "ENCUSTOMERPREFIX.MODIFIEDDATE MODIFIEDDATE " +
      "FROM (OSUSR_X6Q_CUSTOMERPREFIX ENCUSTOMERPREFIX " +
      "LEFT JOIN OSUSR_X6Q_CUSTOMERTYPE ENCUSTOMERTYPESTATIC ON (ENCUSTOMERPREFIX.CUSTOMERTYPESTATICID = ENCUSTOMERTYPESTATIC.ID)) " +
      "WHERE (ENCUSTOMERPREFIX.ISACTIVE = 1) AND ENCUSTOMERPREFIX.TEXT LIKE '%@key%' " +
      "ORDER BY ENCUSTOMERPREFIX.ID DESC LIMIT 5 OFFSET @offset";
    sqlCommand = sqlCommand.replace("@key", key).replace("@offset", offset);
  } else {
    sqlCommand =
      "SELECT ENCUSTOMERPREFIX.ID ID, ENCUSTOMERPREFIX.TEXT TEXT, " +
      "CASE WHEN ENCUSTOMERPREFIX.ISACTIVE = TRUE THEN 1 ELSE 0 END AS ISACTIVE, ENCUSTOMERPREFIX.CREATORID CREATORID, " +
      "ENCUSTOMERPREFIX.CREATORNAME CREATORNAME, ENCUSTOMERPREFIX.CREATEDDATE CREATEDDATE, " +
      "ENCUSTOMERPREFIX.MODIFIEDID MODIFIEDID, ENCUSTOMERPREFIX.MODIFIEDNAME MODIFIEDNAME, " +
      "ENCUSTOMERPREFIX.MODIFIEDDATE MODIFIEDDATE " +
      "FROM (OSUSR_X6Q_CUSTOMERPREFIX ENCUSTOMERPREFIX " +
      "LEFT JOIN OSUSR_X6Q_CUSTOMERTYPE ENCUSTOMERTYPESTATIC ON (ENCUSTOMERPREFIX.CUSTOMERTYPESTATICID = ENCUSTOMERTYPESTATIC.ID)) " +
      "WHERE (ENCUSTOMERPREFIX.ISACTIVE = 1) " +
      "ORDER BY ENCUSTOMERPREFIX.ID DESC LIMIT 5 OFFSET @offset";
    sqlCommand = sqlCommand.replace("@offset", offset);
  }
  let countsql;
  if (key != "") {
    countsql =
      "SELECT COUNT(ENCUSTOMERPREFIX.ID) AS Count " +
      "FROM (OSUSR_X6Q_CUSTOMERPREFIX ENCUSTOMERPREFIX " +
      "LEFT JOIN OSUSR_X6Q_CUSTOMERTYPE ENCUSTOMERTYPESTATIC ON (ENCUSTOMERPREFIX.CUSTOMERTYPESTATICID = ENCUSTOMERTYPESTATIC.ID)) " +
      "WHERE (ENCUSTOMERPREFIX.ISACTIVE = 1) AND ENCUSTOMERPREFIX.TEXT LIKE '%@key%' " +
      "ORDER BY ENCUSTOMERPREFIX.ID DESC";
    countsql = countsql.replace("@key", key);
  } else {
    countsql =
      "SELECT COUNT(ENCUSTOMERPREFIX.ID) AS Count " +
      "FROM (OSUSR_X6Q_CUSTOMERPREFIX ENCUSTOMERPREFIX " +
      "LEFT JOIN OSUSR_X6Q_CUSTOMERTYPE ENCUSTOMERTYPESTATIC ON (ENCUSTOMERPREFIX.CUSTOMERTYPESTATICID = ENCUSTOMERTYPESTATIC.ID)) " +
      "WHERE (ENCUSTOMERPREFIX.ISACTIVE = 1) " +
      "ORDER BY ENCUSTOMERPREFIX.ID DESC";
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
      let createdate, modifydate;
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
        item.push({
          id: data[i].ID,
          no: offset + (i + 1),
          text: data[i].TEXT,
          create_id: data[i].CREATORID,
          create_name: data[i].CREATORNAME,
          modify_id: data[i].MODIFIEDID,
          modify_name: data[i].MODIFIEDNAME,
          create_date: createdate
            .replace("01/01/1900", "")
            .replace("01/01/1970", ""),
          modify_date: modifydate
            .replace("01/01/1900", "")
            .replace("01/01/1970", ""),
          isactive: data[i].ISACTIVE == "1" ? true : false,
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
exports.updatePrefixById = async (req, res) => {
  const jsonData = JSON.parse(JSON.stringify(req.body));
  const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
  const sqlCommand = "UPDATE OSUSR_X6Q_CUSTOMERPREFIX SET ? WHERE ? ";
  let sdatecreate;
  if(jsonData.data[0].create_date.trim()!=""){
    sdatecreate = jsonData.data[0].create_date.split("/");
  }
  const id = { ID: jsonData.data[0].id };
  const data = {
    TEXT: jsonData.data[0].text,
    CREATORID: jsonData.data[0].create_id,
    CREATORNAME: jsonData.data[0].create_name,
    MODIFIEDID: jsonData.data[0].modify_id,
    MODIFIEDNAME: jsonData.data[0].modify_name,
    CREATEDDATE:
      jsonData.data[0].create_date == ""
        ? null
        : new Date(
            sdatecreate[2] + "/" + sdatecreate[1] + "/" + sdatecreate[0]
          ),
    MODIFIEDDATE: timestamp,
    ISACTIVE: jsonData.data[0].isactive,
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
exports.deletePrefixById = async (req, res) => {
  const jsonData = JSON.parse(JSON.stringify(req.body));
  const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
  const sqlCommand = "UPDATE OSUSR_X6Q_CUSTOMERPREFIX SET ? WHERE ? ";
  let sdatecreate,sdatemodify;
  if(jsonData.data[0].create_date.trim()!=""){
    sdatecreate = jsonData.data[0].create_date.split("/");
  }
  if(jsonData.data[0].modify_date.trim()!=""){
    sdatemodify = jsonData.data[0].modify_date.split("/");
  }
  const id = { ID: jsonData.data[0].id };
  const data = {
    TEXT: jsonData.data[0].text,
    CREATORID: jsonData.data[0].create_id,
    CREATORNAME: jsonData.data[0].create_name,
    MODIFIEDID: jsonData.data[0].modify_id,
    MODIFIEDNAME: jsonData.data[0].modify_name,
    CREATEDDATE:
      jsonData.data[0].create_date == ""
        ? null
        : new Date(
            sdatecreate[2] + "/" + sdatecreate[1] + "/" + sdatecreate[0]
          ),
    MODIFIEDDATE:
      jsonData.data[0].modify_date == ""
        ? null
        : new Date(
            sdatemodify[2] + "/" + sdatemodify[1] + "/" + sdatemodify[0]
          ),
    DELETEDDATE: timestamp,
    ISACTIVE: jsonData.data[0]["isactive"],
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
exports.insertPrefix = async (req, res) => {
  const jsonData = JSON.parse(JSON.stringify(req.body));
  const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
  const sqlCommand = "INSERT INTO OSUSR_X6Q_CUSTOMERPREFIX SET ? ";
  const data = {
    TEXT: jsonData.data[0].text,
    CREATORID: jsonData.data[0].create_id,
    CREATORNAME: jsonData.data[0].create_name,
    MODIFIEDID: jsonData.data[0].modify_id,
    MODIFIEDNAME: jsonData.data[0].modify_name,
    CREATEDDATE: timestamp,
    ISACTIVE: jsonData.data[0].isactive,
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
