

/**
 * @ngdoc function
 * @name playalongServicesApp.controller:ChordCtrl
 * @description
 * # ChordCtrl
 * Controller of the playalongServicesApp
 */
angular.module('playalong.services')
  .controller('ChordCtrl', function () {
	'use strict';

	$scope.addChord = function() {
		$http('GET', 'test/mocks/data/chord.json', null)
		.then(function(data) {
			console.log(data);
		});
	}; 
  });
