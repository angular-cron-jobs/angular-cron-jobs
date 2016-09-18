/**
 * UI Component For Creating Cron Job Syntax To Send To Server
 * @version v3.1.1 - 2016-09-18 * @link https://github.com/jacobscarter/angular-cron-jobs
 * @author Jacob Carter <jc@jacobcarter.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
angular.module('templates-angularcronjobs', ['cronselection.html']);

angular.module("cronselection.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("cronselection.html",
    "<div class=\"cron-wrap\">\n" +
    "    <span>Every: </span>\n" +
    "    <div class=\"cron-select-wrap\">\n" +
    "        <select class=\"cron-select\" ng-model=\"myFrequency.base\" ng-options=\"item.value as item.label for item in frequency\"></select>\n" +
    "    </div>\n" +
    "    <div class=\"select-options\">\n" +
    "        <span ng-show=\"myFrequency.base == baseFrequency.week\">on </span>\n" +
    "\n" +
    "        <div ng-show=\"myFrequency.base == baseFrequency.week\" class=\"cron-select-wrap\">\n" +
    "            <select class=\"cron-select day-value\" ng-model=\"myFrequency.dayValues\" ng-multiple=\"allowMultiple\" convert-to-number>\n" +
    "                <option ng-repeat=\"value in dayValues\" ng-selected=\"myFrequency.dayValues.indexOf(value) >= 0\" value=\"{{value}}\">\n" +
    "                    {{value | cronDayName}}\n" +
    "                </option>\n" +
    "            </select>\n" +
    "        </div>\n" +
    "        \n" +
    "        <span ng-show=\"myFrequency.base >= baseFrequency.month\">on the </span>\n" +
    "\n" +
    "        <div ng-show=\"myFrequency.base >= baseFrequency.month\" class=\"cron-select-wrap\">\n" +
    "            <select class=\"cron-select day-of-month-value\" ng-model=\"myFrequency.dayOfMonthValues\" ng-multiple=\"allowMultiple\" convert-to-number>\n" +
    "                <option ng-repeat=\"value in dayOfMonthValues\" ng-selected=\"myFrequency.dayOfMonthValues.indexOf(value) >= 0\" value=\"{{value}}\">\n" +
    "                    {{value | cronNumeral}}\n" +
    "                </option>\n" +
    "            </select>\n" +
    "        </div>\n" +
    "\n" +
    "        <span ng-show=\"myFrequency.base == baseFrequency.year\">of </span>\n" +
    "\n" +
    "        <div ng-show=\"myFrequency.base == baseFrequency.year\" class=\"cron-select-wrap\">\n" +
    "            <select class=\"cron-select month-value\" ng-model=\"myFrequency.monthValues\" ng-multiple=\"allowMultiple\" convert-to-number>\n" +
    "                <option ng-repeat=\"value in monthValues\" ng-selected=\"myFrequency.monthValues.indexOf(value) >= 0\" value=\"{{value}}\">\n" +
    "                    {{value | cronMonthName}}\n" +
    "                </option>\n" +
    "            </select>\n" +
    "        </div>\n" +
    "\n" +
    "        <span ng-show=\"myFrequency.base >= baseFrequency.hour\">at </span>\n" +
    "\n" +
    "        <div ng-show=\"myFrequency.base >= baseFrequency.day\" class=\"cron-select-wrap\">\n" +
    "            <select class=\"cron-select hour-value\" ng-model=\"myFrequency.hourValues\" ng-multiple=\"allowMultiple\" convert-to-number>\n" +
    "                <option ng-repeat=\"value in hourValues\" ng-selected=\"myFrequency.hourValues.indexOf(value) >= 0\" value=\"{{value}}\">\n" +
    "                    {{value}}\n" +
    "                </option>\n" +
    "            </select>\n" +
    "        </div>\n" +
    "\n" +
    "        <span ng-show=\"myFrequency.base >= baseFrequency.day\"> : </span>\n" +
    "\n" +
    "        <div ng-show=\"myFrequency.base >= baseFrequency.hour\" class=\"cron-select-wrap\">\n" +
    "            <select class=\"cron-select minute-value\" ng-model=\"myFrequency.minuteValues\"  ng-multiple=\"allowMultiple\" convert-to-number>\n" +
    "                <option ng-repeat=\"value in minuteValues\" ng-selected=\"myFrequency.minuteValues.indexOf(value) >= 0\" value=\"{{value}}\">\n" +
    "                    {{value}}\n" +
    "                </option>\n" +
    "            </select>\n" +
    "        </div>\n" +
    "        <span ng-show=\"myFrequency.base == 2\"> past the hour</span>\n" +
    "    </div>\n" +
    "</div>");
}]);

'use strict';

angular.module('angular-cron-jobs', ['templates-angularcronjobs']);

angular.module('angular-cron-jobs').directive('cronSelection', ['cronService', 'baseFrequency', function(cronService, baseFrequency) {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        require: 'ngModel',
        scope: {
            ngModel: '=',
            config: '=',
            myFrequency: '=?frequency'
        },
        templateUrl: function(element, attributes) {
            return attributes.template || 'cronselection.html';
        },
        link: function($scope, $el, $attr, $ngModel) {

            var modelChanged = false;
            
            $scope.baseFrequency = baseFrequency;

            $scope.frequency = [{
                value: 1,
                label: 'Minute'
            }, {
                value: 2,
                label: 'Hour'
            }, {
                value: 3,
                label: 'Day'
            }, {
                value: 4,
                label: 'Week'
            }, {
                value: 5,
                label: 'Month'
            }, {
                value: 6,
                label: 'Year'
            }];

            $scope.$watch('ngModel', function (newValue) {
                if (angular.isDefined(newValue) && newValue) {
                    modelChanged = true;
                    $scope.myFrequency = cronService.fromCron(newValue, $scope.allowMultiple);
                } else if (newValue === '') {
                    $scope.myFrequency = undefined;
                }
            });

            if (typeof $scope.config === 'object' && !$scope.config.length) {
                if (typeof $scope.config.options === 'object') {
                    var optionsKeyArray = Object.keys($scope.config.options);
                    for (var i in optionsKeyArray) {
                        var currentKey = optionsKeyArray[i].replace(/^allow/, '');
                        var originalKey = optionsKeyArray[i];
                        if (!$scope.config.options[originalKey]) {
                            for (var b in $scope.frequency) {
                                if ($scope.frequency[b].label === currentKey) {
                                    $scope.frequency.splice(b, 1);
                                }
                            }
                        }
                    }
                }
                if (angular.isDefined($scope.config.allowMultiple)) {
                    $scope.allowMultiple = $scope.config.allowMultiple;
                } else {
                    $scope.allowMultiple = false;
                }
            }

            $scope.minuteValues = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
            $scope.hourValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
            $scope.dayOfMonthValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
            $scope.dayValues = [0, 1, 2, 3, 4, 5, 6];
            $scope.monthValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

            $scope.$watch('myFrequency', function (n, o) {
                if (n !== undefined) {
                    if (n && n.base && (!o || n.base !== o.base) && !modelChanged) {
                        setInitialValuesForBase(n);
                    } else if (n && n.base && o && o.base) {
                        modelChanged = false;
                    }

                    var newVal = cronService.setCron(n);
                    $ngModel.$setViewValue(newVal);
                }
            }, true);

            function setInitialValuesForBase(freq) {
                freq.base = parseInt(freq.base);

                if (freq.base >= baseFrequency.hour) {
                    freq.minuteValues = $scope.minuteValues[0];
                }

                if (freq.base >= baseFrequency.day) {
                    freq.hourValues = $scope.hourValues[0];
                }

                if (freq.base === baseFrequency.week) {
                    freq.dayValues = $scope.dayValues[0];
                }

                if (freq.base >= baseFrequency.month) {
                    freq.dayOfMonthValues = $scope.dayOfMonthValues[0];
                }

                if (freq.base === baseFrequency.year) {
                    freq.monthValues = $scope.monthValues[0];
                }
            }
        }
    };
}]).filter('cronNumeral', function() {
    return function(input) {
        switch (input) {
            case 1:
                return '1st';
            case 2:
                return '2nd';
            case 3:
                return '3rd';
            case 21:
                return '21st';
            case 22:
                return '22nd';
            case 23:
                return '23rd';
            case 31:
                return '31st';
            case null:
                return null;
            default:
                return input + 'th';
        }
    };
}).filter('cronMonthName', function() {
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
}).filter('cronDayName', function() {
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
}).directive('ngMultiple', function() {
    return {
        restrict: 'A',
        scope: {
            ngMultiple: '='
        },
        link: function (scope, element) {
            var unwatch = scope.$watch('ngMultiple', function(newValue) {
                if (newValue) {
                    element.attr('multiple', 'multiple');
                } else {
                    element.removeAttr('multiple');
                }
            });
        }
    };
})
.directive('convertToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(val) {
        return parseInt(val, 10);
      });
      ngModel.$formatters.push(function(val) {
        return '' + val;
      });
    }
  };
});

'use strict';

angular.module('angular-cron-jobs')
.value('baseFrequency', {
    minute: 1,
    hour: 2,
    day: 3,
    week: 4,
    month: 5,
    year: 6
})
.factory('cronService', ['baseFrequency', function(baseFrequency) {
    var service = {};

    service.setCron = function(n) {
        // minute, hour, day, week, month, year
        var cron = ['*', '*', '*', '*', '*'];

        if (n && n.base && n.base >= baseFrequency.hour) {
            cron[0] = typeof n.minuteValues !== 'undefined' ? n.minuteValues : '*';
        }

        if (n && n.base && n.base >= baseFrequency.day) {
            cron[1] = typeof n.hourValues !== 'undefined' ? n.hourValues : '*';
        }

        if (n && n.base && n.base === baseFrequency.week) {
            cron[4] = n.dayValues;
        }

        if (n && n.base && n.base >= baseFrequency.month) {
            cron[2] = typeof n.dayOfMonthValues !== 'undefined' ? n.dayOfMonthValues : '*';
        }

        if (n && n.base && n.base === baseFrequency.year) {
            cron[3] = typeof n.monthValues !== 'undefined' ? n.monthValues : '*';
        }
        return cron.join(' ');
    };

    service.fromCron = function(value, allowMultiple) {
        var cron = value.replace(/\s+/g, ' ').split(' ');
        var frequency = { base: '1' }; // default: every minute

        if (cron[0] === '*' && cron[1] === '*' && cron[2] === '*' && cron[3] === '*' && cron[4] === '*') {
            frequency.base = baseFrequency.minute; // every minute
        } else if (cron[1] === '*' && cron[2] === '*' && cron[3] === '*' && cron[4] === '*') {
            frequency.base = baseFrequency.hour; // every hour
        } else if (cron[2] === '*' && cron[3] === '*' && cron[4] === '*') {
            frequency.base = baseFrequency.day; // every day
        } else if (cron[2] === '*' && cron[3] === '*') {
            frequency.base = baseFrequency.week; // every week
        } else if (cron[3] === '*' && cron[4] === '*') {
            frequency.base = baseFrequency.month; // every month
        } else if (cron[4] === '*') {
            frequency.base = baseFrequency.year; // every year
        }

        if (cron[0] !== '*') {
            //preparing to handle multiple minutes
            if (allowMultiple) {
                var tempArray = cron[0].split(',');
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.minuteValues = tempArray;
            } else {
                frequency.minuteValues = parseInt(cron[0]);
            }
        }
        if (cron[1] !== '*') {
            //preparing to handle multiple hours
            if (allowMultiple) {
                var tempArray = cron[1].split(',');
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.hourValues = tempArray;
            } else {
                frequency.hourValues = parseInt(cron[1]);
            }
        }
        if (cron[2] !== '*') {
            //preparing to handle multiple days of the month
            if (allowMultiple) {
                var tempArray = cron[2].split(',');
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.dayOfMonthValues = tempArray;
            } else {
                frequency.dayOfMonthValues = parseInt(cron[2]);
            }
        }
        if (cron[3] !== '*') {
            //preparing to handle multiple months
            if (allowMultiple) {
                var tempArray = cron[3].split(',');
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.monthValues = tempArray;
            } else {
                frequency.monthValues = parseInt(cron[3]);
            }
        }
        if (cron[4] !== '*') {
            //preparing to handle multiple days of the week
            if (allowMultiple) {
                var tempArray = cron[4].split(',');
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.dayValues = tempArray;
            } else {
                frequency.dayValues = parseInt(cron[4]);
            }
        }
        return frequency;
    };
    return service;
}]);