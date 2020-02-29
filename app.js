const express = require('express');
const bodyParser = require('body-parser');

const isProduction = process.env.NODE_ENV === 'production';


const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


if (!isProduction) {
  app.use(errorhandler());
}
