/* eslint-disable no-param-reassign */
const path = require('path');
const fs = require('fs');

const removeImage = (filePath) => {
  filePath = path.join(__dirname, '../..', filePath);
  fs.unlink(filePath, (err) => { if (err) { console.log(err); } });
};

module.exports = removeImage;
