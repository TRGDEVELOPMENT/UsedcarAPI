const apiCache = require("apicache");
const { authJwt } = require("../../../middleware");
const customertype = require("../../../controllers/setting/customersetting/customertype.controller");
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
    "/api/setting/customertype/list",
    [authJwt.verifyToken],
    customertype.getCustomerTypeList
  );
  app.put(
    "/api/setting/customertype/update",
    [authJwt.verifyToken],
    customertype.updateCustomerTypeById
  );
  app.put(
    "/api/setting/customertype/delete",
    [authJwt.verifyToken],
    customertype.deleteCustomerTypeById
  );
  app.post(
    "/api/setting/customertype/insert",
    [authJwt.verifyToken],
    customertype.insertCustomerType
  );
};
