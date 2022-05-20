const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');

// mongoose configuaration

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {}).then((con) => {
  // console.log(con.connection);
  console.log('Database successfully connected');
});
// end of mongoose config
const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening or Portal ${port}`);
});

// console.log(process.env);
// console.log(app.get('env'));
