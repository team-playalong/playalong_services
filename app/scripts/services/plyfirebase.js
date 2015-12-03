'use strict';

/**
 * @ngdoc service
 * @name playalongservicesApp.plyFirebase
 * @description
 * # plyFirebase
 * Service in the playalongservicesApp.
 */
angular.module('playalong.services')
  .service('plyFirebase', ['config','$q',function (config,$q) {

		var getRef = function(relPath) {
			relPath = relPath || '';
			return new Firebase(config.paths.firebase + relPath);
		};

		var getRefWithCallback = function(params) {
			params = params || {};
			var ref = getRef(params.relPath);
			if (params.callback)
			{
				var response = params.isOnce ? 'once' : 'on';
				ref[response]('value',function(snapshot) {
					params.callback(snapshot.val());
				});
			}
		};

		var selectSimpleQuery = function(relPath,fieldName,operator,fieldValue) {
			var deferred = $q.defer();
			//TODO - validate operator
			var ref = getRef(relPath);
			
			ref
				.orderByChild(fieldName)[operator](fieldValue)
				.once('value',function(snapshot) {
					deferred.resolve(snapshot.val());
				});

			return deferred.promise;
		};	

    return {
    	getRef: getRef,
    	getRefWithCallback: getRefWithCallback,
    	selectSimpleQuery: selectSimpleQuery
    };
  }]);
