/*
ONCE USED AS A GENERATE MODULE BEFORE LOADING,
BUT NOW ALL SEEDING HAPPENS ON ONE FILE
AND THIS IS NOT USED CURRENTLY
BUT WAS USED BEFORE IN A DIFF STRUCTURE FOR
VARIOUS THINGS AS HELPERS
*/
require('dotenv').config(); // to gain access to env variables
const path = require('path');
const pool = require(`../${process.env.DB_choice}/index.js`);
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const table = process.env.DB_table;
// const inputFile = path.join(__dirname, '/data/images.csv');

const dropTableQuery = `DROP TABLE images;`;
const createTableQuery = `CREATE TABLE images (path text);`;
const copyTableQuery = "copy images (path) from ./images.csv with (format 'csv');";

/* BELOW WAS LOOPING THROUGH EXISTING CSV FILES AND
in 1st variation with postgres running on docker:
  transcferring each csv to docker so I
could manually run copy command like Will did but still some of the data
will be lost even though here on local machine I had correct number of rows
in 2nd variation with postgres running on local machine:

*/
async function executeQuery(count) {
  for(k = 1; k <= count; k++) {
    const inputFile = path.join(__dirname, `/data/${table}${k}.csv`);
    await exec(`docker cp ${inputFile} postgres_db_1:/${table}${k}.csv`)
  }
  // const { stdout, stderr } = await exec(`docker cp ${inputFile} postgres_db_1:/images.csv`);
  // if (stdout) console.log('stdout:', stdout);
  // if (stderr) throw stderr;


  // pool.query(dropTableQuery)
  // .then(() => pool.query(createTableQuery))
  // .then(() => console.time('copy'))
  // .then(() => pool.query(copyTableQuery))
  // .then(() => console.timeEnd('copy'))
  // .catch(err => console.log(err));
}

// module.exports = executeQuery;
// require('dotenv').config(); // to gain access to env variables
// const s3mock = require('./s3mock.js');
// const seed = require(`../${process.env.DB_choice}/seeder.js`);
// const databaseConnection = require(`../${process.env.DB_choice}/index.js`);

// function getRandomImageURL() {
//   return s3mock.mockImages[Math.floor((Math.random() * s3mock.mockImages.length))];
// }

// function getRandomImageCount() {
//   return Math.floor(Math.random() * (5 - 3 + 1) + 3);
// }

// async function seedDatabase(min, max) {
//   for (let i = min; i <= max; i++) {
//     const imageCount = getRandomImageCount();
//     let imageURLs = []; // ['str1', 'str2, 'str3']
//     for (let j = 0; j < imageCount; j++) {
//       imageURLs.push(getRandomImageURL());
//     }
//     imageURLs = JSON.stringify(imageURLs);
//     await seed(imageURLs);
//     if (i === max) {
//       databaseConnection.end();
//     }
//   }
// }

// module.exports = seedDatabase;



// const executeQuery = (targetTable) => {
//   const execute = (target, callback) => {
//     client.query(`Truncate ${target}`, (err) => {
//       if (err) {
//         client.end()
//         callback(err)
//       // return console.log(err.stack)
//       } else {
//         console.log(`Truncated ${target}`)
//         callback(null, target)
//       }
//     })
//   }
//   execute(targetTable, (err) => {
//     if (err) return console.log(`Error in TruncateTable: ${err}`)
//     var stream = client.query(copyFrom(`COPY {targetTable} FROM STDIN`))
//     var fileStream = fs.createReadStream(inputFile)

//     fileStream.on('error', (error) =>{
//       console.log(`Error in creating read stream ${error}`)
//     })
//     stream.on('error', (error) => {
//       console.log(`Error in creating stream ${error}`);
//     })
//     stream.on('end', () => {
//       console.log(`Completed loading data into {targetTable}`)
//       client.end()
//     })
//     fileStream.pipe(stream);
//   })
// }
// // Execute the function
// executeQuery(table)