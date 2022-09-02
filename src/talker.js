const fs = require('fs').promises;
const { join } = require('path');

const path = '/talker.json';

const readTalkerFile = async () => {
  try {
    const content = await fs.readFile(join(__dirname, path), 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.log('erro ao ler o arquivo', error.message);
    return null;
  }
};

module.exports = {
  readTalkerFile,
};
