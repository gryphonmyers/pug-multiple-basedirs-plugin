const {accessSync, constants: {R_OK}} = require('fs');
const {dirname, resolve} = require('path');
const pug = require('pug');

const exists = filename => {
  try {
    accessSync(filename, R_OK);
    return true;
  } catch (err) {
    return false;
  }
};

function MultiplePathsPlugin({paths = []}) {
  return {
    name: 'multiplePaths',
    resolve(filename, source) {
      let out;

      if (filename[0] === '/') {
        filename = filename.substr(1);
        if (!paths.some(path => exists(out = resolve(path, filename)))) {
          throw new Error(`${filename} cannot be found in any paths`);
        }
      } else {
        if (!source) {
          throw new Error('the "filename" option is required to use includes and extends with "relative" paths');
        }

        out = resolve(dirname(source), filename);
      }

      return out;
    }
  };
}
