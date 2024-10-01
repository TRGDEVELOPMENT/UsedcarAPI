const db = require("../../models");
const { common } = require("../../middleware");
const fs = require("fs");
const Users = db.outsourceAccount;
const Op = db.Sequelize.Op;
const path = require("path");
const moment = require("moment");
const { DATE } = require("sequelize");
const sqlString = require("sqlstring");
const { console } = require("inspector");
const { log } = require("console");
exports.getPrefixList = async (req, res) => {
  console.log("Get List")
    const key = req.query["key"];
    const page = req.query["page"];
    const offset = 10*(page-1<=0?0:page-1);
    const jsonData = [];
    let sqlCommand;
    if(key != ""){
    sqlCommand =
    "SELECT ENCUSTOMERPREFIX.ID ID, ENCUSTOMERPREFIX.TEXT TEXT, "+
    "CASE WHEN ENCUSTOMERPREFIX.ISACTIVE = TRUE THEN 1 ELSE 0 END AS ISACTIVE, ENCUSTOMERPREFIX.CREATORID CREATORID, "+
    "ENCUSTOMERPREFIX.CREATORNAME CREATORNAME, ENCUSTOMERPREFIX.CREATEDDATE CREATEDDATE, "+
    "ENCUSTOMERPREFIX.MODIFIEDID MODIFIEDID, ENCUSTOMERPREFIX.MODIFIEDNAME MODIFIEDNAME, "+
    "ENCUSTOMERPREFIX.MODIFIEDDATE MODIFIEDDATE "+
    "FROM (OSUSR_X6Q_CUSTOMERPREFIX ENCUSTOMERPREFIX "+
    "LEFT JOIN OSUSR_X6Q_CUSTOMERTYPE ENCUSTOMERTYPESTATIC ON (ENCUSTOMERPREFIX.CUSTOMERTYPESTATICID = ENCUSTOMERTYPESTATIC.ID)) "+
    "WHERE (ENCUSTOMERPREFIX.ISACTIVE = 1) AND ENCUSTOMERPREFIX.TEXT LIKE '%@key%' "+
    "ORDER BY ENCUSTOMERPREFIX.ID DESC LIMIT 10 OFFSET @offset ";
    sqlCommand = sqlCommand.replace("@key",key).replace("@offset",offset);
    }else{
      sqlCommand =
      "SELECT ENCUSTOMERPREFIX.ID ID, ENCUSTOMERPREFIX.TEXT TEXT, "+
      "CASE WHEN ENCUSTOMERPREFIX.ISACTIVE = TRUE THEN 1 ELSE 0 END AS ISACTIVE, ENCUSTOMERPREFIX.CREATORID CREATORID, "+
      "ENCUSTOMERPREFIX.CREATORNAME CREATORNAME, ENCUSTOMERPREFIX.CREATEDDATE CREATEDDATE, "+
      "ENCUSTOMERPREFIX.MODIFIEDID MODIFIEDID, ENCUSTOMERPREFIX.MODIFIEDNAME MODIFIEDNAME, "+
      "ENCUSTOMERPREFIX.MODIFIEDDATE MODIFIEDDATE "+
      "FROM (OSUSR_X6Q_CUSTOMERPREFIX ENCUSTOMERPREFIX "+
      "LEFT JOIN OSUSR_X6Q_CUSTOMERTYPE ENCUSTOMERTYPESTATIC ON (ENCUSTOMERPREFIX.CUSTOMERTYPESTATICID = ENCUSTOMERTYPESTATIC.ID)) "+
      "WHERE (ENCUSTOMERPREFIX.ISACTIVE = 1) "+
      "ORDER BY ENCUSTOMERPREFIX.ID DESC LIMIT 10 OFFSET @offset ";
      sqlCommand = sqlCommand.replace("@offset",offset);
    }
    let countsql;
    if(key != ""){
      countsql =
      "SELECT COUNT(ENCUSTOMERPREFIX.ID) AS Count "+
      "FROM (OSUSR_X6Q_CUSTOMERPREFIX ENCUSTOMERPREFIX "+
      "LEFT JOIN OSUSR_X6Q_CUSTOMERTYPE ENCUSTOMERTYPESTATIC ON (ENCUSTOMERPREFIX.CUSTOMERTYPESTATICID = ENCUSTOMERTYPESTATIC.ID)) "+
      "WHERE (ENCUSTOMERPREFIX.ISACTIVE = 1) AND ENCUSTOMERPREFIX.TEXT LIKE '%@key%' "+
      "ORDER BY ENCUSTOMERPREFIX.ID DESC ";
      countsql = countsql.replace("@key",key);
      }else{
        countsql =
        "SELECT COUNT(ENCUSTOMERPREFIX.ID) AS Count "+
        "FROM (OSUSR_X6Q_CUSTOMERPREFIX ENCUSTOMERPREFIX "+
        "LEFT JOIN OSUSR_X6Q_CUSTOMERTYPE ENCUSTOMERTYPESTATIC ON (ENCUSTOMERPREFIX.CUSTOMERTYPESTATICID = ENCUSTOMERTYPESTATIC.ID)) "+
        "WHERE (ENCUSTOMERPREFIX.ISACTIVE = 1) "+
        "ORDER BY ENCUSTOMERPREFIX.ID DESC ";
      }
    const totaldata = await db.sequelize.query(countsql, { type: db.Sequelize.QueryTypes.SELECT }
    ).then((data) => { return data[0]['Count']; }).catch(() => { res.status(500).send(); });
    await db.sequelize
      .query(sqlCommand, { type: db.Sequelize.QueryTypes.SELECT })
      .then(async (data) => {
        const item = [];
        let i = 0;
        let createdate,modifydate;
        while (i in data) {
          createdate = new Date(data[i]["CREATEDDATE"]).toISOString().slice(0, 10).split('-').reverse().join('/');
          modifydate = new Date(data[i]["MODIFIEDDATE"]).toISOString().slice(0, 10).split('-').reverse().join('/');
          item.push({
            id: data[i]["ID"],
            no: offset+(i+1),
            text: data[i]["TEXT"],
            create_id: data[i]["CREATORID"],
            create_name: data[i]["CREATORNAME"],
            modify_id: data[i]["MODIFIEDID"],
            modify_name: data[i]["MODIFIEDNAME"],
            create_date: (createdate=="01/01/1900"?"":createdate),
            modify_date: (modifydate=="01/01/1900"?"":modifydate),
            isactive: data[i]["ISACTIVE"] == "1" ? true : false,
            page: page,
          }); i++;
        }
        jsonData.push({ data: item,totaldata:totaldata })
      })
      .catch((e) => {
        console.log(e);
        res.status(500).send("error");
      });
    return res.status(200).send(jsonData);
  }
  
exports.updatePrefixById = async (req, res) => {
  const jsonData = JSON.parse(JSON.stringify(req.body));
  const timestamp = new Date().toISOString().slice(0, 19).replace("T", " ");
  const sqlCommand = "UPDATE OSUSR_X6Q_CUSTOMERPREFIX SET ? WHERE ? ";
  console.log(jsonData.data[0]);
  // const id = {ID: jsonData.data[0]["id"]};
  // const data = {
  //   TEXT: jsonData.data[0]["TEXT"],
  //   CREATORID: jsonData.data[0]["create_id"],
  //   CREATORNAME: jsonData.data[0]["create_name"],
  //   MODIFIEDID: jsonData.data[0]["modify_id"],
  //   MODIFIEDNAME: jsonData.data[0]["modify_name"],
  //   CREATEDDATE: jsonData.data[0]["create_date"],
  //   MODIFIEDDATE: timestamp,
  //   ISACTIVE: jsonData.data[0]["isactive"] == "1" ? true : false,
  // }
  // await db.sequelize.query(sqlString.format(sqlCommand, [data, id]), { type: db.Sequelize.QueryTypes.UPDATE })
  //     .then(() => { return res.status(200).send(true);}).catch((err) => { return res.status(500).send(err) });
}
