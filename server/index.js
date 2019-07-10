const express = require('express');
const getImages = require('./model.js');
const app = express();
const port = 3003;

// app.use(express.static('public'));

app.get(`/api/images/:id`, function(req, res){
  var params = [];
  params[0] = req.params.id;
  getImages(params)
  .then( (images) => res.send(images).status(200)).catch(err => {
    throw err;
  })
})

app.listen(port);
