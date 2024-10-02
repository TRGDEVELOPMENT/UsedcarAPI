module.exports = (sequelize, Sequelize) => {
  const customerprefix = sequelize.define("OSUSR_X6Q_CUSTOMERPREFIX", {
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    TEXT: { type: Sequelize.STRING(50) },
    CUSTOMERTYPESTATICID: { type: Sequelize.INTEGER },
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
  return customerprefix;
};