'use strict';

/**
 * @ngdoc directive
 * @name playalongservicesApp.directive:autoDirection
 * @description
 * # autoDirection
 */
/*jshint unused:false*/
angular.module('playalong.services')
  .directive('autoDirection',['$interval', function ($interval) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {

        function checkRTL(s){           
          var ltrChars    = 'A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF'+'\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF',
              rtlChars    = '\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC',
              rtlDirCheck = new RegExp('^[^'+ltrChars+']*['+rtlChars+']');

          return rtlDirCheck.test(s);
        }

        // BIND KEYPRESS
        function keypress(e){
            // need to wait for the character
            if (e.charCode === 32) {return;}
            var isRTL = checkRTL( String.fromCharCode(e.charCode) ),
                dir = isRTL ? 'RTL' : 'LTR';
            
            element.css('direction', dir);
        }
        


        if (attrs.autoDirectionScopeVar &&
            scope[attrs.autoDirectionScopeVar] && 
            scope[attrs.autoDirectionScopeVar].toLowerCase && 
            (scope[attrs.autoDirectionScopeVar].toLowerCase() === 'rtl' || scope[attrs.autoDirectionScopeVar].toLowerCase() === 'ltr' ))
        {
          element.css('direction',scope[attrs.autoDirectionScopeVar].toLowerCase() );  
        }
        else {
          var input = element.on('keypress', keypress)[0];
        }
      }
    };
  }]);
