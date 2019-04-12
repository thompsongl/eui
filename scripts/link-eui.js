const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs-extra');
const chalk = require('chalk');
const chokidar = require('chokidar');
const yargs = require('yargs');

const EUI = '@elastic/eui';
const cwd = path.resolve(__dirname, '..');
const argv = yargs.options({
  dest: { type: 'string', alias: 'd' }, // can be specified without arg key
  skipBuild: { type: 'boolean', alias: 's' },
  watch: { type: 'boolean', alias: 'w' },
  ignore: { type: 'string', alias: 'i', default: ['node_modules', '.git'] },
  verbose: { type: 'boolean', alias: 'v' },
}).argv;

const dest = argv._[0] || argv.dest;
if (!dest.length) throw new Error(chalk.red(`'dest' option is required`));
console.log(chalk.cyan(`🚀  '${dest}'`));
copy(dest, argv);

async function copy(dest, argv) {
  if (argv.skipBuild) {
    console.log(chalk.cyan('🎁  Using existing local EUI build'));
  } else {
    console.log(chalk.cyan('📦  Building EUI...'));
    execSync('yarn build', argv.verbose);
  }
  const srcDir = cwd;
  const destDir = path.join(dest, 'node_modules', EUI);

  // await fs.remove(destDir); Ideally we would completely remove the existing dir and reinstall its deps relative to the package tree, but yarn doesn't work that way
  await fs.ensureDir(destDir);
  await fs.copy(srcDir, destDir, { filter });

  console.log(chalk.green('✨  Finished linking EUI  ✨'));

  if (!argv.watch) return;
  console.log(chalk.cyan('👀  Watching for changes...'));
  chokidar.watch(path.join(cwd, 'src')).on('change', async edit => {
    let filename;
    try {
      filename = path.relative(srcDir, edit);
      console.log(chalk.cyan('🔄  Rebuilding EUI...'));
      execSync('yarn build', argv.verbose);
      await fs.copy(srcDir, destDir, { filter });
      console.log(chalk.cyan('✅  Rebuilt & relinked EUI'));
    } catch (error) {
      console.error(chalk.red(error, filename));
    }
  });


  function filter(file) {
    const filterable = path.relative(srcDir, file);
    if (argv.ignore.some(ignored => filterable.includes(ignored))) {
      if (argv.verbose) console.log(chalk.white('⏭  Ignored', filterable));
      return false;
    } else {
      return true;
    }
  }
}
