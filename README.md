# pug-multiple-basedirs-plugin
A pug plugin allowing basedir option to be configured as an array. The resolver will attempt to resolve the basedirs in order.

Inspired by https://github.com/pugjs/pug/issues/2499#issuecomment-241927949

## Implementation
```javascript
var MultipleBasedirsPlugin = require("pug-multiple-basedirs-plugin");

pug.compileFile(sourceFile, {
  plugins: [
    MultipleBasedirsPlugin({
      paths: ['/templates', '/bower_components']
    })
  ]
});
```
