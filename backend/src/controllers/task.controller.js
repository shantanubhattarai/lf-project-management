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

      let sqlQuery = `select * from tasks where id in (${tasksString})`;
      dbConn.connection.query(sqlQuery, function (err, detailResult) {
        console.log(err);
        res.send(detailResult.rows);
      });
    } else {
      res.send({ message: "No task associated with user" });
    }
  });
});

router.post("/", function (req, res, next) {
  //todo: check if project id is in request]
  let sqlQuery = `select * from task_users where user_id = ${req.user.id}`;
  if (req.user.role === 1) {
    sqlQuery = `select * from task_users`;
  }
  dbConn.connection.query(sqlQuery, function (err, result) {
    if (err) {
      next(err);
      return;
    }
    if (result.rows.length > 0) {
      let tasks;
      tasks = result.rows.map((row) => row.task_id);
      let tasksString = tasks.toString();
      let sqlQuery = `select * from tasks where id in (${tasksString}) and project = ${req.body.project_id}`;
      if (!req.body.project_id)
        sqlQuery = `select * from tasks where id in (${tasksString})`;

      dbConn.connection.query(sqlQuery, function (err, detailResult) {
        if (err) console.log(err);
        res.send({ status: 200, data: detailResult.rows });
      });
    } else {
      res.send({ message: "No task associated with user" });
    }
  });
});

router.post("/add", function (req, res, next) {
  let sqlQuery = `insert into tasks(title, description, assigned_user, project, deadline) values('${req.body.name}', '${req.body.description}', ${req.body.user}, ${req.body.project}, '${req.body.deadline}')`;

  dbConn.connection.query(sqlQuery, function (err, result) {
    if (err) {
      console.log(err);
      return res.send({ status: 400, error: err });
    }

    let sqlQuery = `insert into task_users values ((SELECT MAX(id) FROM tasks), ${req.body.user}, 'assigned')`;

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
    let sqlQuery = `update tasks SET title='${req.body.title}', description='${req.body.description}', assigned_user=${req.body.assignedUser} where id = ${req.body.id}`;
    dbConn.connection.query(sqlQuery, function (err, result) {
      if (err) {
        next(err);
        return;
      }
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

router.get("/details/:id", function (req, res, next) {
  let sqlQuery = `select * from task_users where user = ${req.user.id}`;
  if (req.user.role === 1 || req.user.role === 2)
    sqlQuery = `select * from task_users`;

  dbConn.connection.query(sqlQuery, function (err, result) {
    if (err) {
      next(err);
      return;
    }

    if (result.rows.length > 0) {
      let sqlQuery = `select * from tasks where id = ${req.params.id}`;
      dbConn.connection.query(sqlQuery, function (err, detailResult) {
        return res.send({ status: 200, data: detailResult.rows[0] });
      });
    } else {
      res.send({
        status: 400,
        data: { message: "Task not associated with user" },
      });
    }
  });
});

router.get("/user/:id", function (req, res, next) {
  let sqlQuery = `select * from task_users where user_id = ${req.user.id}`;
  if (req.user.role === 1 || req.user.role === 2)
    sqlQuery = `select * from task_users`;

  dbConn.connection.query(sqlQuery, function (err, result) {
    if (err) {
      next(err);
      return;
    }

    if (result.rows.length > 0) {
      let sqlQuery = `select * from tasks where id = ${req.params.id}`;
      dbConn.connection.query(sqlQuery, function (err, detailResult) {
        let sqlQuery = `select * from users where id = ${detailResult.rows[0].assigned_user}`;
        dbConn.connection.query(sqlQuery, function (err, userResult) {
          return res.send({ status: 200, data: userResult.rows[0] });
        });
      });
    } else {
      res.send({
        status: 400,
        data: { message: "Task not associated with user" },
      });
    }
  });
});

module.exports = router;
