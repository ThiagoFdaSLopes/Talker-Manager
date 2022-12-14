const express = require('express');
const readFile = require('../utils/fs/readFile');
const checkEmail = require('../middleware/checkEmail');
const checkPassword = require('../middleware/checkPassword');
const tokenGenerator = require('../utils/Generator/tokenGenerator');

const router = express.Router();

router.post('/login', checkEmail, checkPassword, (req, res) => {
  const tokenId = tokenGenerator();
  res.status(200).json({ token: `${tokenId}` });
});

router.get('/talker', async (_req, res) => {
  const db = await readFile();
  res.status(200).json(db);
});

router.get('/talker/:id', async (req, res) => {
  const { id } = req.params;

  const data = await readFile();

  const talker = data.find((e) => e.id === Number(id));

  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  
  res.status(200).json(talker);
});

module.exports = router;