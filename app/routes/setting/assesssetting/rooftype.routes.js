const apiCache = require("apicache");
const { authJwt } = require("../../../middleware");
const rooftype = require("../../../controllers/setting/assesssetting/rooftype.controller");
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
    "/api/setting/assess/rooftype/list",
    [authJwt.verifyToken],
    rooftype.getRoofTypeList
  );
  app.put(
    "/api/setting/assess/rooftype/update",
    [authJwt.verifyToken],
    rooftype.updateRoofTypeById
  );
  app.put(
    "/api/setting/assess/rooftype/delete",
    [authJwt.verifyToken],
    rooftype.deleteRoofTypeById
  );
  app.post(
    "/api/setting/assess/rooftype/insert",
    [authJwt.verifyToken],
    rooftype.insertRoofType
  );
};
