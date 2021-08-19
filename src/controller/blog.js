const { validationResult } = require('express-validator');
const BlogPost = require('../models/blog');

module.exports = {
  createBlog: (req, res) => {
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
    const image = req.file.path;

    const Posting = new BlogPost({
      title,
      body,
      image,
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
        console.log('err: ', err);
      });
  },
};
