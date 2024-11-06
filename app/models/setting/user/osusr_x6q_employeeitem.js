const { BIGINT } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const employeeitem = sequelize.define("OSUSR_X6Q_EMPLOYEEITEM", {
        ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        EMPLOYEEID: { type: Sequelize.BIGINT },
        MODULEID: { type: Sequelize.BIGINT },
        EDITANDSAVE: { type: Sequelize.BOOLEAN },
        APPROVE: { type: Sequelize.BOOLEAN },
        DESCRIPTION: { type: Sequelize.STRING(250) },
        ISACTIVE: { type: Sequelize.BOOLEAN },
        CREATORID: { type: Sequelize.STRING(50) },
        CREATORNAME: { type: Sequelize.STRING(200) },
        CREATEDDATE: { type: Sequelize.DATE },
        MODIFIEDID: { type: Sequelize.STRING(50) },
        MODIFIEDNAME: { type: Sequelize.STRING(200) },
        MODIFIEDDATE: { type: Sequelize.DATE },
        DELETEDID: { type: Sequelize.STRING(50) },
        DELETEDNAME: { type: Sequelize.STRING(200) },
        DELETEDDATE: { type: Sequelize.DATE },
        SIGNATURE: { type: Sequelize.BLOB('long') },
    });
    return employeeitem;
  };