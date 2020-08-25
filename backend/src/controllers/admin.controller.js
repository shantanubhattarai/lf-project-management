const express = require("express");
const config = require("../configs/config");
const router = express.Router();
const dbConn = require("./../dbconn.js");

router.get("/projects", function (req, res, next) {
  let sqlQuery = "SELECT * FROM projects WHERE is_deleted = 'f'";

  dbConn.connection.query(sqlQuery, function (err, result) {
    if (err) {
      return res.send({ status: 400, error: err });
    }
    return res.send({ status: 200, data: result.rows }); //this result is empty
  });
});

router.put("/projects/update", function (req, res, next) {
  let sqlQuery = `update projects SET name='${req.body.name}', description='${req.body.description}', project_manager=${req.body.project_manager} where id = ${req.body.id}`;

  dbConn.connection.query(sqlQuery, function (err, result) {
    if (err) throw err;
    res.send({ status: 200, result });
  });
});

module.exports = router;
