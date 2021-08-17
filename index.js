const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const productRoutes = require('./src/routes/products');

const port = 3000;
const host = 'localhost';

app.use(bodyParser.json()); // middleware json

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Header', 'Content-Type', 'Authorization');
  next();
});

app.use('/api/v1/', productRoutes);

app.listen(port);
console.log(`Server bejalan di http://${host}:${port}`);
