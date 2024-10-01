module.exports = (sequelize, Sequelize) => {
    const osusr_x6q_customerprefix = sequelize.define("OSUSR_X6Q_CUSTOMERPREFIX", {
      ID: {type: Sequelize.INTEGER,primaryKey: true, autoIncrement: true },
      applicationName: {type: Sequelize.STRING(250)},
      username: {type: Sequelize.STRING(250)},
      ipAddress: {type: Sequelize.STRING(250)},
      loginDate: {type: Sequelize.DATE},
    });
    return osusr_x6q_customerprefix;
};