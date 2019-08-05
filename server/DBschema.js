require('dotenv').config(); // to gain access to env variables
const pool = require(`../${process.env.DB_choice}/index.js`);


// const dropDBQuery = `DROP DATABASE IF EXISTS fec_images;`;
// const createDBQuery = `CREATE DATABASE fec_images;`;
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


/*
this is a helper module to truncate table images
*/
// const truncateTableQuery = 'truncate images';
// console.time('truncating');

// function executeTruncateQuery() {
//   pool.query(truncateTableQuery)
//   .then(() => console.log('ran truncate command'))
//   .then(() => console.timeEnd('truncating'))
//   .then(() => pool.end((process.exit(0))))
//   .catch(err => console.log(err));
// }

// executeTruncateQuery();
// module.exports = executeTruncateQuery;