module.exports = (sequelize, Sequelize) => {
    const userroleitem = sequelize.define("OSUSR_X6Q_USERROLEITEM", {
        ID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        ROLEID: { type: Sequelize.BIGINT },
        MODULEID: { type: Sequelize.BIGINT },
        ISACTIVE: { type: Sequelize.BOOLEAN },
        APPROVE: {type: Sequelize.BOOLEAN },
        DESCRIPTION: { type: Sequelize.STRING(250) },
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
    return userroleitem;
  };