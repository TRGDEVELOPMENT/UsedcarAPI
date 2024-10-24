const apiCache = require("apicache");
const { authJwt } = require("../../../middleware");
const employee = require("../../../controllers/setting/user/employee.controller");
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
    "/api/setting/user/employee/list",
    [authJwt.verifyToken],
    employee.getEmployeeList
  );
  // app.put(
  //   "/api/setting/user/role/update",
  //   [authJwt.verifyToken],
  //   role.updateRoleById
  // );
  // app.put(
  //   "/api/setting/user/role/delete",
  //   [authJwt.verifyToken],
  //   role.deleteRoleById
  // );
  // app.post(
  //   "/api/setting/user/role/insert",
  //   [authJwt.verifyToken],
  //   role.insertRole
  // );
};
