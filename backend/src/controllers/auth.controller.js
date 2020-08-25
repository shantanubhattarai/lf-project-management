const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../configs/config");
const router = express.Router();
const dbConn = require("./../dbconn.js");

function createToken(data) {
  return jwt.sign(JSON.stringify(data), config.jwtSecret);
}

router.post("/login", function (req, res, next) {
  let sqlQuery = `SELECT * FROM users WHERE username = '${req.body.username}' OR email = '${req.body.email}'`;

  dbConn.connection.query(sqlQuery, function (err, result) {
    if (err) next(err);

    if (result.rows.length === 0) {
      res.send({ status: 400, message: "user not found" });
    }

    bcrypt.compare(req.body.password, result.rows[0].password, function (
      err,
      comparisonResult
    ) {
      if (!comparisonResult) {
        res.send({ status: 400, message: "wrong password" });
        return;
      }

      let sqlQuery = `SELECT * FROM roles WHERE id = ${result.rows[0].role}`;
      let tempRole = 0;

      dbConn.connection.query(sqlQuery, function (err, roleResult) {
        tempRole = roleResult.rows[0].role;
        let token = createToken(result.rows[0]);

        req.headers["authToken"] = token;

        res.send({
          id: result.rows[0].id,
          username: result.rows[0].username,
          firstName: result.rows[0].first_name,
          lastName: result.rows[0].last_name,
          email: result.rows[0].email,
          role: tempRole,
          token,
          status: 200,
        }); // end res send
      }); //end role query
    }); //end bcrypt compare
  }); //end user query
}); //end login

/**
 * @param {{roleId:int}} role the user belongs to
 * @param {{firstName: string}} first name of the user
 * @param {{lastName: string}} last name of the user
 * @param {{email: string}} email of the user
 * */
router.post("/create-user", async (req, res, next) => {
  if (!req.body.roleId) {
    res.send({ status: 400, message: "role not selected" });
    return;
  }

  if (req.body.roleId === 1) {
    res.send({ status: 400, message: "Admin creation not allowed" });
    return;
  }

  if (!req.body.username || req.body.username.length <= 0) {
    res.send({ status: 400, message: "Empty Username" });
    return;
  }

  if (!req.body.password || req.body.password.length <= 0) {
    res.send({ status: 400, message: "Empty Password" });
    return;
  }
  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds);

    let sqlQuery = `INSERT INTO users(first_name, last_name, email, password, role, username) VALUES('${req.body.firstName}', '${req.body.lastName}', '${req.body.email}', '${passwordHash}', ${req.body.roleId}, '${req.body.username}');`;
    dbConn.connection.query(sqlQuery, function (err, result) {
      if (err) throw err;
      if (result) {
        res.send(result);
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;