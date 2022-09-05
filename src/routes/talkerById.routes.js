const express = require('express');
const talker = require('../readTalkerFile');

const routerGetTalkerById = express.Router();

routerGetTalkerById.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const data = await talker.readTalkerFile();
  const pessoa = data.find((parm) => parm.id === Number(id));

  if (pessoa === undefined) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(pessoa);
});

module.exports = routerGetTalkerById;