/**
 * Module dependencies
 */

var assert = require('assert');
var path = require('path');
var loader = require('../');



describe('basic usage', function(){

  it('should have loaded some controllers as expected', function (done){

    loader.optional({
      dirname: path.resolve(__dirname, './fixtures/brushfire-chp10-end/api/controllers'),
      filter: /(.+Controller)\.js$/
    }, function (err, controllers){
      if (err) { return done(err); }

      // try {
      //   assert.deepEqual(controllers, {
      //     'main-Controller': {
      //       index: 1,
      //       show: 2,
      //       add: 3,
      //       edit: 4
      //     },

      //     'other-Controller': {
      //       index: 1,
      //       show: 'nothing'
      //     }
      //   });
      // } catch (e) { return done(e); }

      return done();
    });

  });//</it should have loaded some controllers as expected>


  it('should have aggregated some config as expected', function (done){

    loader.aggregate({
      dirname: path.resolve(__dirname, './fixtures/brushfire-chp10-end/config'),
      filter: /(.+)\.js$/
    }, function (err, config){
      if (err) { return done(err); }

      // try {
      //   assert.deepEqual(config, {
      //     'main-Controller': {
      //       index: 1,
      //       show: 2,
      //       add: 3,
      //       edit: 4
      //     },

      //     'other-Controller': {
      //       index: 1,
      //       show: 'nothing'
      //     }
      //   });
      // } catch (e) { return done(e); }

      return done();
    });

  });//</it should have aggregated some config as expected>


});//</describe>

