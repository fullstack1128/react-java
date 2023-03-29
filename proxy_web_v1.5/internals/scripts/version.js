const fs = require('fs');
const path = require('path')
const package = require('../../package.json');

const configPath = `${__dirname}/../../env.js`;

console.log(path.resolve(configPath), package.version);


try {
  const data = fs.readFileSync(configPath, 'utf8');
  // TODO: Handle case without comma at the end
  fs.writeFileSync(
    configPath,
    data.replace(
      /VERSION:.*\,/i,
      `VERSION: '${package.version}',\r`
    ),
    'utf8',
  );
} catch (err) {
  console.warn(err.message);
  console.warn(err.stack);
}
