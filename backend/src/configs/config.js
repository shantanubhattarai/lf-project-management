require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  dbPort: process.env.DB_PORT,
  jwtSecret: process.env.SECRET,
};
