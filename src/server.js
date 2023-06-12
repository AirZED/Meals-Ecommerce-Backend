const dotenv = require('dotenv');
dotenv.config({
  path: `${__dirname}/../config.env`,
});

const app = require('./app');
const db = require('./db');
// starting database
db();

const port = process.env.PORT || 3030;
app.listen(port, () => {
  console.log(`Server has started on port ${port}`);
});
