const checkRateExists = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;

  if (!rate) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });

  next();
};

module.exports = checkRateExists;