const express = require("express");
const router = express.Router();
const dbConn = require("./../dbconn.js");
const authorize = require("../middleware/authorize");

router.get("/", function (req, res, next) {
  let sqlQuery = `select * from task_users where user_id = ${req.user.id}`;
  dbConn.connection.query(sqlQuery, function (err, result) {
    if (err) {
      next(err);
      return;
    }

    if (result.rows.length > 0) {
      let tasks;
      tasks = result.rows.map((row) => row.task_id);
      let tasksString = tasks.toString();

      let sqlQuery = `select * from projects where id in (${tasksString})`;
      dbConn.connection.query(sqlQuery, function (err, detailResult) {
        console.log(err);
        res.send(detailResult.rows);
      });
    } else {
      res.send({ message: "No task associated with user" });
    }
  });
});

router.post("/add", function (req, res, next) {
  let sqlQuery = `insert into tasks(title, description, assigned_user, project) values('${req.body.name}', '${req.body.description}', ${req.body.user}, ${req.body.project})`;

  dbConn.connection.query(sqlQuery, function (err, result) {
    if (err) {
      console.log(err);
      return res.send({ status: 400, error: err });
    }

    let sqlQuery = `insert into task_users values ((SELECT MAX(id) FROM tasks), ${req.user.id}, 'assigned')`;

    dbConn.connection.query(sqlQuery, function (err, result) {
      if (err) {
        console.log(err);
        return;
      }
      return res.send({ status: 200, data: result.rows });
    });
  });
});

router.put("/update", function (req, res, next) {
  let sqlQuery = `select * from tasks`;
  if (req.user.role === 4) {
    sqlQuery = `select * from tasks where assigned_user=${req.user.id}`;
  }

  dbConn.connection.query(sqlQuery, function (err, result) {
    if (err) next(err);
    if (result.rows.length <= 0) {
      res.send({
        status: 400,
        message: "Updating task not allowed.",
      });
      return;
    }
    let sqlQuery = `update task SET title='${req.body.name}', description='${req.body.description}', assigned_user=${req.body.user} where id = ${req.body.id}`;
    dbConn.connection.query(sqlQuery, function (err, result) {
      if (err) next(err);
      res.send({ status: 200, message: "Updated successfully." });
    });
  });
});

router.post("/tag", function (req, res, next) {
  //todo: check if user exists
  let sqlQuery = `insert into task_users values(${req.body.task}, ${req.body.user}, 'tagged')`;

  dbConn.connection.query(sqlQuery, function (err, result) {
    if (err) next(err);
    res.send({ status: 200, message: "Updated successfully" });
  });
});

router.delete("/remove", authorize([1, 2, 3]), function (req, res, next) {
  let sqlQuery = `delete from project_users where project_id=${req.body.project} and user_id=${req.body.user}`;
  dbConn.connection.query(sqlQuery, function (err, result) {
    if (err) next(err);
    res.send({ status: 200, message: "User removed successfully" });
  });
});

router.delete("/remove", authorize([1, 2, 3]), function (req, res, next) {
  let sqlQuery = `delete from task_users where task_id=${req.body.project}`;
  dbConn.connection.query(sqlQuery, function (err, result) {
    if (err) next(err);
    let sqlQuery = `delete from tasks where id=${req.body.project}`;
    dbConn.connection.query(sqlQuery, function (err, result) {
      if (err) next(err);
      res.send({ status: 200, message: "User removed successfully" });
    });
  });
});

module.exports = router;
