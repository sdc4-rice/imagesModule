const connection = require('./database.js');
const mockImages = require('./s3mock.js');

const getRandomImageURL = function(){
  return mockImages[Math.floor((Math.random() * mockImages.length))];
}

const getRandomImageCount = function(){
  return Math.floor(Math.random()*(5-3+1)+3);
}

const seedDatabase = function(){
  //for 100 entries.
  for (let i = 0; i < 100; i++){
    let imageCount = getRandomImageCount();
    let imageURLs = [];
    for (let j = 0; j < imageCount; j++){
      imageURLs.push(getRandomImageURL());
    }
    let query = `insert into images (path) VALUES ('${JSON.stringify(imageURLs)}');`
    connection.query(query, function(err,results){
      if(err){
        console.log(err);
      } else {
        console.log(results);
      }
    })
  }
}

seedDatabase();
