angular
    .module('playalong.services', ['firebase']);


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



/**
 * @ngdoc service
 * @name playalongServicesApp.chord
 * @description
 * # chord
 * Factory in the playalongServicesApp.
 */

angular.module('playalong.services')
  .factory('chord', ['$firebaseObject','config', function ($firebaseObject, config) {
    'use strict';

    var ref = new Firebase(config.paths.firebase + '/test');  

  // download the data into a local object
  var testChord = $firebaseArray(ref);



  function getChordsById(chordId) {

  }

  function addChord(chordObj) {
    //TODO validate chord object
    testChord.$add(chordObj);
  }
    // Public API here
    return {
      getChordsById: getChordsById,
      addChord: addChord
    };
  }]);



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
