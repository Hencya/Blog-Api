const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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

app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const { message, data } = error;

  res.status(status).json({ message, data });
  next();
});

mongoose.connect('mongodb+srv://admin:root@cluster0.ql8d0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  app.listen(port, () => {
    console.log(`Server bejalan di http://${host}:${port}`);
  });
}).catch((err) => console.log(err));
