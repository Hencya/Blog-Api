module.exports = {
  getAllProducts: (req, res, next) => {
    res.json({
      message: 'Get all products success',
      data: {
        id: 1,
        name: 'Sari gandum',
        price: 8000,
      },
    });
    next();
  },

  createProduct: (req, res, next) => {
    res.json({
      message: 'Create product success',
      data: {
        id: 1,
        name: 'Sari gandum',
        price: 8000,
      },
    });
    next();
  },
};
