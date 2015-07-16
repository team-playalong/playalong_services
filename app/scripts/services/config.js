

/**
 * @ngdoc service
 * @name playalongServicesApp.config
 * @description
 * # config
 */
 
angular.module('playalong.services')

.constant('config',function() {
	'use strict';	
	return {
	  	paths: 
	  	{
	  		firebase: 'https://playalong.firebaseio.com' 
	  	}
  	}; 
});
