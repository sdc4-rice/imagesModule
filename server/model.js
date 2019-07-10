const database = require('./database.js');

const getImages = function(params){
  var query = "select * from images WHERE id = ?;";
  return new Promise( (resolve, reject) => {
    database.query(query, params, function(err,results){
      if (err){
        reject(err);
      } else{
        resolve(results);
      }
    })
  })
}

module.exports = getImages;
