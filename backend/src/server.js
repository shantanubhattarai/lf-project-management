const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./configs/config");
const apiRoute = require("./api.routes");
const dbConn = require("./dbconn");
const server = express();
const errorHandler = require("./middleware/errorHandler");

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());

dbConn.connection.connect().catch((err) => console.log(err));

server.use("/api", apiRoute);
server.use(errorHandler);
server.use(function (req, res, next) {
  next({
    msg: "Not Found",
    status: 404,
  });
});

server.listen(config.port, config.host, () => {
  console.log("server running on port:", config.port);
});
