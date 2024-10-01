const dbConfig = require("../../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  define:{
    freezeTableName: true,
  },
  logging: false,//turn off log
  pool: {
    connectionLimit: dbConfig.pool.connectionLimit,
    maxIdle: dbConfig.pool.maxIdle,
    idleTimeout: dbConfig.pool.idleTimeout,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.authLogs = require("./logs.model.js")(sequelize, Sequelize);
db.osusr_x6q_customerprefix = require("./setting/osusr_x6q_customerprefix.model.js")(sequelize, Sequelize);
module.exports = db;
