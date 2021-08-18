const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');

const port = 3000;
const host = 'localhost';

app.use(bodyParser.json()); // middleware json

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Header', 'Content-Type', 'Authorization');
  next();
});

app.use('/api/v1/', authRoutes);
app.use('/api/v1/', blogRoutes);

app.listen(port);
console.log(`Server bejalan di http://${host}:${port}`);
