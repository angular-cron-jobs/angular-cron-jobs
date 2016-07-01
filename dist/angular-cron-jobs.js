/**
 * UI Component For Creating Cron Job Syntax To Send To Server
 * @version v2.1.1 - 2016-07-01 * @link https://github.com/jacobscarter/angular-cron-jobs
 * @author Jacob Carter <jacob@ieksolutions.com>
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
    "        <div ng-show=\"myFrequency.base == baseFrequency.week\" class=\"cron-select-wrap\">\n" +
    "            <!-- If Multiple is Enabled -->\n" +
    "            <select class=\"cron-select day-value\" ng-model=\"myFrequency.dayValue\" ng-multiple=\"allowMultiple\">\n" +
    "                <option ng-repeat=\"value in dayValue\" ng-selected=\"myFrequency.dayValue.indexOf(value) >= 0\" value=\"{{value}}\">\n" +
    "                    {{value | cronDayName}}\n" +
    "                </option>\n" +
    "            </select>\n" +
    "        </div>\n" +
    "        <span ng-show=\"myFrequency.base >= baseFrequency.month\">on the </span>\n" +
    "        <div ng-show=\"myFrequency.base >= baseFrequency.month\" class=\"cron-select-wrap\">\n" +
    "            <select class=\"cron-select day-of-month-value\" ng-model=\"myFrequency.dayOfMonthValue\" ng-multiple=\"allowMultiple\">\n" +
    "                <option ng-repeat=\"value in dayOfMonthValue\" ng-selected=\"myFrequency.dayOfMonthValue.indexOf(value) >= 0\" value=\"{{value}}\">\n" +
    "                    {{value | cronNumeral}}\n" +
    "                </option>\n" +
    "            </select>\n" +
    "        </div>\n" +
    "        <span ng-show=\"myFrequency.base == baseFrequency.year\">of </span>\n" +
    "        <div ng-show=\"myFrequency.base == baseFrequency.year\" class=\"cron-select-wrap\">\n" +
    "            <select class=\"cron-select month-value\" ng-model=\"myFrequency.monthValue\" ng-multiple=\"allowMultiple\">\n" +
    "                <option ng-repeat=\"value in monthValue\" ng-selected=\"myFrequency.monthValue.indexOf(value) >= 0\" value=\"{{value}}\">\n" +
    "                    {{value | cronMonthName}}\n" +
    "                </option>\n" +
    "            </select>\n" +
    "        </div>\n" +
    "        <span ng-show=\"myFrequency.base >= baseFrequency.hour\">at </span>\n" +
    "        <div ng-show=\"myFrequency.base >= baseFrequency.day\" class=\"cron-select-wrap\">\n" +
    "            <select class=\"cron-select hour-value\" ng-model=\"myFrequency.hourValue\" ng-multiple=\"allowMultiple\">\n" +
    "                <option ng-repeat=\"value in hourValue\" ng-selected=\"myFrequency.hourValue.indexOf(value) >= 0\" value=\"{{value}}\">\n" +
    "                    {{value}}\n" +
    "                </option>\n" +
    "            </select>\n" +
    "        </div>\n" +
    "        <span ng-show=\"myFrequency.base >= baseFrequency.day\"> : </span>\n" +
    "        <div ng-show=\"myFrequency.base >= baseFrequency.hour\" class=\"cron-select-wrap\">\n" +
    "            <select class=\"cron-select minute-value\" ng-model=\"myFrequency.minuteValue\"  ng-multiple=\"allowMultiple\">\n" +
    "                <option ng-repeat=\"value in minuteValue\" ng-selected=\"myFrequency.minuteValue.indexOf(value) >= 0\" value=\"{{value}}\">\n" +
    "                    {{value}}\n" +
    "                </option>\n" +
    "            </select>\n" +
    "        </div>\n" +
    "        <span ng-show=\"myFrequency.base == baseFrequency.hour\"> past the hour</span>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

'use strict';

angular.module('angular-cron-jobs', ['templates-angularcronjobs']);

angular.module('angular-cron-jobs').directive('cronSelection', ['cronService', 'baseFrequency', function(cronService, baseFrequency) {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            config: '=',
            output: '=?',
            init: '=?',
            myFrequency: '=?frequency'
        },
        templateUrl: function(element, attributes) {
            return attributes.template || 'cronselection.html';
        },
        link: function($scope) {

            var originalInit = undefined;
            var initChanged = false;
            
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

            if (angular.isDefined($scope.init)) {
                originalInit = angular.copy($scope.init);
                $scope.myFrequency = cronService.fromCron($scope.init);
            }

            $scope.$watch('init', function(newValue) {
                if (angular.isDefined(newValue) && newValue && (newValue !== originalInit)) {
                    initChanged = true;
                    $scope.myFrequency = cronService.fromCron(newValue);
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

            $scope.minuteValue = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
            $scope.hourValue = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
            $scope.dayOfMonthValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
            $scope.dayValue = [0, 1, 2, 3, 4, 5, 6];
            $scope.monthValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

            $scope.$watch('myFrequency', function(n, o) {
                if (n && (!o || n.base !== o.base) && !initChanged) {
                    if (n && n.base) {
                        n.base = parseInt(n.base);
                    }
                    if (n && n.base && n.base >= baseFrequency.hour) {
                        n.minuteValue = $scope.minuteValue[0];
                    }

                    if (n && n.base && n.base >= baseFrequency.day) {
                        n.hourValue = $scope.hourValue[0];
                    }

                    if (n && n.base && n.base === baseFrequency.week) {
                        n.dayValue = $scope.dayValue[0];
                    }

                    if (n && n.base && n.base >= baseFrequency.month) {
                        n.dayOfMonthValue = $scope.dayOfMonthValue[0];
                    }

                    if (n && n.base && n.base === baseFrequency.year) {
                        n.monthValue = $scope.monthValue[0];
                    }
                } else if (n && n.base && o && o.base) {
                    initChanged = false;
                }
                $scope.output = cronService.setCron(n);
            }, true);


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
        var cron = ['*', '*', '*', '*', '*'];

        if (n && n.base && n.base >= baseFrequency.hour) {
            cron[0] = typeof n.minuteValue !== undefined ? n.minuteValue : '*';
        }

        if (n && n.base && n.base >= baseFrequency.day) {
            cron[1] = typeof n.hourValue !== undefined ? n.hourValue : '*';
        }

        if (n && n.base && n.base === baseFrequency.week) {
            cron[4] = n.dayValue;
        }

        if (n && n.base && n.base >= baseFrequency.month) {
            cron[2] = typeof n.dayOfMonthValue !== undefined ? n.dayOfMonthValue : '*';
        }

        if (n && n.base && n.base === baseFrequency.year) {
            cron[3] = typeof n.monthValue !== undefined ? n.monthValue : '*';
        }
        return cron.join(' ');
    };

    service.fromCron = function(value) {
        var cron = value.replace(/\s+/g, ' ').split(' ');
        var frequency = { base: '1' }; // default: every minute

        if (cron[0] === '*' && cron[1] === '*' && cron[2] === '*' && cron[3] === '*' && cron[4] === '*') {
            frequency.base = 1; // every minute
        } else if (cron[1] === '*' && cron[2] === '*' && cron[3] === '*' && cron[4] === '*') {
            frequency.base = 2; // every hour
        } else if (cron[2] === '*' && cron[3] === '*' && cron[4] === '*') {
            frequency.base = 3; // every day
        } else if (cron[2] === '*' && cron[3] === '*') {
            frequency.base = 4; // every week
        } else if (cron[3] === '*' && cron[4] === '*') {
            frequency.base = 5; // every month
        } else if (cron[4] === '*') {
            frequency.base = 6; // every year
        }

        if (cron[0] !== '*') {
            //preparing to handle multiple minutes
            if (cron[0].indexOf(',') >= 0) {
                var tempArray = cron[0].split(',');
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.minuteValue = tempArray;
            } else {
                frequency.minuteValue = [parseInt(cron[0])];
            }
        }
        if (cron[1] !== '*') {
            //preparing to handle multiple hours
            if (cron[1].indexOf(',') >= 0) {
                var tempArray = cron[1].split(',');
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.hourValue = tempArray;
            } else {
                frequency.hourValue = [parseInt(cron[1])];
            }
        }
        if (cron[2] !== '*') {
            //preparing to handle multiple days of the month
            if (cron[2].indexOf(',') >= 0) {
                var tempArray = cron[2].split(',');
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.dayOfMonthValue = tempArray;
            } else {
                frequency.dayOfMonthValue = [parseInt(cron[2])];
            }
        }
        if (cron[3] !== '*') {
            //preparing to handle multiple months
            if (cron[3].indexOf(',') >= 0) {
                var tempArray = cron[3].split(',');
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.monthValue = tempArray;
            } else {
                frequency.monthValue = [parseInt(cron[3])];
            }
        }
        if (cron[4] !== '*') {
            //preparing to handle multiple days of the week
            if (cron[4].indexOf(',') >= 0) {
                var tempArray = cron[4].split(',');
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.dayValue = tempArray;
            } else {
                frequency.dayValue = [parseInt(cron[4])];
            }
        }
        return frequency;
    };
    return service;
}]);
