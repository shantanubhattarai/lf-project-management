const jwt = require("jsonwebtoken");
const config = require("./../configs/config");
const dbConn = require("../dbconn");

module.exports = function (req, res, next) {
  let token;

  if (req.headers["authorization"]) token = req.headers["authorization"];
  if (req.headers["x-access-token"]) token = req.headers["x-access-token"];
  if (req.headers["token"]) token = req.headers["token"];

  if (!token) {
    return res.send({
      message: "Token not provided",
      status: 400,
    });
  }

  jwt.verify(token, config.jwtSecret, function (err, decoded) {
    if (err) {
      return res.send({ message: "wrong token", status: 400 });
    }
    if (decoded.id) {
      let sqlQuery = `SELECT * FROM users WHERE id=${decoded.id}`;
      dbConn.connection.query(sqlQuery, function (err, result) {
        if (err) {
          return next(err);
        }
        if (result.length <= 0) {
          return res.send({ message: "user not found", status: 400 });
        }
      });
    }
    req.user = decoded;

    next();
  });
};
