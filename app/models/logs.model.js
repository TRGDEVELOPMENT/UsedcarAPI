module.exports = (sequelize, Sequelize) => {
    const authLogs = sequelize.define("authLogs", {
      ID: {type: Sequelize.INTEGER,primaryKey: true, autoIncrement: true },
      applicationName: {type: Sequelize.STRING(250)},
      username: {type: Sequelize.STRING(250)},
      ipAddress: {type: Sequelize.STRING(250)},
      loginDate: {type: Sequelize.DATE},
    });
    return authLogs;
};