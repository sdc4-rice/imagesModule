const express = require('express');
const getImages = require('./model.js');
const cors = require('cors');

const app = express();

app.use(express.static(`${__dirname}/../client/dist`));
app.use(cors());

app.get('/api/images/:id', (req, res) => {
  const params = req.params.id;
  getImages(params)
    .then(images => res.send(images[0]).status(200))
    .then(() => res.end())
    .catch((err) => {
      throw err;
    });
});

module.exports = app;
