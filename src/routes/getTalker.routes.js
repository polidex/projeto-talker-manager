const express = require('express');
const talker = require('../readTalkerFile');

const routerGetTalker = express.Router();

routerGetTalker.get('/talker', async (req, res) => {
  const talkers = await talker.readTalkerFile();
  return res.status(200).json(talkers);
});

module.exports = routerGetTalker;