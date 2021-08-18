module.exports = {
  register: (req, res) => {
    const { name, email } = req.body;

    const result = {
      message: 'Register Succes',
      data: {
        id: 1,
        name,
        email,
      },
    };
    res.status(201).json(result);
  },
};
