const mongoose = require('mongoose');

const db = mongoose.connection;

const server = '127.0.0.1:27017';
const database = 'fec_images';
mongoose.connect(`mongodb://${server}/${database}`, { useNewUrlParser: true });

db.on('error', console.error.bind(console, 'CONNECTION ERROR:'));
db.once('open', () => {
  console.log(`CONNECTED TO DATABASE ${database}`);
});

const imagesSchema = new mongoose.Schema({
  id: Number,
  path: Array,
});

const Images = mongoose.model('Images', imagesSchema);

// function getData(params, callback) {
// Images.find({id: params}, (error, data) => {
//   if (error) {
//     console.log(error);
//   } else {
//     // console.log(data);
//     callback(data);
//   }
// });
// }
// module.exports.getData = getData;

module.exports = {
  connection: db,
  model: Images,
  schema: imagesSchema,
};
