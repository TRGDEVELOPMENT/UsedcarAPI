const apiCache = require("apicache");
const { authJwt } = require("../../../middleware");
const rerentstatus = require("../../../controllers/setting/assesssetting/rerentstatus.controller");
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
    "/api/setting/assess/rerentstatus/list",
    [authJwt.verifyToken],
    rerentstatus.getReRentStatusList
  );
  app.put(
    "/api/setting/assess/rerentstatus/update",
    [authJwt.verifyToken],
    rerentstatus.updateReRentStatusById
  );
  app.put(
    "/api/setting/assess/rerentstatus/delete",
    [authJwt.verifyToken],
    rerentstatus.deleteReRentStatusById
  );
  app.post(
    "/api/setting/assess/rerentstatus/insert",
    [authJwt.verifyToken],
    rerentstatus.insertReRentStatus
  );
};
