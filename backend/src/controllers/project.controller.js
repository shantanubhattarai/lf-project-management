const express = require("express");
const router = express.Router();
const dbConn = require("./../dbconn.js");
const authorize = require("../middleware/authorize");

router.get("/", function (req, res, next) {
  let sqlQuery = `select * from project_users where user_id = ${req.user.id}`;
  if (req.user.role === 1) {
    sqlQuery = `select * from project_users`;
  }

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
        return res.send({ status: 200, data: detailResult.rows });
      });
    } else {
      res.send({
        status: 200,
        data: { message: "No projects associated with user" },
      });
    }
  });
});

router.get("/details/:id", function (req, res, next) {
  let sqlQuery = `select * from project_users where user_id = ${req.user.id}`;
  if (req.user.role === 1 || req.user.role === 2)
    sqlQuery = `select * from project_users`;

  dbConn.connection.query(sqlQuery, function (err, result) {
    if (err) {
      next(err);
      return;
    }

    if (result.rows.length > 0) {
      let sqlQuery = `select * from projects where id in (${req.params.id})`;
      dbConn.connection.query(sqlQuery, function (err, detailResult) {
        return res.send({ status: 200, data: detailResult.rows[0] });
      });
    } else {
      res.send({
        status: 400,
        data: { message: "Project not associated with user" },
      });
    }
  });
});

router.put("/update", authorize([1, 2]), function (req, res, next) {
  let sqlQuery = `select * from projects`;
  if (req.user.role === 2) {
    sqlQuery = `select * from projects where project_manager=${req.user.id}`;
  }

  dbConn.connection.query(sqlQuery, function (err, result) {
    if (err) {
      next(err);
      return;
    }
    if (result.rows.length <= 0) {
      res.send({
        status: 400,
        message: "Updating unassigned project not allowed.",
      });
      return;
    }
    let sqlQuery = `update projects SET name='${req.body.name}', description='${req.body.description}' where id = ${req.body.id}`;
    dbConn.connection.query(sqlQuery, function (err, result) {
      if (err) {
        next(err);
        return;
      }
      res.send({ status: 200, message: "Updated successfully." });
    });
  });
});

router.post("/add-user", authorize([1, 2]), function (req, res, next) {
  let sqlQuery = `select * from users where id = ${req.body.userId}`;
  dbConn.connection.query(sqlQuery, function (err, result) {
    if (err) {
      next(err);
      return;
    }
    if (result.rows.length <= 0) {
      res.send({ status: 400, message: "User not found" });
      return;
    }
    let sqlQuery = `insert into project_users values(${req.body.projectId}, ${req.body.userId})`;
    dbConn.connection.query(sqlQuery, function (err, result) {
      if (err) {
        next(err);
        return;
      }
      res.send({ status: 200, message: "User added successfully" });
    });
  });
});

router.delete("/remove-user", authorize([1, 2]), function (req, res, next) {
  let sqlQuery = `delete from project_users where project_id=${req.body.project} and user_id=${req.body.user}`;
  dbConn.connection.query(sqlQuery, function (err, result) {
    if (err) {
      next(err);
      return;
    }
    res.send({ status: 200, message: "User removed successfully" });
  });
});

router.delete("/remove", authorize([1]), function (req, res, next) {
  let sqlQuery = `delete from project_users where project_id=${req.body.projectId}`;
  console.log(sqlQuery);
  dbConn.connection.query(sqlQuery, function (err, result) {
    if (err) {
      next(err);
      return;
    }
    let sqlQuery = `delete from projects where id=${req.body.projectId}`;
    console.log(sqlQuery);
    dbConn.connection.query(sqlQuery, function (err, result) {
      if (err) {
        next(err);
        return;
      }
      res.send({ status: 200, message: "Project removed successfully" });
    });
  });
});

router.post("/add", authorize([1]), function (req, res, next) {
  //todo: check if project manager is already assigned

  let sqlQuery = `insert into projects(name, description, project_manager) values('${req.body.name}', '${req.body.description}', ${req.body.project_manager})`;
  dbConn.connection.query(sqlQuery, function (err, result) {
    if (err) {
      next(err);
      return;
    }

    let sqlQuery = `insert into project_users values ((SELECT MAX(id) FROM projects), ${req.body.project_manager})`;

    dbConn.connection.query(sqlQuery, function (err, result) {
      if (err) {
        next(err);
        return;
      }
      return res.send({ status: 200, data: result.rows });
    });
  });
});

router.get("/listUsers", function (req, res, next) {
  let sqlQuery = `select * from users WHERE role=4 or role=3`;
  console.log(sqlQuery);
  dbConn.connection.query(sqlQuery, function (err, userResult) {
    if (err) {
      next(err);
      return;
    }
    return res.send({ status: 200, data: userResult.rows });
  });
});

module.exports = router;
