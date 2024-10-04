const apiCache = require("apicache");
const { authJwt } = require("../../../middleware");
const customerpayment = require("../../../controllers/setting/customersetting/customerpayment.controller");
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
    "/api/setting/customersetting/customerpayment/list",
    [authJwt.verifyToken],
    customerpayment.getCustomerPaymentList
  );
  app.put(
    "/api/setting/customersetting/customerpayment/update",
    [authJwt.verifyToken],
    customerpayment.updateCustomerPaymentById
  );
  app.put(
    "/api/setting/customersetting/customerpayment/delete",
    [authJwt.verifyToken],
    customerpayment.deletePaymentById
  );
  app.post(
    "/api/setting/customersetting/customerpayment/insert",
    [authJwt.verifyToken],
    customerpayment.insertPayment
  );
};
