const express = require('express');
const talker = require('../TalkerFile');
const tokenValidator = require('../utils/tokenValidator');
const nameValidator = require('../utils/nameValidator');
const ageValidator = require('../utils/ageValidator');
const talkValidator = require('../utils/talkValidator');
const watchedAtValidator = require('../utils/watchedAtValidator');
const rateValidator = require('../utils/rateValidator');

const routerTalker = express.Router();

routerTalker.get('/', async (_req, res) => {
  const talkers = await talker.readTalkerFile();
  return res.status(200).json(talkers);
});

routerTalker.get('/:id', async (req, res) => {
  const { id } = req.params;
  const data = await talker.readTalkerFile();
  const pessoa = data.find((parm) => parm.id === Number(id));

  if (pessoa === undefined) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(pessoa);
});

routerTalker.post('/', tokenValidator, nameValidator, ageValidator, talkValidator,
watchedAtValidator, rateValidator, async (req, res) => {
  const reqBody = req.body;
  const talkers = await talker.readTalkerFile();
  const newTalker = { ...reqBody, id: talkers.length + 1 };
  talkers.push(newTalker);
  await talker.writeTalkerFile(talkers);
  return res.status(201).json(newTalker);
});

module.exports = routerTalker;
