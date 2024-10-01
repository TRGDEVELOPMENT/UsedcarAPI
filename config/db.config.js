require("dotenv").config()
let DB_HOST = process.env.DB_HOST
let DB_PORT = process.env.DB_PORT
let DB_PASSWORD = process.env.DB_PASSWORD
let DB_USER = process.env.DB_USER
module.exports = {
    host: DB_HOST,
    user: DB_USER,
    port: DB_PORT,
    password: DB_PASSWORD,
    db: "usedcarDB",
    dialect: "mysql",
    pool: {
        connectionLimit: 100,
        maxIdle: 10,
        idleTimeout: 6000
    },
  };