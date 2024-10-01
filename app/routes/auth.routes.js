const apiCache = require("apicache");
const { authJwt } = require("../middleware");
const controller = require("../controllers/auth.controller");
let cache = apiCache.middleware;
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers","x-access-token, Origin, Content-Type, Accept");
    next();
  });
  app.post("/api/auth/signin", controller.signSystem);
  app.post("/api/auth/verify_token", [authJwt.verifyToken], controller.verifyToken);
};
