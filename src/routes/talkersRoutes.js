const express = require('express');
const readFile = require('../utils/fs/readFile');
const writeFile = require('../utils/fs/writeFile');
const checkEmail = require('../middleware/checkEmail');
const checkPassword = require('../middleware/checkPassword');
const tokenGenerator = require('../utils/Generator/tokenGenerator');
const checkToken = require('../middleware/checkToken');
const checkName = require('../middleware/checkName');
const checkAge = require('../middleware/checkAge');
const checkTalk = require('../middleware/checkTalk');
const checkWatchedAt = require('../middleware/checkWatchedAt');
const checkRate = require('../middleware/checkRate');
const checkRateExists = require('../middleware/checkRateExists');

const router = express.Router();

router.put('/talker/:id',
checkToken, 
checkName,
checkAge,
checkTalk,
checkWatchedAt,
checkRateExists,
checkRate,
async (req, res) => {
  const { id } = req.params;
  const fileDB = await readFile();
  const index = fileDB.indexOf((e) => e.id === Number(id));
  fileDB.splice(index, 1);

  const newTalker = { id: fileDB.length + 1, ...req.body };

  fileDB.push(newTalker);
  await writeFile(JSON.stringify(fileDB, null, 2));
  res.status(200).json(newTalker);
});

router.post('/login', checkEmail, checkPassword, (req, res) => {
  const tokenId = tokenGenerator();
  res.status(200).json({ token: `${tokenId}` });
});

router.post('/talker',
  checkToken, 
  checkName,
  checkAge,
  checkTalk,
  checkWatchedAt,
  checkRateExists,
  checkRate,
  async (req, res) => {
    const fileDB = await readFile();
    const id = fileDB.length + 1;

    const newTalker = { id, ...req.body };

    fileDB.push(newTalker);
    await writeFile(JSON.stringify(fileDB, null, 2));
    res.status(201).json(newTalker);
});

router.delete('/talker/:id', checkToken, async (req, res) => {
  const { id } = req.params;

  const fileDB = await readFile();
  const index = fileDB.indexOf((e) => e.id === Number(id));
  fileDB.splice(index, 1);
  await writeFile(JSON.stringify(fileDB, null, 2));
  res.status(204).send();
});

router.get('/talker/search', checkToken, async (req, res) => {
  const { q } = req.query;
  const fileDB = await readFile();
  const talker = fileDB.filter((e) => e.name.includes(q));
  if (!q) {
    return res.status(200).json(fileDB);
  }
  if (!talker) return res.status(200).json([]);

  res.status(200).json(talker);
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