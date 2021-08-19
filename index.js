const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const multer = require('multer');
const multerUtils = require('./src/utils/multer');
const errorHandler = require('./src/utils/errorHandler');
// Config
dotenv.config();

const app = express();

const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');

// middleware
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(multer({ storage: multerUtils.fileStorage, fileFilter: multerUtils.imageFilter }).single('image'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Header', 'Content-Type', 'Authorization');
  next();
});

app.use('/api/v1/', authRoutes);
app.use('/api/v1/', blogRoutes);

app.use(errorHandler);

// connecting to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  app.listen(process.env.PORT_DEV || process.env.PORT_PROD, () => {
    console.log(`Server bejalan di http://${process.env.HOST_DEV}:${process.env.PORT_DEV}`);
  });
}).catch((err) => console.log(err));
