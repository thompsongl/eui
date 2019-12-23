const { execSync } = require('child_process');
const rimraf = require('rimraf');

execSync('cross-env NODE_ENV=production NODE_OPTIONS=--max-old-space-size=4096 webpack --config=src-docs/webpack.config.js', {
  stdio: 'inherit',
});
rimraf.sync('docs/200.html');
execSync('react-snap', {
  stdio: 'inherit',
});
