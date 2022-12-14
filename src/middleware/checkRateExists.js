const checkRateExists = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  
  if (rate === 0) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  
  if (!rate) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });

  if (typeof rate !== 'number') {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' }); 
  }

  next();
};

module.exports = checkRateExists;