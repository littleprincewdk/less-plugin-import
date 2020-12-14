less-plugin-import
========================

less plugin for enhance @import rule

## lessc usage

Install with yarn

```bash
yarn add less-plugin-import -D
```

## Command line usage

```bash
lessc --import="defaultOption=reference" file.less file.css
```

## Programmatic usage

```javascript
const ImportPlugin = require("less-plugin-import");
const options = { 
  plugins: [new ImportPlugin({ defaultOption: 'reference' })],
};
less.render(css, options)
    .then(...)
```

## Options

### `defaultOption`

Type: `string` Default: `once`

less supports [Import Options](http://lesscss.org/features/#import-atrules-feature-import-options) extension. `once` is default behavior. use `defaultOption` to modify the default behavior.

multiple keywords example: `defaultOption: 'optional, reference'`.

### `keepReferenceImport`

Type: `boolean` | `string` Default: `false`

less will replace `@import` with contents, set `keepReferenceImport` to `true` will keep `@import` when `Import Options` includes `reference`.

set `string` type will modify ext. example: `keepReferenceImport: '.wxss'`.

Testing
-------

run the tests by running `node test`
You require the dev dependencies installed (which includes less)
