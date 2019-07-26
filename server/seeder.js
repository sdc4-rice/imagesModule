const databaseConnection = require('./database.js');
const s3mock = require('./s3mock.js');

function getRandomImageURL() {
  return s3mock.mockImages[Math.floor((Math.random() * s3mock.mockImages.length))];
}

function getRandomImageCount() {
  return Math.floor(Math.random() * (5 - 3 + 1) + 3);
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

function seedDatabase(min, max) {

  for (let i = min; i <= max; i += 1) {
    const query1 = `INSERT INTO images(path) VALUES ('{"arr": []}');`;
    databaseConnection.query(query1, (err, results) => {
      if (err) {
        throw (err);
      } else {
        console.log('inserted array!');
        console.log(results);
      }
    });
    const imageCount = getRandomImageCount();


    for (let j = 0; j < imageCount; j += 1) {
      const query2 = `select json_length(path, '$.arr') into @url_counter from images where id = ${i};`;
      databaseConnection.query(query2, (err, results) => {
        if (err) {
          throw (err);
        } else {
          console.log('url_counter is grabbed');
          console.log(results);
        }
      });
      const url = JSON.stringify(getRandomImageURL());
      const query3 = `update images set path=json_set(path, concat('$.arr[',cast(@url_counter as char(20)),']'), ${url}) where id = ${i};`;
                      // update images set path=json_set(path, concat('$.arr[',cast(@url_counter as char(20)),']'), 'test3') where id=100;
      databaseConnection.query(query3, (err, results) => {
        if (err) {
          throw (err);
        } else {
          console.log('url is pushed to arr');
          console.log(results);
        }
      });
    }
  }


}

module.exports = {
  getRandomImageURL,
  getRandomImageCount,
  setTableStart,
  seedDatabase,
};
