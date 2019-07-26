const DatabaseConnection = require('./database.js');

function getImages(params) {
  const query = 'SELECT path FROM images WHERE id = ?';
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
// delete all images from a certain listing
function deleteImages(params) {
  const query = 'DELETE FROM images WHERE id = ?';
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
// create a listing with pictures
function postImages(params) {
  const query = 'INSERT INTO images(path) VALUES(?)';
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
  postImages,
};
