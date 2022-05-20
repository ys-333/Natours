const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');

// mongoose configuaration

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {}).then((con) => {
  console.log(con.connection);
  console.log('Database successfully connected');
});
// end of mongoose config
const app = require('./app');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour name is required'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour price is requried'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const tourTest = new Tour({
  name: 'thevibeinme Camper',
  rating: 5,
  price: 322,
});

tourTest
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log('Error Caught:', err);
  });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening or Portal ${port}`);
});

// console.log(process.env);
// console.log(app.get('env'));
