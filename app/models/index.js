const dbConfig = require("../../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  define: {
    freezeTableName: true,
  },
  logging: false, //turn off log
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
db.customerprefix =
  require("./setting/customersetting/osusr_x6q_customerprefix.model.js")(
    sequelize,
    Sequelize
  );
db.customertype =
  require("./setting/customersetting/osusr_x6q_customertype.model.js")(
    sequelize,
    Sequelize
  );
db.customerpayment =
  require("./setting/customersetting/osusr_x6q_customerpayment.model.js")(
    sequelize,
    Sequelize
  );
  db.customeraddresstype =
  require("./setting/customersetting/osusr_x6q_customeraddresstype.model.js")(
    sequelize,
    Sequelize
  );
  db.rooftype = 
  require("./setting/assesssetting/osusr_x6q_rooftype.model.js")(
    sequelize,
    Sequelize
  );
  db.financestatus = 
  require("./setting/assesssetting/osusr_x6q_financestatus.model.js")(
    sequelize,
    Sequelize
  );
  db.rerentstatus = 
  require("./setting/assesssetting/osusr_x6q_rerentstatus.model.js")(
    sequelize,
    Sequelize
  );
  db.role =
  require("./setting/user/osusr_x6q_role.model.js")(
    sequelize,
    Sequelize
  );
  db.employee =
  require("./setting/user/osusr_x6q_employee.model.js")(
    sequelize,
    Sequelize
  );
  db.remark =
  require("./setting/remark/osusr_x6q_remark.model.js")(
    sequelize,
    Sequelize
  );
module.exports = db;
