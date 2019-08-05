const app = require('./app');
require('dotenv').config(); // to gain access to env variables
const port = process.env.server_port;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
