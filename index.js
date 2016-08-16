/**
 * Module dependencies
 */

var helpBuildDictionary = require('./lib/help-build-dictionary');


/**
 * sails-build-dictionary
 *
 * A utility for the module loader in Sails core.
 */


/**
 * Build a dictionary of named modules
 * (default usage-- see options in `lib/help-build-dictionary.js`)
 *
 * @param {Dictionary} options
 * @param {Function} cb
 */

module.exports = function buildDictionary(options, cb) {
  return helpBuildDictionary(options, cb);
};


/**
 * Build a dictionary of named modules
 * (responds with an error if the container cannot be loaded)
 *
 * WARNING: THIS PARTICULAR CONVENIENCE METHOD WILL LIKELY BE DEPRECATED.
 * (it's not actually being used anywhere in core)
 *
 * @param {Dictionary} options
 * @param {Function} cb
 */

module.exports.required = function(options, cb) {
  return helpBuildDictionary(options, cb);
};



/**
 * Build a dictionary of named modules
 * (fails silently-- returns {} if the container cannot be loaded)
 *
 * @param {Dictionary} options
 * @param {Function} cb
 */

module.exports.optional = function(options, cb) {
  options.optional = true;
  return helpBuildDictionary(options, cb);
};



/**
 * Build a dictionary indicating whether the matched modules exist
 * (fails silently-- returns {} if the container cannot be loaded)
 *
 * @param {Dictionary} options
 * @param {Function} cb
 */

module.exports.exists = function(options, cb) {
  options.optional = true;
  options.dontLoad = false;
  return helpBuildDictionary(options, cb);
};



/**
 * Build a single module dictionary by extending {} with the contents of each module
 * (fail silently-- returns {} if the container cannot be loaded)
 *
 * @param {Dictionary} options
 * @param {Function} cb
 */

module.exports.aggregate = function(options, cb) {
  options.aggregate = true;
  options.optional = true;
  return helpBuildDictionary(options, cb);
};
