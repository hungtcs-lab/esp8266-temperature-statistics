const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
let config = null;

try {
  config = yaml.safeLoad(fs.readFileSync(path.join(__dirname, '../../config/config.yml'), 'utf8'));
} catch(err) {
  console.error(`faild to load config file`, err);
  process.exit(-1);
}

module.exports = config;
