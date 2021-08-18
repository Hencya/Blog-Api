const express = require('express');

const router = express.Router();

const blogController = require('../controller/blog');

router.post('/post', blogController.createBlog);

module.exports = router;
