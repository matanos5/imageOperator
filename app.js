const express = require('express');
const bodyParser = require('body-parser');
const errorhandler = require('errorhandler');
const isProduction = process.env.NODE_ENV || 'production';
const compression = require('compression');
const app = express();


app.use(bodyParser.raw({limit: '10mb', type: ['image/*']}));
app.use(bodyParser.text({limit: '10mb'}));
app.use(compression());

if (!isProduction) {
  app.use(errorhandler());
}

app.use(require('./routes'));
// Redirect 404's to err handler
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Dev err handler (With stack traces)
if (!isProduction) {
  app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(err.status || 500);
    res.json({'errors': {
      message: err.message,
      error: err,
    }});
  });
} else {
// Production user err handler (No stack traces)
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({'errors': {
      message: err.message,
      error: {},
    }});
  });
}

const server = app.listen( process.env.PORT || 3000,
    () => console.log('Listening on port ' + server.address().port));
