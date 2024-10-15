const apiCache = require("apicache");
const { authJwt } = require("../../../middleware");
const remark = require("../../../controllers/setting/remark/remark.controller");
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
    "/api/setting/remark/remark/list",
    [authJwt.verifyToken],
    remark.getRemarkList
  );
  app.put(
    "/api/setting/remark/remark/update",
    [authJwt.verifyToken],
    remark.updateRemarkById
  );
  app.put(
    "/api/setting/remark/remark/delete",
    [authJwt.verifyToken],
    remark.deleteRemarkById
  );
  app.post(
    "/api/setting/remark/remark/insert",
    [authJwt.verifyToken],
    remark.insertRemark
  );
};
