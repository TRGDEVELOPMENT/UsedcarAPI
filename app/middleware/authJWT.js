const jwt = require("jsonwebtoken");
const db = require("../../app/models");
require("dotenv").config();

verifyToken = (req, res, next) => {
  try{
    if (!req.headers["authorization"]) {
      return res.status(401).send({
        message: "Bad Request",
      });
    }
    const token = req.headers["authorization"].replace("Bearer ", "")
    if (!token) {
      return res.status(403).send({
        message: "No Token",
      });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized",
        });
      }
      req.user_id = decoded.id;
      next();
    });

  } catch(err){
    res.status(500).send({
      message: "Some error access this page.",
    });
  }
};
const authJwt = {
  verifyToken: verifyToken,
};
module.exports = authJwt;
