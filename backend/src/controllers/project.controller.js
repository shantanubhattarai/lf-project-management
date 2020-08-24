const express = require("express");
const router = express.Router();
const dbConn = require("./../dbconn.js");
const authorize = require("../middleware/authorize");

router.get("/", function (req, res, next) {
  if (req.body.message) {
    res.send(req.body.message);
  }
  let sqlQuery = `select * from project_users where user_id = ${req.user.id}`;
  dbConn.connection.query(sqlQuery, function (err, result) {
    if (err) {
      next(err);
      return;
    }

    if (result.rows.length > 0) {
      let projects;
      projects = result.rows.map((row) => row.project_id);
      let projectsString = projects.toString();
      let sqlQuery = `select * from projects where id in (${projectsString})`;
      dbConn.connection.query(sqlQuery, function (err, detailResult) {
        console.log(err);
        res.send(detailResult.rows);
      });
    }
  });
});

module.exports = router;
