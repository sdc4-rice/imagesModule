const seeder = require('./seeder.js');

const min = 100;
const max = 200;

seeder.setTableStart(min)
  .then(seeder.seedDatabase(min, max));
