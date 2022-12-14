const fs = require('fs').promises;

const writeFileDb = async (data) => {
  await fs.writeFile('src/talker.json', data);
};

module.exports = writeFileDb;