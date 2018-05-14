const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
let config = null;

const env = process.env['NODE_ENV'] === 'production' ? 'production' : 'development';

try {
  config = yaml.safeLoad(fs.readFileSync(path.join(__dirname, `../../config/config.${ env }.yml`), 'utf8'));
} catch(err) {
  console.error(`faild to load config file`, err);
  process.exit(-1);
}

module.exports = config;
