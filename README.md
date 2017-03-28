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



Now with a file structure of
```
/bower_components/my-template/foo
/bower_components/my-other-template/baz
/templates/my-template/foo
```

The following statements will both resolve to `/templates/my-template/foo`

```
extends /my-template/foo
```
```
include /my-template/foo
```

While 
```
include /my-other-template/baz
```

will resolve to `/bower_components/my-other-template/baz`
