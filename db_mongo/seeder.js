require('dotenv').config(); // to gain access to env variables

const db = require('./index.js');
const s3mock = require('../server/s3mock.js');


function getRandomImageURL() {
  return s3mock.mockImages[Math.floor((Math.random() * s3mock.mockImages.length))];
}

function seedData(min, max) {
  // this is seeding data
  db.connection.drop();
  console.time('seedTimeMongo');
  for (let i = min; i < max; i++) {
  // for each listing we'll generate a random number of urls and store images for each listing as an array
    let path = [];
    // for each listing generate a random number of images
    let inputs = Math.ceil(Math.random() * (5 - 3 + 1) + 3);
    for (let j = 0; j < inputs; j++) {
      path.push(getRandomImageURL());
    }

    // this is loading data
    let listing = new db.model({
      id: i,
      path: path,
    });
    listing.save((error, document, rows) => {
      if (error) {
        console.log(`something went wrong. Error saving a document to database`);
      } else {
        if( i === 999) {
          db.connection.close();
          console.timeEnd('seedTimeMongo');
        }
      }
    })
  }
}

module.exports = seedData;
