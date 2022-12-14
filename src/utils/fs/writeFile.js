const fs = require('fs').promises;

const writeFileDb = async (data) => {
  await fs.writeFile('src/talker.json', JSON.stringify(data, null, 2));
};

module.exports = writeFileDb;