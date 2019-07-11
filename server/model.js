const DatabaseConnection = require('./database.js');

const getImages = function (params) {
  const query = 'select * from images WHERE id = ?;';
  return new Promise((resolve, reject) => {
    DatabaseConnection.query(query, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = getImages;
