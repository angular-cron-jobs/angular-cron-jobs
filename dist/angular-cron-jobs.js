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
    "<span>every: </span>\n" +
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
    "	<div ng-show=\"myFrequency.base.value === 4\">\n" +
    "		<span>on </span>\n" +
    "		<select ng-model=\"myFrequency.dayValue\" ng-options=\"item as item.text for item in dayValue\"></select>\n" +
    "		<span>at </span>\n" +
    "		<select ng-model=\"myFrequency.weekHourValue\" ng-options=\"item.value for item in hourValue\"></select>\n" +
    "		<span> : </span>\n" +
    "		<select ng-model=\"myFrequency.weekMinuteValue\" ng-options=\"item.value for item in minuteValue\"></select>\n" +
    "	</div>\n" +
    "\n" +
    "	<div ng-show=\"myFrequency.base.value === 5\">\n" +
    "		<span>on </span>\n" +
    "		<select ng-model=\"myFrequency.dayOfMonthValue\" ng-options=\"item as item.text for item in dayOfMonthValue\"></select>\n" +
    "		<span>at </span>\n" +
    "		<select ng-model=\"myFrequency.weekHourValue\" ng-options=\"item.value for item in hourValue\"></select>\n" +
    "		<span> : </span>\n" +
    "		<select ng-model=\"myFrequency.weekMinuteValue\" ng-options=\"item.value for item in minuteValue\"></select>\n" +
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

            $scope.dayValue = [
                { 
                    "value": 1,
                    "text": "Sunday"
                },
                { 
                    "value": 2,
                    "text": "Monday"
                },
                { 
                    "value": 3,
                    "text": "Tuesday"
                },
                { 
                    "value": 4,
                    "text": "Wednesday"
                },
                { 
                    "value": 5,
                    "text": "Thursday"
                },
                { 
                    "value": 6,
                    "text": "Friday"
                },
                { 
                    "value": 7,
                    "text": "Saturday"
                }
            ];

            $scope.dayOfMonthValue = [
                { 
                    "value": 1,
                    "text": "1st"
                },
                { 
                    "value": 2,
                    "text": "2nd"
                },
                { 
                    "value": 3,
                    "text": "3rd"
                },
                { 
                    "value": 4,
                    "text": "4th"
                },
                { 
                    "value": 5,
                    "text": "5th"
                },
                { 
                    "value": 6,
                    "text": "6th"
                },
                { 
                    "value": 7,
                    "text": "7th"
                },
                { 
                    "value": 8,
                    "text": "8th"
                },
                { 
                    "value": 9,
                    "text": "9th"
                },
                { 
                    "value": 10,
                    "text": "10th"
                },
                { 
                    "value": 11,
                    "text": "11th"
                },
                { 
                    "value": 12,
                    "text": "12th"
                },
                { 
                    "value": 13,
                    "text": "13th"
                },
                { 
                    "value": 14,
                    "text": "14th"
                },
                { 
                    "value": 15,
                    "text": "15th"
                },
                { 
                    "value": 16,
                    "text": "16th"
                },
                { 
                    "value": 17,
                    "text": "17th"
                },
                { 
                    "value": 18,
                    "text": "18th"
                },
                { 
                    "value": 19,
                    "text": "19th"
                },
                { 
                    "value": 20,
                    "text": "20th"
                },
                { 
                    "value": 21,
                    "text": "21st"
                },
                { 
                    "value": 22,
                    "text": "22nd"
                },
                { 
                    "value": 23,
                    "text": "23rd"
                },
                { 
                    "value": 24,
                    "text": "24th"
                },
                { 
                    "value": 25,
                    "text": "25th"
                },
                { 
                    "value": 26,
                    "text": "26th"
                },
                { 
                    "value": 27,
                    "text": "27th"
                },
                { 
                    "value": 28,
                    "text": "28th"
                },
                { 
                    "value": 29,
                    "text": "29th"
                },
                { 
                    "value": 30,
                    "text": "30th"
                },
                { 
                    "value": 31,
                    "text": "31st"
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

                if(n && n.base && n.base.value === 4) {

                    console.log('entered week if statement: ', angular.copy(n));
                    
                    if(!n.weekMinuteValue){
                        n.weekMinuteValue = {};
                        n.weekMinuteValue.value = 0;
                    }
                    if(!n.weekHourValue){
                        n.weekHourValue = {};
                        n.weekHourValue.value = 0;
                    }
                    if(!n.dayValue){
                        n.dayValue = {};
                        n.dayValue.value = 1;
                    }

                    $scope.cron = n.weekMinuteValue.value + ' ' + n.weekHourValue.value + ' * * ' + (n.dayValue.value - 1);
                }

                if(n && n.base && n.base.value === 5) {

                    console.log('entered week if statement: ', angular.copy(n));
                    
                    if(!n.weekMinuteValue){
                        n.weekMinuteValue = {};
                        n.weekMinuteValue.value = 0;
                    }
                    if(!n.weekHourValue){
                        n.weekHourValue = {};
                        n.weekHourValue.value = 0;
                    }
                    if(!n.dayOfMonthValue){
                        n.dayOfMonthValue = {};
                        n.dayOfMonthValue.value = 0;
                    }

                    $scope.cron = n.weekMinuteValue.value + ' ' + n.weekHourValue.value + ' ' + n.dayOfMonthValue.value + ' * *';
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
