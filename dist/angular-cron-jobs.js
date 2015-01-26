/**
 * UI Component For Creating Cron Job Syntax To Send To Server
 * @version v0.0.1 - 2015-01-26 * @link https://github.com/jacobscarter/angular-cron-jobs
 * @author Jacob Carter <jacob@ieksolutions.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
angular.module('templates-angularcronjobs', ['cronselection.html']);

angular.module("cronselection.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("cronselection.html",
    "<div>\n" +
    "\n" +
    "	<select ng-model=\"myFrequency.base\" ng-options=\"item.text for item in frequency\"></select>\n" +
    "	\n" +
    "	<div ng-show=\"myFrequency.base.value === 2\">\n" +
    "		<span>at </span>\n" +
    "		<select ng-model=\"myFrequency.pastTheHour\" ng-options=\"item.value for item in pastTheHour\"></select>\n" +
    "		<span> past the hour</span>\n" +
    "	</div>\n" +
    "\n" +
    "\n" +
    "	<div ng-show=\"myFrequency.base.value === 3\">\n" +
    "		<span>at </span>\n" +
    "		<select ng-model=\"myFrequency.hourValue\" ng-options=\"item.value for item in hourValue\"></select>\n" +
    "		<span> : </span>\n" +
    "		<select ng-model=\"myFrequency.minuteValue\" ng-options=\"item.value for item in minuteValue\"></select>\n" +
    "	</div>\n" +
    "\n" +
    "\n" +
    "	<input ng-model=\"showCustom\" type=\"text\">\n" +
    "\n" +
    "	<p>{{cron}}</p>\n" +
    "\n" +
    "	<p ng-show=\"showCustom === 'true'\">SHOWING CUSTOM</p>\n" +
    "</div>");
}]);

angular.module('angular-cron-jobs', ['templates-angularcronjobs']);

angular.module('angular-cron-jobs').directive('cronSelection', function() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: true,
        templateUrl: function(element, attributes) {
          return attributes.template || "cronselection.html";
        },
        link: function($scope, $element, $attrs) {

            $scope.showCustom = false;


            $scope.frequency = [
                { 
                    "value": 1,
                    "text": "Minute"
                },
                {
                    "value": 2,
                    "text": "Hour"
                },
                {
                    "value": 3,
                    "text": "Day"
                },
                {
                    "value": 4,
                    "text": "Week"
                },
                {
                    "value": 5,
                    "text": "Month"
                },
                {
                    "value": 6,
                    "text": "Year"
                }
            ];

            $scope.pastTheHour = [
                { 
                    "value": 0
                },
                { 
                    "value": 5
                },
                { 
                    "value": 10
                },
                { 
                    "value": 15
                },
                { 
                    "value": 20
                },
                { 
                    "value": 25
                },
                { 
                    "value": 30
                },
                { 
                    "value": 35
                },
                { 
                    "value": 40
                },
                { 
                    "value": 45
                },
                { 
                    "value": 50
                },
                { 
                    "value": 55
                }
            ];

            $scope.minuteValue = [
                { 
                    "value": 0
                },
                { 
                    "value": 5
                },
                { 
                    "value": 10
                },
                { 
                    "value": 15
                },
                { 
                    "value": 20
                },
                { 
                    "value": 25
                },
                { 
                    "value": 30
                },
                { 
                    "value": 35
                },
                { 
                    "value": 40
                },
                { 
                    "value": 45
                },
                { 
                    "value": 50
                },
                { 
                    "value": 55
                }
            ];

            $scope.hourValue = [
                { 
                    "value": 0
                },
                { 
                    "value": 1
                },
                { 
                    "value": 2
                },
                { 
                    "value": 3
                },
                { 
                    "value": 4
                },
                { 
                    "value": 5
                },
                { 
                    "value": 6
                },
                { 
                    "value": 7
                },
                { 
                    "value": 8
                },
                { 
                    "value": 9
                },
                { 
                    "value": 10
                },
                { 
                    "value": 11
                },
                { 
                    "value": 12
                },
                { 
                    "value": 13
                },
                { 
                    "value": 14
                },
                { 
                    "value": 15
                },
                { 
                    "value": 16
                },
                { 
                    "value": 17
                },
                { 
                    "value": 18
                },
                { 
                    "value": 19
                },
                { 
                    "value": 20
                },
                { 
                    "value": 21
                },
                { 
                    "value": 22
                },
                { 
                    "value": 23
                }
            ];


            $scope.$watch('myFrequency', function(n){

                if(n && n.base){
                    if(n.base.value === 1){
                      $scope.cron = '* * * * *';
                    } else if(n.base.value === 2) {
                      $scope.cron = '0 * * * *';
                    } else if(n.base.value === 3) {
                      $scope.cron = '0 0 * * *';
                    } else if(n.base.value === 4) {
                      $scope.cron = '0 0 * * 0';
                    } else if(n.base.value === 5) {
                      $scope.cron = '0 0 1 * *';
                    } else if(n.base.value === 5) {
                      $scope.cron = '0 0 1 1 *';
                    }
                }

                if(n && n.base && n.base.value === 2 && n.pastTheHour && n.pastTheHour.value) {
                    $scope.cron = n.pastTheHour.value + ' * * * *';
                }

                if(n && n.base && n.base.value === 3) {
                    if(!n.minuteValue){
                        n.minuteValue = {};
                        n.minuteValue.value = 0;
                    }
                    if(!n.hourValue){
                        n.hourValue = {};
                        n.hourValue.value = 0;
                    }
                    $scope.cron = n.minuteValue.value + ' ' + n.hourValue.value + ' * * *';
                }

            }, true);

        }
    };
});

angular.module('angular-cron-jobs').factory('cronService', function() {
   
   var service = {};
   
   var wizards = {};
   
   service.defaultName = "defaultWizard";
   
   service.addWizard = function(name, wizard) {
       wizards[name] = wizard;
   };
   
   service.removeWizard = function(name) {
       delete wizards[name];
   };
   
   service.wizard = function(name) {
       var nameToUse = name;
       if (!name) {
           nameToUse = service.defaultName;
       }
       
       return wizards[nameToUse];
   };
   
   return service;
});
