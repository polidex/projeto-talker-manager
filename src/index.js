const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const talker = require('./talker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/talker', async (req, res) => {
  const talkers = await talker.readTalkerFile();
  return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const data = await talker.readTalkerFile();
  const pessoa = data.find((parm) => parm.id === Number(id));

  if (pessoa === undefined) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(pessoa);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const token = randomBytes(8).toString('hex');
    return res.status(200).json({ token });
  }
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send('<h1>Online!</h1>');
});

app.listen(PORT, () => {
  console.log('Online');
});
