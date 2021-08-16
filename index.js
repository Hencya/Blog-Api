const express = require('express');

const app = express();

const productRoutes = require('./src/routes/products');

const port = 3000;
const host = 'localhost';

app.use('/', productRoutes);

app.listen(port);
console.log(`Server bejalan di http://${host}:${port}`);
