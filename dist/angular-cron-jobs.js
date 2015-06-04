/**
 * UI Component For Creating Cron Job Syntax To Send To Server
 * @version v1.2.1 - 2015-06-03 * @link https://github.com/jacobscarter/angular-cron-jobs
 * @author Jacob Carter <jacob@ieksolutions.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
angular.module('templates-angularcronjobs', ['cronselection.html']);

angular.module("cronselection.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("cronselection.html",
    "<div class=\"cron-wrap\">\n" +
    "<span>Every: </span>\n" +
    "	<select class=\"cron-select\" ng-model=\"myFrequency.base\" ng-options=\"value as text for (value,text) in frequency\"></select>\n" +
    "\n" +
    "	<div class=\"select-options\">\n" +
    "		<span ng-show=\"myFrequency.base == 4\">on </span>\n" +
    "		<select ng-show=\"myFrequency.base == 4\" class=\"cron-select day-value\" ng-model=\"myFrequency.dayValue\" ng-options=\"(value | dayName) for value in dayValue\"></select>\n" +
    "		<span ng-show=\"myFrequency.base >= 5\">on the </span>\n" +
    "		<select ng-show=\"myFrequency.base >= 5\" class=\"cron-select day-of-month-value\" ng-model=\"myFrequency.dayOfMonthValue\" ng-options=\"(value | numeral) for value in dayOfMonthValue\"></select>\n" +
    "		<span ng-show=\"myFrequency.base == 6\">of </span>\n" +
    "		<select ng-show=\"myFrequency.base == 6\" class=\"cron-select month-value\" ng-model=\"myFrequency.monthValue\" ng-options=\"(value | monthName) for value in monthValue\"></select>\n" +
    "		<span ng-show=\"myFrequency.base >= 2\">at </span>\n" +
    "		<select ng-show=\"myFrequency.base >= 3\" class=\"cron-select hour-value\" ng-model=\"myFrequency.hourValue\" ng-options=\"value for value in hourValue\"></select>\n" +
    "		<span ng-show=\"myFrequency.base >= 3\"> : </span>\n" +
    "		<select ng-show=\"myFrequency.base >= 2\" class=\"cron-select minute-value\" ng-model=\"myFrequency.minuteValue\" ng-options=\"value for value in minuteValue\"></select>\n" +
    "		<span ng-show=\"myFrequency.base == 2\"> past the hour</span>\n" +
    "	</div>\n" +
    "</div>\n" +
    "");
}]);

'use strict';

angular.module('angular-cron-jobs', ['templates-angularcronjobs']);

'use strict';

angular.module('angular-cron-jobs').directive('cronSelection', ['cronService', function(cronService) {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            config : '=',
            output : '=?',
            init   : '=?',
            reset : '@'
        },
        templateUrl: function(element, attributes) {
          return attributes.template || 'cronselection.html';
        },
        link: function($scope) {
            $scope.frequency = {
                1: 'Minute',
                2: 'Hour',
                3: 'Day',
                4: 'Week',
                5: 'Month',
                6: 'Year'
            };

            if (angular.isDefined($scope.init)) {
                $scope.myFrequency = cronService.fromCron($scope.init);
            }

            $scope.$watch('reset', function(newValue){
                if(angular.isDefined(newValue)){
                    $scope.myFrequency = cronService.fromCron(newValue);
                }
            });

            if(typeof $scope.config === 'object' && !$scope.config.length){
                var optionsKeyArray = Object.keys($scope.config.options);
                for (var i in optionsKeyArray) {
                    var currentKey = optionsKeyArray[i].replace(/^allow/, '');
                    var originalKey = optionsKeyArray[i];
                    if(!$scope.config.options[originalKey]){
                        for(var b in $scope.frequency){
                            if($scope.frequency[b] === currentKey){
                                delete $scope.frequency[b];
                            }
                        }
                    }
                }
            }

            $scope.minuteValue = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
            $scope.hourValue = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
            $scope.dayOfMonthValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
            $scope.dayValue = [0, 1, 2, 3, 4, 5, 6];
            $scope.monthValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

            $scope.$watch('myFrequency', function(n){
                $scope.output = cronService.setCron(n);
            }, true);
        }
    };
}]).filter('numeral', function() {
    return function(input) {
        switch (input) {
            case 1:
                return '1st';
            case 2:
                return '2nd';
            case 3:
                return '3rd';
            case null:
                return null;
            default:
                return input + 'th';
        }
    };
}).filter('monthName', function() {
    return function(input) {
        var months = {
            1: 'January',
            2: 'February',
            3: 'March',
            4: 'April',
            5: 'May',
            6: 'June',
            7: 'July',
            8: 'August',
            9: 'September',
            10: 'October',
            11: 'November',
            12: 'December'
        };

        if (input !== null && angular.isDefined(months[input])) {
            return months[input];
        } else {
            return null;
        }
    };
}).filter('dayName', function() {
    return function(input) {
        var days = {
            0: 'Sunday',
            1: 'Monday',
            2: 'Tuesday',
            3: 'Wednesday',
            4: 'Thursday',
            5: 'Friday',
            6: 'Saturday',
        };

        if (input !== null && angular.isDefined(days[input])) {
            return days[input];
        } else {
            return null;
        }
    };
});

'use strict';

angular.module('angular-cron-jobs').factory('cronService', function() {
    var service = {};

    service.setCron = function(n) {
        var cron = ['*', '*', '*',  '*',  '*'];

        if(n && n.base && n.base >= '2') {
            cron[0] = typeof n.minuteValue !== undefined ? n.minuteValue : '*';
        }

        if(n && n.base && n.base >= '3') {
            cron[1] = typeof n.hourValue !== undefined ? n.hourValue  : '*';
        }

        if(n && n.base && n.base === '4') {
            cron[4] = n.dayValue;
        }

        if(n && n.base && n.base >= '5') {
            cron[2] = typeof n.dayOfMonthValue !== undefined ? n.dayOfMonthValue : '*';
        }

        if(n && n.base && n.base === '6') {
            cron[3] = typeof n.monthValue !== undefined ? n.monthValue : '*';
        }

        return cron.join(' ');
    };

    service.fromCron = function(value) { 
       var cron = value.replace(/\s+/g, ' ').split(' ');
       var frequency = {base: '1'}; // default: every minute

       if(cron[1] === '*' && cron[2] === '*' && cron[3] === '*'  && cron[4] === '*') {
           frequency.base = 2; // every hour
       } else if(cron[2] === '*' && cron[3] === '*'  && cron[4] === '*') {
           frequency.base = 3; // every day
       } else if(cron[2] === '*' && cron[3] === '*') {
           frequency.base = 4; // every week
       } else if(cron[3] === '*' && cron[4] === '*') {
           frequency.base = 5; // every month
       } else if(cron[4] === '*') {
           frequency.base = 6; // every year
       }

       if (cron[0] !== '*') {
           frequency.minuteValue = parseInt(cron[0]);
       }
       if (cron[1] !== '*') {
           frequency.hourValue = parseInt(cron[1]);
       }
       if (cron[2] !== '*') {
           frequency.dayOfMonthValue = parseInt(cron[2]);
       }
       if (cron[3] !== '*') {
           frequency.monthValue = parseInt(cron[3]);
       }
       if (cron[4] !== '*') {
           frequency.dayValue = parseInt(cron[4]);
       }

       frequency.base += ''; // 'cast' to string in order to set proper value on "every" modal

       return frequency;
   };
   
   return service;
});
