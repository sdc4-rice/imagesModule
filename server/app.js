const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const model = require('./model.js');

require('dotenv').config(); // to gain access to env variables
const db = require(`../${process.env.DB_database}`);

const app = express();

app.use(express.static(`${__dirname}/../client/dist`));
app.use(bodyParser.json());
app.use(cors());


app.get('/api/images/:id', (req, res) => {
  const params = req.params.id;
  res.send(params);
})



// app.get('/api/images/:id', (req, res) => {
//   const params = req.params.id;
//   model.getImages(params)
//     // .then(images => res.send(images[0]).status(200))
//     .then(images => res.json(images[0]))
//     .catch((err) => {
//       throw err;
//     });
// });

// app.delete('/api/images/:id', (req, res) => {
//   const params = req.params.id;
//   model.deleteImages(params)
//     .then(message => res.json(message))
//     .catch((err) => {
//       throw err;
//     });
// });

// app.post('/api/images/', (req, res) => {
//   const params = JSON.stringify(req.body.path);
//   model.postImages(params)
//     .then(message => res.json(message))
//     .catch((err) => {
//       throw err;
//     });
// });

// app.put('/api/images/:id', (req, res) => {
//   const params = req.params.id;
//   const params1 = [JSON.stringify(req.params.path), req.params.id];
//   model.getJSONlength(params)
//     .then((message) => model.addToJSONarray(params1))
//     .then(message => res.json(message))
//     .catch((err) => {
//       throw err;
//     });
// });

module.exports = app;
