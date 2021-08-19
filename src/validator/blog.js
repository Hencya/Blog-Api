const { body } = require('express-validator');

exports.BlogError = [
  body('title').isLength({ min: 5 }).withMessage('Input title tidak sesuai'),
  body('body').isLength({ min: 5 }).withMessage('Input title tidak sesuai'),
];
