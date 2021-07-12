const fs = require('fs');
const path = require('path');

const generateWriteStream = (filePath) => {
  const stream = fs.createWriteStream(filePath, {
    flags: 'a',
  });
  return stream;
};

const writeLog = (logFile, logData) => {
  return new Promise((resolve, reject) => {
    const filePath = path.resolve(__dirname, '..', '..', 'logs', logFile);
    const stream = generateWriteStream(filePath);

    stream.on('error', reject);

    stream.on('finish', resolve);

    stream.write(`${logData}\n`);
  });
};

module.exports = {
  writeLog,
};
