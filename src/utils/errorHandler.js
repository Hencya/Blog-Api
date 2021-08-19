const errorHandler = ((error, req, res) => {
  const status = error.errorStatus || 500;
  const { message, data } = error;

  res.status(status).json({ message, data });
});

module.exports = errorHandler;
