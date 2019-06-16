const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CategoryDB');

const app = express();

//Routes
const category = require('./routes/category');

//middlewares
app.use(logger('dev'));
app.use(bodyParser.json());

//Routes
app.use('/category', category);

//Catch 404 errors and forward them to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  next(err);
});

//error handler function
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;

  //Respond to clients
  res.status(status).json({
    error: {
      message: error.mesage
    }
  });

  //Respond to ourselves
  console.error(err);
});

//start the server

const port = app.get('port') || 3000;
app.listen(port, () => console.log('Server is listening on port ${port}'));
