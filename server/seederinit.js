const seeder = require('./seeder.js');

const min = 100;
const max = 300;

seeder.truncateImageTable()
  .then(seeder.setTableStart(min))
  .then(seeder.seedDatabase(min, max));
