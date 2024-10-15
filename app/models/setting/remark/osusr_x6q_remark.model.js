module.exports = (sequelize, Sequelize) => {
    const remark = sequelize.define("OSUSR_X6Q_REMARK", {
      ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      LABEL: { type: Sequelize.STRING(50) },
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
    });
    return remark;
  };
  