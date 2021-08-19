const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  author: {
    type: Object,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
