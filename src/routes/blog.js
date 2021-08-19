const express = require('express');

const router = express.Router();

const blogController = require('../controller/blog');

const errorHandlerBlog = require('../validator/blog');

router.post('/post', errorHandlerBlog.createBlogError, blogController.createBlog);
router.get('/posts', blogController.getAllBlogPosts);
router.get('/post/:postId', blogController.getBlogPostById);
module.exports = router;
