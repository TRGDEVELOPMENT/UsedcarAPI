const apiCache = require("apicache");
const { authJwt } = require("../../../middleware");
const financestatus = require("../../../controllers/setting/assesssetting/financestatus.controller");
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
    "/api/setting/assess/financestatus/list",
    [authJwt.verifyToken],
    financestatus.getFinanceStatusList
  );
  app.put(
    "/api/setting/assess/financestatus/update",
    [authJwt.verifyToken],
    financestatus.updateFinanceStatusById
  );
  app.put(
    "/api/setting/assess/financestatus/delete",
    [authJwt.verifyToken],
    financestatus.deleteFinanceStatusById
  );
  app.post(
    "/api/setting/assess/financestatus/insert",
    [authJwt.verifyToken],
    financestatus.insertFinanceStatus
  );
};
