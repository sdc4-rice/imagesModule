const databaseConnection = require('./database.js');
const s3mock = require('./s3mock.js');

function getRandomImageURL() {
  return s3mock.mockImages[Math.floor((Math.random() * s3mock.mockImages.length))];
}

function getRandomImageCount() {
  return Math.floor(Math.random() * (5 - 3 + 1) + 3);
}

function truncateImageTable() {
  const initializeQuery = 'TRUNCATE TABLE images;';
  return new Promise((resolve, reject) => {
    databaseConnection.query(initializeQuery, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

function setTableStart(min) {
  const initializeQuery = `ALTER TABLE images AUTO_INCREMENT = ${min};`;
  return new Promise((resolve, reject) => {
    databaseConnection.query(initializeQuery, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

function seedDatabase(min = 0, max = 99) {
  for (let i = min; i <= max; i += 1) {
    const imageCount = getRandomImageCount();
    const imageURLs = [];
    for (let j = 0; j < imageCount; j += 1) {
      imageURLs.push(getRandomImageURL());
    }
    const query = `insert into images (path) VALUES ('${JSON.stringify(imageURLs)}');`;
    databaseConnection.query(query, (err, results) => {
      if (err) {
        throw (err);
      } else {
        console.log(results);
      }
    });
  }
}

module.exports = {
  getRandomImageURL,
  getRandomImageCount,
  truncateImageTable,
  setTableStart,
  seedDatabase,
};
