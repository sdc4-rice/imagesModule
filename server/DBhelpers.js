require('dotenv').config(); // to gain access to env variables
const pool = require(`../${process.env.DB_choice}`);

function getImages(params) {
  const values = [];
  values.push(params);
  console.log('requesting from database data on id# ', values);
  const query = {
    name: 'fetch-images',
    text: `SELECT * FROM images WHERE id = $1;`,
    values,
  }

  return new Promise((resolve, reject) => {
    pool.query(query, (err, results) => {
      if (err) {
        console.log('err from pool.query: ', err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

// getImages();
module.exports = {
  getImages
}
