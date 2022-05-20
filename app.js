const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1.Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// expresss.json() to attach body to req.body
app.use(express.json());
// to serve static files
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
  req.currentTime = new Date().toISOString();

  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
