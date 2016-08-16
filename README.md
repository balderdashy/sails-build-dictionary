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
  filter: /(.+)Controller\.js$/
}, function (err, modules){
  if (err) {
    console.error('Failed to load controllers.  Details:',err);
    return;
  }

  console.log(modules);

  // =>
  // (notice that `identity` and `globalId` are added automatically)
  //
  // ```
  //  { page:
  //   { showSignupPage: [Function],
  //     showRestorePage: [Function],
  //     showEditProfilePage: [Function],
  //     showProfilePage: [Function],
  //     showAdminPage: [Function],
  //     showHomePage: [Function],
  //     showVideosPage: [Function],
  //     identity: 'page',
  //     globalId: 'Page' },
  //  user:
  //   { login: [Function],
  //     logout: [Function],
  //     signup: [Function],
  //     removeProfile: [Function],
  //     restoreProfile: [Function],
  //     restoreGravatarURL: [Function],
  //     updateProfile: [Function],
  //     changePassword: [Function],
  //     adminUsers: [Function],
  //     updateAdmin: [Function],
  //     updateBanned: [Function],
  //     updateDeleted: [Function],
  //     identity: 'user',
  //     globalId: 'User' },
  //  video: { identity: 'video', globalId: 'Video' } }
  // ```
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

For example:

```javascript
require('sails-build-dictionary').aggregate({
  dirname: '/code/brushfire-ch10-end/config/',
  filter: /(.+)\.js$/,
  depth: 1
}, function (err, modules) {
  if (err) { console.error('Error:', err); return; }

  // =>
  //  { blueprints: { actions: false, rest: false, shortcuts: false },
  //    bootstrap: [Function],
  //    connections:
  //     { localDiskDb: { adapter: 'sails-disk' },
  //       someMysqlServer:
  //        { adapter: 'sails-mysql',
  //          host: 'YOUR_MYSQL_SERVER_HOSTNAME_OR_IP_ADDRESS',
  //          user: 'YOUR_MYSQL_USER',
  //          password: 'YOUR_MYSQL_PASSWORD',
  //          database: 'YOUR_MYSQL_DB' },
  //       someMongodbServer: { adapter: 'sails-mongo', host: 'localhost', port: 27017 },
  //       somePostgresqlServer:
  //        { adapter: 'sails-postgresql',
  //          host: 'YOUR_POSTGRES_SERVER_HOSTNAME_OR_IP_ADDRESS',
  //          user: 'YOUR_POSTGRES_USER',
  //          password: 'YOUR_POSTGRES_PASSWORD',
  //          database: 'YOUR_POSTGRES_DB' },
  //       myPostgresqlServer:
  //        { adapter: 'sails-postgresql',
  //          host: 'localhost',
  //          user: 'jgalt',
  //          password: 'blahblah',
  //          database: 'brushfire' } },
  //    cors: {},
  //    globals: {},
  //    http: {},
  //    i18n: {},
  //    log: {},
  //    models: { connection: 'localDiskDb', schema: true, migrate: 'drop' },
  //    policies:
  //     { '*': true,
  //       VideoController: { create: [Object] },
  //       UserController:
  //        { login: [Object],
  //          logout: [Object],
  //          removeProfile: [Object],
  //          updateProfile: [Object],
  //          restoreGravatarURL: [Object],
  //          changePassword: [Object],
  //          signup: [Object],
  //          restoreProfile: [Object],
  //          adminUsers: [Object],
  //          updateAdmin: [Object],
  //          updateBanned: [Object],
  //          updateDeleted: [Object] },
  //       PageController:
  //        { showSignupPage: [Object],
  //          showAdminPage: [Object],
  //          showProfilePage: [Object],
  //          showEditProfilePage: [Object],
  //          showRestorePage: [Object] } },
  //    routes:
  //     { 'PUT /login': 'UserController.login',
  //       'GET /logout': 'UserController.logout',
  //       'GET /video': 'VideoController.find',
  //       'POST /video': 'VideoController.create',
  //       'POST /user/signup': 'UserController.signup',
  //       'PUT /user/removeProfile': 'UserController.removeProfile',
  //       'PUT /user/restoreProfile': 'UserController.restoreProfile',
  //       'PUT /user/restoreGravatarURL': 'UserController.restoreGravatarURL',
  //       'PUT /user/updateProfile': 'UserController.updateProfile',
  //       'PUT /user/changePassword': 'UserController.changePassword',
  //       'GET /user/adminUsers': 'UserController.adminUsers',
  //       'PUT /user/updateAdmin/:id': 'UserController.updateAdmin',
  //       'PUT /user/updateBanned/:id': 'UserController.updateBanned',
  //       'PUT /user/updateDeleted/:id': 'UserController.updateDeleted',
  //       'GET /': 'PageController.showHomePage',
  //       'GET /videos': 'PageController.showVideosPage',
  //       'GET /administration': 'PageController.showAdminPage',
  //       'GET /profile': 'PageController.showProfilePage',
  //       'GET /edit-profile': 'PageController.showEditProfilePage',
  //       'GET /restore': 'PageController.showRestorePage',
  //       'GET /signup': 'PageController.showSignupPage' },
  //    session: { secret: 'blahblah' },
  //    sockets: {},
  //    views: { engine: 'ejs', layout: 'layout', partials: true } }
});
```



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
