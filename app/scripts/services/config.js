'use strict';

/**
 * @ngdoc service
 * @name gitHubApp.config
 * @description
 * # config
 * Constant in the gitHubApp.
 */
angular.module('playalong.services')
  .constant('config', {
  	paths: {
  		firebase: 'https://playalong.firebaseio.com',
  		mocks: {
  			singleChord: 'mocks/singleChord.json',
  			hebrewChord: 'mocks/hebrewChord.json'
  		}
  	}
  });
