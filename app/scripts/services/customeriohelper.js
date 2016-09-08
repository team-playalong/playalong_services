(function () {
    'use strict';
    /**
     * @ngdoc service
     * @name playalongservicesApp.customerIoHelper
     * @description
     * # customerIoHelper
     * Service in the playalongservicesApp.
     */
    angular.module('playalong.services')
        .service('customerIoHelper', [function () {
            var identifyUser = function (userModel) {
                if (!userModel || !userModel.uid || !window._cio) {
                    return false;
                }
                window._cio.identify({
                    // Required attributes
                    id: userModel.uid,
                    email: userModel.email || '',
                    created_at: userModel.creationDate || Date.now(),
                    // the user first signed up. You'll want to send it
                    // as seconds since the epoch.
                    // Optional (these are examples. You can name attributes what you wish)
                    firstName: userModel.firstName || '',
                    lastName: userModel.lastName || '',
                    userType: userModel.userType || 'normal' // To use the example segments, set this to 'free' or 'premium'.
                });
                return true;
            };
            return {
                identifyUser: identifyUser
            };
        }]);
})();
//# sourceMappingURL=customeriohelper.js.map