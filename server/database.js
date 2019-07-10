const mysql = require('mysql');

const DatabaseConnection = mysql.createConnection({
  host: 'localhost',
  database: 'fecimage',
  user: 'root',
  password: 'MattM',
})

DatabaseConnection.connect();

module.exports = DatabaseConnection;
