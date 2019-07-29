require('dotenv').config(); // to gain access to env variables
const seeder = require(`../${process.env.DB_database}/seeder.js`);


seeder();
