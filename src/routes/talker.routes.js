const express = require('express');
const talker = require('../readTalkerFile');

const routerTalker = express.Router();

routerTalker.get('/talker', async (req, res) => {
  const talkers = await talker.readTalkerFile();
  return res.status(200).json(talkers);
});

// routerTalker.post('/talker', async (req, res) => {
//   const talkerPost = req.boby;
//   const requiredProps = ['name', 'age', ]
// });

module.exports = routerTalker;
