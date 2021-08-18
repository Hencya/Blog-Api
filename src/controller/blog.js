const { validationResult } = require('express-validator');
const BlogPost = require('../models/blog');

module.exports = {
  createBlog: (req, res) => {
    const { title, body } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = new Error('Invalid Value');
      err.errorStatus = 400;
      err.data = errors.array();
      throw err;
    }

    const Posting = new BlogPost({
      title,
      body,
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
