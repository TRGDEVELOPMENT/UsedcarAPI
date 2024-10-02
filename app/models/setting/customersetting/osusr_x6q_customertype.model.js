module.exports = (sequelize, Sequelize) => {
  const customertype = sequelize.define("OSUSR_X6Q_CUSTOMERTYPE", {
    ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    TYPECODE: { type: Sequelize.STRING(50) },
    PRECODE: { type: Sequelize.STRING(50) },
    NAME: { type: Sequelize.STRING(50) },
    DESCRIPTION: { type: Sequelize.STRING(50) },
    ISACTIVE: { type: Sequelize.BOOLEAN },
    CREATORID: { type: Sequelize.STRING(50) },
    CREATORNAME: { type: Sequelize.STRING(50) },
    CREATEDDATE: { type: Sequelize.DATE },
    MODIFIEDID: { type: Sequelize.STRING(50) },
    MODIFIEDNAME: { type: Sequelize.STRING(50) },
    MODIFIEDDATE: { type: Sequelize.DATE },
    DELETEDID: { type: Sequelize.STRING(50) },
    DELETEDNAME: { type: Sequelize.STRING(50) },
    DELETEDDATE: { type: Sequelize.STRING(50) },
    ISPARKINGLOCATION: { type: Sequelize.BOOLEAN },
  });
  return customertype;
};
