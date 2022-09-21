const express = require('express');
const talker = require('../TalkerFile');
const tokenValidator = require('../utils/tokenValidator');
const nameValidator = require('../utils/nameValidator');
const ageValidator = require('../utils/ageValidator');
const talkValidator = require('../utils/talkValidator');
const watchedAtValidator = require('../utils/watchedAtValidator');
const rateValidator = require('../utils/rateValidator');

const routerTalker = express.Router();

routerTalker.get('/search', tokenValidator, async (req, res) => {
  const { q } = req.query;
  const talkers = await talker.readTalkerFile();
  
  if (!q) {
    return res.status(200).json(talkers);
  }
  
  const searchTalker = talkers
  .filter((selectedTalker) => selectedTalker.name.toLowerCase()
  .includes(q.toLowerCase()));
  
  return res.status(200).json(searchTalker);
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

routerTalker.get('/', async (_req, res) => {
  const talkers = await talker.readTalkerFile();
  return res.status(200).json(talkers);
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

routerTalker.put('/:id', tokenValidator, nameValidator, ageValidator, talkValidator,
watchedAtValidator, rateValidator, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = await talker.readTalkerFile();
  const editTalker = { name, age, talk, id: Number(id) };
    talkers.map((selectedTalker) => {
      if (selectedTalker.id === Number(id)) {
        return { ...selectedTalker };
      }
      return selectedTalker;
    });
    await talker.writeTalkerFile([editTalker]);
    res.status(200).json(editTalker);
  });

routerTalker.delete('/:id', tokenValidator, async (req, res) => {
  const { id } = req.params;
  const talkers = await talker.readTalkerFile();
  const deleteTalker = talkers
    .filter((selectedTalker) => selectedTalker.id !== Number(id));
  await talker.writeTalkerFile(deleteTalker);
  
    res.status(204).json();
});

module.exports = routerTalker;
