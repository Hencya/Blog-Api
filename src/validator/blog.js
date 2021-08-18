const { body } = require('express-validator');

exports.createBlogError = [
  body('title').isLength({ min: 5 }).withMessage('Input title tidak sesuai'),
  body('body').isLength({ min: 5 }).withMessage('Input title tidak sesuai'),
];
