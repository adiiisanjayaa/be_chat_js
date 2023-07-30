const { Pool } = require("pg");
const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "dbBEChatJS",
  user: "postgres", // the username you used when creating the todo table in postgres
  password: "postgres",
});
module.exports = pool;
