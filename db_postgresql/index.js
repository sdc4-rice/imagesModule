let { Pool, Client} = require ('pg');

require('dotenv').config();

const server = '127.0.0.1:5433'; // should I be using this one on line 8?
const database = 'fec_images';
// username:password@localhost:port/DBname
const connectionString = `postgresql://${process.env.DB_user}:${process.env.DB_password}@${server}/${database}`


const client = new Client({
  connectionString: connectionString
})

client.connect(err => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected to PostresQL');
  }
});

module.exports = client;
