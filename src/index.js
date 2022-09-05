const express = require('express');
const bodyParser = require('body-parser');
const routerGetTalker = require('./routes/talker.routes');
const routerGetTalkerById = require('./routes/talkerById.routes');
const routerLogin = require('./routes/login.routes');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.use(routerGetTalker);

app.use(routerGetTalkerById);

app.use(routerLogin);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send('<h1>Online!</h1>');
});

app.listen(PORT, () => {
  console.log('Online');
});
