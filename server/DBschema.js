require('dotenv').config(); // to gain access to env variables
const pool = require(`../${process.env.DB_choice}/index.js`);

const dropTableQuery = `\DROP TABLE IF EXISTS images;`;
const createTableQuery = `\CREATE TABLE images (id serial, path text);`;

function executeCreateTable() {
  pool.query(dropTableQuery)
    .then(() => pool.query(createTableQuery))
    .then(() => console.log('table created'))
    .then(() => pool.end((process.exit(0))))
    .catch(err => console.log('from CREATE TABLE', err));
}

executeCreateTable();
