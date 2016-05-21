'use strict';
/**
 * @ngdoc service
 * @name gitHubApp.config
 * @description
 * # config
 * Constant in the gitHubApp.
 */
angular.module('playalong.services')
    .constant('config', (function () {
    var config = {
        env: PLY_CONFIG.env,
        paths: {
            firebaseDev: 'https://playalong.firebaseio.com/',
            firebaseProd: 'https://playalong-prod.firebaseio.com/',
            firebase: undefined,
            mocks: {
                singleChord: 'mocks/singleChord.json',
                hebrewChord: 'mocks/hebrewChord.json'
            }
        }
    };
    //This is an addition to the reference in order to create two envs
    config.paths.firebase = config.env === 'dev' ? config.paths.firebaseDev : config.paths.firebaseProd;
    return config;
})());
//# sourceMappingURL=config.js.map