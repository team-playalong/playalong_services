'use strict';

/**
 * @ngdoc service
 * @name playalongServicesApp.config
 * @description
 * # config
 */
angular.module('playalong.services')
  .constant('config', {
  	paths: {
  		firebase: 'https://playalong.firebaseio.com' 
  	}
  });
