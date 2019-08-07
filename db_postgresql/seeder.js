const databaseConnection = require('./index.js');
const generatedData = require('../server/DBgenerate.js');
// const s3mock = require('../server/s3mock.js');
// // const promise = require('bluebird');

// function getRandomImageURL() {
//   return s3mock.mockImages[Math.floor((Math.random() * s3mock.mockImages.length))];
// }

// function getRandomImageCount() {
//   return Math.floor(Math.random() * (5 - 3 + 1) + 3);
// }

// function loadToDB(query) {
//   return new Promise((resolve, reject) => {
//     databaseConnection.query(query, (err, results) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(results);
//       }
//     });
//   })
// };

async function seedDatabase(imageURLs) {
  const query = `insert into images (path) VALUES (\'{"arr":${imageURLs}}\'::jsonb);`;
  // for (let i = min; i <= max; i++) {
    //   console.log(i);
    //   const imageCount = getRandomImageCount();
    //   let imageURLs = []; // ['str1', 'str2, 'str3']
    //   for (let j = 0; j < imageCount; j++) {
      //     imageURLs.push(getRandomImageURL());
      //   }
      //   imageURLs = JSON.stringify(imageURLs);
      //   const query = `insert into images (path) VALUES (\'{"arr":${imageURLs}}\'::jsonb);`;

      //   await seed(query);
      // }
      return new Promise((resolve, reject) => {
        databaseConnection.query(query, (err, results) => {
          if (err) {
            reject(err);
          } else {
            console.log('seeded');
          resolve(results);
        }
      });
    })
  // databaseConnection.end();
}
// async function seedDatabase(min, max) {
//   for (let i = min; i <= max; i++) {
//     console.log(i);
//     const imageCount = getRandomImageCount();
//     let imageURLs = []; // ['str1', 'str2, 'str3']
//     for (let j = 0; j < imageCount; j++) {
//       imageURLs.push(getRandomImageURL());
//     }
//     imageURLs = JSON.stringify(imageURLs);
//     const query = `insert into images (path) VALUES (\'{"arr":${imageURLs}}\'::jsonb);`;

//     await seed(query);
//   }
//   databaseConnection.end();
// }

module.exports = seedDatabase;
