'use strict';

/**
 * @ngdoc service
 * @name gitHubApp.config
 * @description
 * # config
 * Constant in the gitHubApp.
 */
angular.module('playalong.services')
  .constant('config', (function() {
    var config = {
      env: PLY_CONFIG.env,
      envToDbMap: {
        dev: 'dev/',
        prod: 'prod/'
      },
      paths: {
        firebase: 'https://playalong.firebaseio.com/',
        mocks: {
          singleChord: 'mocks/singleChord.json',
          hebrewChord: 'mocks/hebrewChord.json'
        }
      }
    };

    //This is an addition to the reference in order to create two DBs
    var envPath = config.envToDbMap && config.envToDbMap[config.env] ? config.envToDbMap[config.env] : 'dev';
    config.paths.firebase += envPath;

    return config;
  })());
