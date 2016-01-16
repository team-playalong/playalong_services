'use strict';
//Angular-Translate

angular.module('playalong.services')
.config(function($translateProvider) {
  $translateProvider.useStaticFilesLoader({
      prefix: '/locales/',
      suffix: '.json'
  });
  $translateProvider.useSanitizeValueStrategy('sanitize');
  // match the default locale from the build task
  $translateProvider.preferredLanguage(PLY_CONFIG.defaultLocale || 'en');
})
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