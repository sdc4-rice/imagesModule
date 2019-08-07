let { Pool, Client} = require ('pg');

require('dotenv').config();

const pool = new Pool({
  user: `${process.env.DB_user}`,
  host: `${process.env.DB_host}`,
  database: `${process.env.DB_database}`,
  port: `${process.env.DB_port}`
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack)
  }else {
    console.log(`connected to PostresQL via port ${process.env.DB_port}!!!`);
  }
});

module.exports = pool;
