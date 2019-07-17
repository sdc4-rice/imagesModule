const mysql = require('mysql');

require('dotenv').config();

const databaseConnection = mysql.createConnection({
  host: process.env.DB_host,
  database: process.env.DB_database,
  user: process.env.DB_user,
  password: process.env.DB_password,
});

databaseConnection.connect();

module.exports = databaseConnection;
