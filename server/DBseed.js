// require('dotenv').config(); // to gain access to env variables
// const seeder = require('./DBgenerate.js');
// seeder(process.env.start_id, process.env.end_id);


require('dotenv').config(); // to gain access to env variables
const fs = require('fs');
const path = require('path');
const s3mock = require('./s3mock.js');
const load = require(`../${process.env.DB_database}/seeder.js`);
const client = require(`../${process.env.DB_database}/index.js`);
// write to CSV
const fastcsv = require('fast-csv');
const copyFrom = require('pg-copy-streams').from;
const inputFile = path.join(__dirname, '/data/images.csv');
const stream = fs.createWriteStream(inputFile);
var table = 'images';

function getRandomImageURL() {
  return s3mock.mockImages[Math.floor((Math.random() * s3mock.mockImages.length))];
};

function getRandomImageCount() {
  return Math.floor(Math.random() * (5 - 3 + 1) + 3);
};

const min = process.env.start_id;
const max = process.env.end_id;



async function seed(min, max) {
  console.time('seedTime');
  let storage = [];
  for (let i = min; i <= max; i++) {
    const imageCount = getRandomImageCount();
    let imageURLs = []; // ['str1', 'str2, 'str3']
    for (let j = 0; j < imageCount; j++) {
      imageURLs.push(getRandomImageURL());
    }
    imageURLs = JSON.stringify(imageURLs);
    let row = {path: imageURLs};
    storage.push(row);
    // stream.write(Object.values(generateProduct(rows)).join(',') + '\r\n', err => err && console.log(err));
    // await load(imageURLs);
    // if (i === Number(max)) {
    //   console.log(imageURLs);
    //   client.end();
    // }
    // if(storage.length === 5000) {
    //   await fastcsv
    //     .write(storage, {headers: false})
    //     .pipe(stream);
    //   storage = [];
    // }
  }
  // write to CSV
  fastcsv
  .write(storage, {headers: false})
  .pipe(stream);
  console.timeEnd('seedTime');
};



const executeQuery = (targetTable) => {
  const execute = (target, callback) => {
    client.query(`Truncate ${target}`, (err) => {
      if (err) {
        client.end()
        callback(err)
      // return console.log(err.stack)
      } else {
        console.log(`Truncated ${target}`)
        callback(null, target)
      }
    })
  }
  execute(targetTable, (err) =>{
    if (err) return console.log(`Error in Truncate Table: ${err}`)
    var stream = client.query(copyFrom(`COPY ${targetTable} FROM STDIN`))
    var fileStream = fs.createReadStream(inputFile)

    fileStream.on('error', (error) =>{
      console.log(`Error in creating read stream ${error}`)
    })
    stream.on('error', (error) => {
      console.log(`Error in creating stream. ${error}`)
    })
    stream.on('end', () => {
      console.log(`Completed loading data into ${targetTable}`)
      client.end()
    })
    fileStream.pipe(stream);
  })
}
// Execute the function
executeQuery(table)

seed(min, max);
