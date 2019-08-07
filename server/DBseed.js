require('dotenv').config();
const fs = require('fs');
const path = require('path');
const fastcsv = require('fast-csv');
const s3mock = require('./s3mock.js');
const pool = require(`../${process.env.DB_choice}/index.js`);
const inputFile = path.join(__dirname, '/data/images.csv');
const stream = fs.createWriteStream(inputFile);
const table = process.env.DB_table;

function getRandomImageURL() {
  return s3mock.mockImages[Math.floor((Math.random() * s3mock.mockImages.length))];
};
function getRandomImageCount() {
  return Math.floor(Math.random() * (5 - 3 + 1) + 3);
};

async function seed() {
  console.time('seedTime');

  let storage = [];
  for (let i = 1; i <= 100; i++) {
    const imageCount = getRandomImageCount();
    let imageURLs = [];
    for (let j = 0; j < imageCount; j++) {
      imageURLs.push(getRandomImageURL());
    }
    imageURLs = JSON.stringify(imageURLs);
    let row = {path: imageURLs};
    storage.push(row);
  }
  fastcsv
  .write(storage, {headers: false})
  .pipe(stream);
  for (k = 1; k <= 100000; k++) {
    await executeQuery()
  }
  executeExit()
};

const copyTableQuery = `\copy images(path) from '${inputFile}' with (format 'csv');`;
const getQuery = `\select count(*) from ${table};`;
const indexingQuery = `\create index index_id on images(id);`;

function executeQuery() {
  pool.query(copyTableQuery)
  .catch((err) => console.log('from executeQuery: ', err))
}

async function executeExit() {
  console.log('created CSV, querring count of rows and executing exit connection');
  setTimeout(function(){
    pool.query(getQuery)
    .then((res) => console.log(res.rows))
    .then(() => console.timeEnd('seedTime'))
    .then(() => console.log('pool has drained'))
    .then(() => pool.query(indexingQuery))
    .then(() => pool.end((process.exit(0))))
    .catch((err) => console.log('from executeExit: ', err))
  }, 500);
}

seed();
