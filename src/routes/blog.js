const express = require('express');

const router = express.Router();

const blogController = require('../controller/blog');

const errorHandlerBlog = require('../validator/blog');

router.post('/post', errorHandlerBlog.BlogError, blogController.createBlog);
router.get('/posts', blogController.getAllBlogPosts);
router.get('/post/:postId', blogController.getBlogPostById);
router.put('/post/:postId', errorHandlerBlog.BlogError, blogController.updateBlogPostById);
router.delete('/post/:postId', blogController.deleteBlogPostById);
module.exports = router;
