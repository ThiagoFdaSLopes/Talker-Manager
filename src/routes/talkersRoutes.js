const express = require('express');

const router = express.Router();

router.get('/talker', (req, res) => {
  res.status(200).json({ message: 'Estou aqui' });
});

module.exports = router;