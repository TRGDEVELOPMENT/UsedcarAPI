const apiCache = require("apicache");
const { authJwt } = require("../middleware");
const controller = require("../controllers/account.controller");
const router = require("express").Router();
let cache = apiCache.middleware;
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get(
    "/api/account/menu/profile",
    [authJwt.verifyToken],
    controller.accountMenuProfile
  );
};
