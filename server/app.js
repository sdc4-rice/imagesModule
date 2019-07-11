const express = require('express');
const getImages = require('./model.js');

const app = express();

app.get('/api/images/:id', (req, res) => {
  const params = req.params.id;
  getImages(params)
    .then(images => res.send(images).status(200))
    .then(() => res.end())
    .catch((err) => {
      throw err;
    });
});

module.exports = app;
