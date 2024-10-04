const apiCache = require("apicache");
const { authJwt } = require("../../../middleware");
const customeraddresstype = require("../../../controllers/setting/customersetting/customeraddresstype.controller");
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
    "/api/setting/customersetting/customeraddresstype/list",
    [authJwt.verifyToken],
    customeraddresstype.getCustomerAddressTypeList
  );
  app.put(
    "/api/setting/customersetting/customeraddresstype/update",
    [authJwt.verifyToken],
    customeraddresstype.updateCustomerAddressTypeById
  );
  app.put(
    "/api/setting/customersetting/customeraddresstype/delete",
    [authJwt.verifyToken],
    customeraddresstype.deleteCustomerAddressTypeById
  );
  app.post(
    "/api/setting/customersetting/customeraddresstype/insert",
    [authJwt.verifyToken],
    customeraddresstype.insertCustomerAddressType
  );
};
