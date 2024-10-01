const apiCache = require("apicache");
const { authJwt } = require("../../middleware");
const customerprefix = require("../../controllers/setting/customerprefix.controller");
const router = require("express").Router();
let cache = apiCache.middleware;

module.exports = function (app) {
    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept");
      next();
    });
    app.get("/api/setting/customerprefix/list", [authJwt.verifyToken], customerprefix.getPrefixList);
    app.put("/api/setting/customerprefix/update",[authJwt.verifyToken], customerprefix.updatePrefixById)
  };
  