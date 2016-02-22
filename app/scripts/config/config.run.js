'use strict';
//Angular-Translate

angular.module('playalong.services')
.config(['$translateProvider','config',function($translateProvider,config) {
  var lang = PLY_CONFIG.defaultLocale || 'en';
  $translateProvider
    .addInterpolation('$translateMessageFormatInterpolation')
    .useSanitizeValueStrategy('sanitize')
    .useStaticFilesLoader({
      prefix: config.paths.firebase + 'i18n/',
      suffix: '.json'
    })
    .preferredLanguage(lang);  
}])
.run(['$location', '$translate',
    function($location, $translate) {
  // check if url contains a certain locale or set back to your default locale
  var locale = $location.search().locale;
  if (locale === 'he' || locale === 'en')
  {
    $translate.use(locale);
  }
}])

//Global config object
.run(['$rootScope','$translate',function ($rootScope,$translate) {
  var dir = $translate.proposedLanguage() === 'he' ? 'rtl' : 'ltr';
  var locale = $translate.use() || $translate.proposedLanguage();

  $rootScope.app = {
    dir: dir,
    locale: locale
  };
}]);