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
// create a listing with images
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

function getJSONlength(params) {
  const query = `select json_length(path, '$.arr') into @url_counter from images where id = (?);`// depending on ID
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

function addToJSONarray(params) {
  const query = `update images set path=json_set(path, concat('$.arr[',cast(@url_counter as char(20)),']'), '?') where id=?;` // which row you want to add value to?
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
  getJSONlength,
  addToJSONarray,
};
