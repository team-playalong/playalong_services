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

		var getNode = function(params) {
			var deferred = $q.defer();
			params = params || {};
			var ref = getRef(params.relPath);
			var response = params.isOnce ? 'once' : 'on';
			ref[response]('value',function(snapshot) {
				deferred.resolve(snapshot.val());
			});
			return deferred.promise;
		};

		var selectSimpleQuery = function(relPath,fieldName,operator,fieldValue, refFlag) {
			var deferred = $q.defer();
			//TODO - validate operator
			var ref = getRef(relPath);
			
			ref
				.orderByChild(fieldName)[operator](fieldValue)
				.once('value',function(snapshot) {
					var res = refFlag ? snapshot : snapshot.val();
					deferred.resolve(res);
				});

			return deferred.promise;
		};	

		var removeWithQuery = function(relPath,fieldName,operator,fieldValue) {
			var deferred = $q.defer();

			selectSimpleQuery(relPath,fieldName,operator,fieldValue, true)
				.then(function(data) {
					if (data && data.ref())
					{
						data.ref().remove();
						deferred.resolve({
							message: 'success'
						});
					}
					else {
						deferred.reject({
							message: 'ref does not exist'});
					}
				});

			return deferred.promise;
		};

		var insert = function(relPath, dataObj) {
			var deferred = $q.defer();
			var ref = getRef(relPath);
			if (ref && ref.push)
			{
				ref.push(dataObj, function() {
					deferred.resolve({
						message: 'success'
					});
				});
			}
			else 
			{
				setTimeout(deferred.reject,10);
			}
			
			return deferred.promise;
		};

    return {
    	getRef: getRef,
    	getNode: getNode,
    	selectSimpleQuery: selectSimpleQuery,
    	removeWithQuery: removeWithQuery,
    	insert: insert
    };
  }]);
