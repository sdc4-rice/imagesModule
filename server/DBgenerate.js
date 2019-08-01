// require('dotenv').config(); // to gain access to env variables
// const s3mock = require('./s3mock.js');
// const seed = require(`../${process.env.DB_database}/seeder.js`);
// const databaseConnection = require(`../${process.env.DB_database}/index.js`);

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