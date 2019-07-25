const DatabaseConnection = require('./database.js');

function getImages(params) {
  const query = 'select path from images WHERE id = ?';
  return new Promise((resolve, reject) => {
    DatabaseConnection.query(query, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

function deleteImages(params) {
  const query = 'delete from images WHERE id = ?';
  return new Promise((resolve, reject) => {
    DatabaseConnection.query(query, params, (err, message) => {
      if (err) {
        reject(err);
      } else {
        resolve(message);
      }
    });
  });
}

module.exports = {
  getImages,
  deleteImages,
};
