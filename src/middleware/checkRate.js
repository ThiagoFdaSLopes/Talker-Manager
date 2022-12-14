const checkRate = (req, res, next) => {
  const { rate } = req.body.talk;

  if (![1, 2, 3, 4, 5].includes(rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
};

module.exports = checkRate;