const express = require("express");
const router = express.Router();
const dbConn = require("./../dbconn.js");
const authorize = require("../middleware/authorize");

router.get("/", function (req, res, next) {
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
    } else {
      res.send({ message: "No projects associated with user" });
    }
  });
});

router.put("/update", authorize([1, 2]), function (req, res, next) {
  let sqlQuery = `select * from projects`;
  if (req.user.role === 2) {
    sqlQuery = `select * from projects where project_manager=${req.user.id}`;
  }

  dbConn.connection.query(sqlQuery, function (err, result) {
    if (err) next(err);
    if (result.rows.length <= 0) {
      res.send({
        status: 400,
        message: "Updating unassigned project not allowed.",
      });
      return;
    }
    let sqlQuery = `update projects SET name='${req.body.name}', description='${req.body.description}' where id = ${req.body.id}`;
    dbConn.connection.query(sqlQuery, function (err, result) {
      if (err) next(err);
      res.send({ status: 200, message: "Updated successfully." });
    });
  });
});

router.post("/add-user", authorize([1, 2]), function (req, res, next) {
  let sqlQuery = `select * from users where id = ${req.body.user}`;
  dbConn.connection.query(sqlQuery, function (err, result) {
    if (err) next(err);
    if (result.rows.length <= 0) {
      res.send({ status: 400, message: "User not found" });
    }
    let sqlQuery = `insert into project_users values(${req.body.id}, ${req.body.user})`;
    dbConn.connection.query(sqlQuery, function (err, result) {
      if (err) next(err);
      res.send({ status: 200, message: "User added successfully" });
    });
  });
});

router.delete("/remove-user", authorize([1, 2]), function (req, res, next) {
  let sqlQuery = `delete from project_users where project_id=${req.body.project} and user_id=${req.body.user}`;
  dbConn.connection.query(sqlQuery, function (err, result) {
    if (err) next(err);
    res.send({ status: 200, message: "User removed successfully" });
  });
});

router.delete("/remove", authorize([1, 2]), function (req, res, next) {
  let sqlQuery = `delete from project_users where project_id=${req.body.project}`;
  dbConn.connection.query(sqlQuery, function (err, result) {
    if (err) next(err);
    let sqlQuery = `update projects set is_deleted='t' where id=${req.body.project}`;
    dbConn.connection.query(sqlQuery, function (err, result) {
      if (err) next(err);
      res.send({ status: 200, message: "User removed successfully" });
    });
  });
});

module.exports = router;
