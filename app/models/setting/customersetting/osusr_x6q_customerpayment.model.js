module.exports = (sequelize, Sequelize) => {
  const customerpayment = sequelize.define("OSUSR_X6Q_CUSTOMERPAYMENT", {
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    CODE: { type: Sequelize.STRING(50) },
    NAME: { type: Sequelize.STRING(50) },
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
  return customerpayment;
};