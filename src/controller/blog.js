/* eslint-disable no-param-reassign */
const { validationResult } = require('express-validator');
const BlogPost = require('../models/blog');
const removeImage = require('../utils/removeImage');

module.exports = {
  createBlog: (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = new Error('Invalid Value');
      err.errorStatus = 400;
      err.data = errors.array();
      throw err;
    }

    if (!req.file) {
      const err = new Error('Missing image');
      err.errorStatus = 422;
      throw err;
    }

    const { title, body } = req.body;

    const Posting = new BlogPost({
      title,
      body,
      imageUrl: `images/${req.file.filename}`,
      author: {
        uid: 1,
        name: 'Faiz Rofi Hencya',
      },
    });

    Posting.save()
      .then((result) => {
        res.status(201).json({
          message: 'Create Blog Post Success',
          data: result,
        });
      })
      .catch((err) => {
        next(err);
      });
  },

  getAllBlogPosts: (req, res, next) => {
    BlogPost.find()
      .then((result) => {
        res.status(200).json({
          message: 'Succes',
          data: result,
        });
      })
      .catch((err) => {
        next(err);
      });
  },

  getBlogPostById: (req, res, next) => {
    const { postId } = req.params;
    BlogPost.findById(postId)
      .then((result) => {
        if (!result) {
          const error = new Error('Postingan tidak ada ');
          error.errorStatus = 404;
          throw error;
        }

        res.status(200).json({
          message: 'Succes',
          data: result,
        });
      })
      .catch((err) => {
        next(err);
      });
  },

  updateBlogPostById: (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = new Error('Invalid Value');
      err.errorStatus = 400;
      err.data = errors.array();
      throw err;
    }

    if (!req.file) {
      const err = new Error('Missing image');
      err.errorStatus = 422;
      throw err;
    }

    const { title, body } = req.body;
    const image = `images/${req.file.filename}`;
    const { postId } = req.params;

    BlogPost.findById(postId)
      .then((post) => {
        if (!post) {
          const error = new Error('Postingan tidak ada');
          error.errorStatus = 404;
          throw error;
        }

        removeImage(post.imageUrl);
        post.title = title;
        post.body = body;
        post.imageUrl = image;

        return post.save();
      })
      .then((result) => {
        res.status(200).json({
          message: 'Update Blog Post Success',
          data: result,
        });
      })
      .catch((err) => {
        next(err);
      });
  },

  deleteBlogPostById: (req, res, next) => {
    const { postId } = req.params;

    BlogPost.findById(postId)
      .then((post) => {
        if (!post) {
          const error = new Error('Postingan tidak ada');
          error.errorStatus = 404;
          throw error;
        }

        removeImage(post.imageUrl);
        return BlogPost.findByIdAndRemove(postId);
      })
      .then((result) => {
        res.status(200).json({
          message: 'Succes',
          data: result,
        });
      })
      .catch((err) => {
        next(err);
      });
  },
};
