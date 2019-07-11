const databaseConnection = require('./database.js');
const s3mock = require('./s3mock.js');

const getRandomImageURL = function () {
  return s3mock.mockImages[Math.floor((Math.random() * s3mock.mockImages.length))];
};

const getRandomImageCount = function () {
  return Math.floor(Math.random() * (5 - 3 + 1) + 3);
};

const truncateImageTable = function () {
  const initializeQuery = 'TRUNCATE TABLE images;';
  databaseConnection.query(initializeQuery, (err, results) => {
    if (err) {
      throw (err);
    } else {
      console.log(results);
    }
  });
};

const setTableStart = function (min) {
  const initializeQuery = `ALTER TABLE images AUTO_INCREMENT = ${min};`;
  databaseConnection.query(initializeQuery, (err, results) => {
    if (err) {
      throw (err);
    } else {
      console.log(results);
    }
  });
};

const seedDatabase = function (min = 0, max = 99) {
  truncateImageTable();
  setTableStart(min);
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
};

module.exports = {
  getRandomImageURL,
  getRandomImageCount,
  truncateImageTable,
  setTableStart,
  seedDatabase,
};
