const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const app = express();

const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');

const port = 3000;
const host = 'localhost';

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});

const imageFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png'
    || file.mimetype === 'image/jpg'
    || file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// middleware
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(multer({ storage: fileStorage, fileFilter: imageFilter }).single('image'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Header', 'Content-Type', 'Authorization');
  next();
});

app.use('/api/v1/', authRoutes);
app.use('/api/v1/', blogRoutes);

app.use((error, req, res) => {
  const status = error.errorStatus || 500;
  const { message, data } = error;

  res.status(status).json({ message, data });
});

mongoose.connect('mongodb+srv://admin:root@cluster0.ql8d0.mongodb.net/Blog-Database?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  app.listen(port, () => {
    console.log(`Server bejalan di http://${host}:${port}`);
  });
}).catch((err) => console.log(err));
