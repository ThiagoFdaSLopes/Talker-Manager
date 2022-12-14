const express = require('express');
const readFile = require('../utils/fs/readFile');

const router = express.Router();

router.get('/talker', async (_req, res) => {
  const db = await readFile();
  res.status(200).json(db);
});

module.exports = router;