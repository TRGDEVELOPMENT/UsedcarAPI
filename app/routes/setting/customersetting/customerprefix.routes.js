const apiCache = require("apicache");
const { authJwt } = require("../../../middleware");
const customerprefix = require("../../../controllers/setting/customersetting/customerprefix.controller");
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
    "/api/setting/customersetting/customerprefix/list",
    [authJwt.verifyToken],
    customerprefix.getPrefixList
  );
  app.put(
    "/api/setting/customersetting/customerprefix/update",
    [authJwt.verifyToken],
    customerprefix.updatePrefixById
  );
  app.put(
    "/api/setting/customersetting/customerprefix/delete",
    [authJwt.verifyToken],
    customerprefix.deletePrefixById
  );
  app.post(
    "/api/setting/customersetting/customerprefix/insert",
    [authJwt.verifyToken],
    customerprefix.insertPrefix
  );
};
