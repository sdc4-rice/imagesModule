const express = require('express');
const cors = require('cors');
const model = require('./model.js');

const app = express();

app.use(express.static(`${__dirname}/../client/dist`));
app.use(cors());

app.get('/api/images/:id', (req, res) => {
  const params = req.params.id;
  model.getImages(params)
    .then(images => res.json(images[0]))
    .then(() => res.end())
    .catch((err) => {
      throw err;
    });
});

app.delete('/api/images/:id', (req, res) => {
  const params = req.params.id;
  model.deleteImages(params)
    // .then(message => res.send(message))
    .then(message => res.json(message))
    .catch((err) => {
      throw err;
    });
});


module.exports = app;
