const { Client } = require("pg");
const config = require("./configs/config");

const connection = new Client({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
  port: config.dbPort,
});

module.exports = {
  connection,
};
