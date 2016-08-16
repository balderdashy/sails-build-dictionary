# sails-build-dictionary

Recursively build a dictionary of modules using `include-all`.

> This utility is [called by the moduleloader hook](https://github.com/balderdashy/sails/tree/v0.12.4/lib/hooks/moduleloader) in Sails.js.


## Installation

```
npm install sails-build-dictionary --save --save-exact
```


## Example Usage

```javascript
var path = require('path');
var load = require('sails-build-dictionary');

load({
  dirname: path.resolve('api/controllers'),
}, function (err, modules){
  if (err) {
    console.error('Failed to load controllers.  Details:',err);
    return;
  }

  console.log(modules);
  //=>
  //{
  //  'UserController.js': {
  //    find: function (req, res) { return res.ok(); }
  //  },
  //  'PageController.js': {
  //    showHomePage: function (req, res) { return res.view('homepage'); }
  //  }
  //}
});
```

## Methods

When you run `require('sails-build-dictionary')`, you get a function.  Calling that function uses sails-build-dictionary with default settings (and any of the options from the table below may be passed in.)

But there are also a handful of convenience methods exposed as properties of that function.  For example:

```javascript
var load = require('sails-build-dictionary');

// Could just call `load()`.
// But could also do:
// • load.required();
// • load.optional();
// • etc.
```


### Available convenience methods

The following convenience methods take the same "options,cb" signature as the default `load` function, and they support all of the same options.


##### .optional()

Build a dictionary of named modules.
(fails silently-- returns {} -- if the container cannot be loaded)

> This is how most things in the `api/` folder of Sails apps are loaded (e.g. controllers, models, etc.)


##### .exists()

Build a dictionary indicating whether the matched modules exist
(fails silently-- returns {} if the container cannot be loaded)

> This is how Sails detects the existence of views.


##### .aggregate()

Build a single module dictionary by extending {} with the contents of each module.
(fail silently-- returns {} if the container cannot be loaded)

> This is how `sails.config` is built from config files.


## Options

| Option      | Description
|:------------|:------------------------------------------------------------------------|
| dirname     | The absolute path of a directory to load modules from.
| identity    | if disabled, (explicitly set to false) don't inject an identity into the module also don't try to use the bundled `identity` property in the module to determine the keyname in the result dictionary. default: true
| optional    | if enabled, fail silently and return {} when source directory does not exist or cannot be read (otherwise, exit w/ an error)  default: false
| depth       | the maximum level of recursion where modules will be included. Defaults to infinity.
| filter      | only include modules whose FILENAME matches this regex. default `undefined`
| pathFilter  | only include modules whose FULL RELATIVE PATH matches this regex (relative from the entry point directory). default `undefined`
| replaceExpr | in identity: use this regex to remove substrings like 'Controller' or 'Service' and replace them with the value of `replaceVal`
| replaceVal  | see above. default value: ''
| dontLoad    | if `dontLoad` is set to true, don't run the module w/ V8 or load it into memory-- instead, return a tree representing the directory structure (all extant file leaves are included as keys, with their value = `true`)
| useGlobalIdForKeyName |  if `useGlobalIdForKeyName` is set to true, don't lowercase the identity to get the keyname-- just use the globalId.



## License

MIT
