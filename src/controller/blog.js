const { validationResult } = require('express-validator');

module.exports = {
  createBlog: (req, res, next) => {
    const { title, body } = req.body;
    const createdAt = new Date().toISOString().split('T')[0];

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const err = new Error('Invalid Value');
      err.errorStatus = 400;
      err.data = errors.array();
      throw err;
    }

    const result = {
      message: 'Create Blog Post Success',
      data: {
        post_id: 1,
        title,
        image: 'imagefile.png',
        body,
        created_at: createdAt,
        author: {
          uid: 1,
          name: 'Testing',
        },
      },
    };

    res.status(201).json(result);
    next();
  },
};
