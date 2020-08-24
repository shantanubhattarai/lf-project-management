const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../configs/config");
const router = express.Router();
const dbConn = require("./../dbconn.js");

router.get("/projects", function (req, res, next) {
  let sqlQuery = "SELECT * FROM projects";
  dbConn.connection.query(sqlQuery, function (err, result) {
    if (err) {
      return res.send({ status: 400, error: err });
    }
    return res.send({ status: 200, data: result.rows });
  });
});

router.post("/projects/add", function (req, res, next) {
  let sqlQuery = `insert into projects(name, description, project_manager) values(${req.body.name}, ${req.body.description}, ${req.body.project_manager}`;
});

module.exports = router;
