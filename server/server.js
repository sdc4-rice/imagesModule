const app = require('./app');
require('dotenv').config();
const port = process.env.server_port;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
