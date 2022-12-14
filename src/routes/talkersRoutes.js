const express = require('express');
const readFile = require('../utils/fs/readFile');

const router = express.Router();

router.post('/login', (req, res) => {
  res.status(200).json({ message: 'Criando Rota' });
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