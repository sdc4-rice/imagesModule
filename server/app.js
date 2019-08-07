require('dotenv').config(); // to gain access to env variables
require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const model = require('./DBhelpers.js');

const app = express();

app.use(express.static(`${__dirname}/../client/dist`));
app.use(bodyParser.json());
app.use(cors());


app.get('/api/images/:id', (req, res) => {
  const params = req.params.id;
  model.getImages(params)
    .then(images => res.send(images.rows[0]))
    .catch((err) => {
      console.log('err from app.get function: ', err);
    });
});

module.exports = app;
