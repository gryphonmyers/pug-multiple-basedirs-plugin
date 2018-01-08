var fs = require('fs');
var path = require('path');
var pug = require('pug');

module.exports = function (pluginOpts) {
  if (!pluginOpts.paths) pluginOpts.paths = [];
  if (!Array.isArray(pluginOpts.paths)) pluginOpts.paths = [pluginOpts.paths];

  return {
    name: 'multiplePaths',
    resolve: function(filename, source, options){
        var resolvedFilename;

        if (filename[0] === '/') {
            var pathExists;
            var paths = pluginOpts.paths.slice();
            var currentPath;
            while (!pathExists && paths.length) {
              currentPath = path.join(paths.shift(), filename);
              pathExists = fs.existsSync(currentPath);
            }
            if (!pathExists)
              throw new Error('Filename "' + filename + '" could not be resolved for basedirs in input array.');
            resolvedFilename = currentPath;
        } else {
          if (!source) {
            throw new Error('the "filename" option is required to use includes and extends with "relative" paths');
          }

          resolvedFilename = path.resolve(path.dirname(source), filename);
        }
        return resolvedFilename;
    }
  };
};
