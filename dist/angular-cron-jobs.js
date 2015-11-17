/**
 * UI Component For Creating Cron Job Syntax To Send To Server
 * @version v1.4.1 - 2015-11-17 * @link https://github.com/jacobscarter/angular-cron-jobs
 * @author Jacob Carter <jacob@ieksolutions.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
angular.module('templates-angularcronjobs', ['cronselection.html']);

angular.module("cronselection.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("cronselection.html",
    "<div class=\"cron-wrap\">\n" +
    "<span>Every: </span>\n" +
    "	<select class=\"cron-select\" ng-model=\"myFrequency.base\" ng-options=\"item.value as item.label for item in frequency\"></select>\n" +
    "\n" +
    "	<div class=\"select-options\" ng-if=\"!multiMode\">\n" +
    "		<span ng-show=\"myFrequency.base == 4\"> on </span>\n" +
    "		<select ng-show=\"myFrequency.base == 4\" class=\"cron-select day-value\" ng-model=\"myFrequency.dayValue\" ng-options=\"(value | cronDayName) for value in dayValue\"></select>\n" +
    "		<span ng-show=\"myFrequency.base >= 5\">on the </span>\n" +
    "		<select ng-show=\"myFrequency.base >= 5\" class=\"cron-select day-of-month-value\" ng-model=\"myFrequency.dayOfMonthValue\" ng-options=\"(value | cronNumeral) for value in dayOfMonthValue\" ></select>\n" +
    "		<span ng-show=\"myFrequency.base == 6\">of </span>\n" +
    "		<select ng-show=\"myFrequency.base == 6\" class=\"cron-select month-value\" ng-model=\"myFrequency.monthValue\" ng-options=\"(value | cronMonthName) for value in monthValue\" ></select>\n" +
    "		<span ng-show=\"myFrequency.base >= 2\">at </span>\n" +
    "		<select ng-show=\"myFrequency.base >= 3\" class=\"cron-select hour-value\" ng-model=\"myFrequency.hourValue\" ng-options=\"value for value in hourValue\"></select>\n" +
    "		<span ng-show=\"myFrequency.base >= 3\"> : </span>\n" +
    "		<select ng-show=\"myFrequency.base >= 2\" class=\"cron-select minute-value\" ng-model=\"myFrequency.minuteValue\" ng-options=\"value for value in minuteValue\"></select>\n" +
    "		<span ng-show=\"myFrequency.base == 2\"> past the hour</span>\n" +
    "	</div>\n" +
    "\n" +
    "    <div class=\"cron-wrap\" ng-if=\"multiMode\">\n" +
    "        <span>Every: </span>\n" +
    "        <select class=\"cron-select\" ng-model=\"myFrequency.base\" ng-options=\"item.value as item.label for item in frequency\"></select>\n" +
    "\n" +
    "        <div class=\"select-options\">\n" +
    "            <span ng-show=\"myFrequency.base == 4\"> on </span>\n" +
    "            <select multiple='multiple'  ng-show=\"myFrequency.base == 4\" class=\"cron-select day-value\" ng-model=\"myFrequency.dayValue\" ng-options=\"(value | cronDayName) for value in dayValue\"></select>\n" +
    "            <span ng-show=\"myFrequency.base >= 5\">on the </span>\n" +
    "            <select multiple='multiple'  ng-show=\"myFrequency.base >= 5\" class=\"cron-select day-of-month-value\" ng-model=\"myFrequency.dayOfMonthValue\" ng-options=\"(value | cronNumeral) for value in dayOfMonthValue\" ></select>\n" +
    "            <span ng-show=\"myFrequency.base == 6\">of </span>\n" +
    "            <select multiple='multiple'  ng-show=\"myFrequency.base == 6\" class=\"cron-select month-value\" ng-model=\"myFrequency.monthValue\" ng-options=\"(value | cronMonthName) for value in monthValue\" ></select>\n" +
    "            <span ng-show=\"myFrequency.base >= 2\">at </span>\n" +
    "            <select multiple='multiple'  ng-show=\"myFrequency.base >= 3\" class=\"cron-select hour-value\" ng-model=\"myFrequency.hourValue\" ng-options=\"value for value in hourValue\"></select>\n" +
    "            <span ng-show=\"myFrequency.base >= 3\"> : </span>\n" +
    "            <select multiple='multiple'  ng-show=\"myFrequency.base >= 2\" class=\"cron-select minute-value\" ng-model=\"myFrequency.minuteValue\" ng-options=\"value for value in minuteValue\"></select>\n" +
    "            <span ng-show=\"myFrequency.base == 2\"> past the hour</span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

'use strict';

angular.module('angular-cron-jobs', ['templates-angularcronjobs']);

/**
 * Created by intelWorx on 17/11/2015.
 */
(function () {
  'use strict';

  angular.module('angular-cron-jobs')
    .value('cronFrequency', {
      EVERY_MINUTE: 1,
      EVERY_HOUR: 2,
      EVERY_DAY: 3,
      EVERY_WEEK: 4,
      EVERY_MONTH: 5,
      EVERY_YEAR: 6
    });

})();
(function () {
    'use strict';

    angular.module('angular-cron-jobs').directive('cronSelection', ['cronService', 'cronFrequency', function (cronService, cronFrequency) {
            return {
                restrict: 'EA',
                replace: true,
                transclude: true,
                scope: {
                    config: '=',
                    output: '=?',
                    init: '=?',
                    multiMode: '='
                },
                templateUrl: function (element, attributes) {
                    return attributes.template || 'cronselection.html';
                },
                link: function ($scope) {

                    var originalInit = undefined;
                    var initChanged = false;

                    $scope.frequency = [
                        {
                            value: cronFrequency.EVERY_MINUTE,
                            label: 'Minute'
                        },
                        {
                            value: cronFrequency.EVERY_HOUR,
                            label: 'Hour'
                        },
                        {
                            value: cronFrequency.EVERY_DAY,
                            label: 'Day'
                        },
                        {
                            value: cronFrequency.EVERY_WEEK,
                            label: 'Week'
                        },
                        {
                            value: cronFrequency.EVERY_MONTH,
                            label: 'Month'
                        },
                        {
                            value: cronFrequency.EVERY_YEAR,
                            label: 'Year'
                        }
                    ];


                    if (angular.isDefined($scope.init)) {
                        //console.log('init value found: ', $scope.init);
                        originalInit = angular.copy($scope.init);
                        $scope.myFrequency = cronService.fromCron($scope.init, !!$scope.multiMode);
                    }

                    $scope.$watch('init', function (newValue) {
                        //console.log('watch on init fired!', newValue, originalInit);
                        if (angular.isDefined(newValue) && newValue && (newValue !== originalInit)) {
                            initChanged = true;
                            $scope.myFrequency = cronService.fromCron(newValue, !!$scope.multiMode);
                        }
                    });

                    if (typeof $scope.config === 'object' && !$scope.config.length) {
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

                    var range = function (start, end, step) {
                        var r = [];
                        step = step || (start > end ? -1 : 1);
                        for (var i = start; i <= end; i += step) {
                            r.push(i);
                        }
                        return r;
                    };
                    $scope.minuteValue = range(0, 55, 5);
                    $scope.hourValue = range(0, 23);
                    $scope.dayOfMonthValue = range(1, 31);
                    $scope.dayValue = range(0, 6);
                    $scope.monthValue = range(1, 12);

                    $scope.$watch('myFrequency', function (n, o) {
                        //console.log('myFrequency changed: ', n, initChanged);
                        if (n && (!o || n.base !== o.base) && !initChanged) {
                            //console.log('base changed!', n, o);
                            if (n && n.base) {
                                n.base = parseInt(n.base);
                                if (n.base >= cronFrequency.EVERY_HOUR) {
                                    n.minuteValue = $scope.minuteValue[0];
                                }

                                if (n.base >= cronFrequency.EVERY_DAY) {
                                    n.hourValue = $scope.hourValue[0];
                                }

                                if (n.base === cronFrequency.EVERY_WEEK) {
                                    n.dayValue = $scope.dayValue[0];
                                }

                                if (n.base >= cronFrequency.EVERY_MONTH) {
                                    n.dayOfMonthValue = $scope.dayOfMonthValue[0];
                                }

                                if (n.base === cronFrequency.EVERY_YEAR) {
                                    n.monthValue = $scope.monthValue[0];
                                }
                            }
                        } else if (n && n.base && o && o.base) {
                            initChanged = false;
                        }

                        $scope.output = cronService.setCron(n, !!$scope.multiMode);
                    }, true);


                }
            };
        }])
        .filter('cronNumeral', function () {
            return function (input) {
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
        })
        .filter('cronMonthName', function () {
            var months = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ];
            return function (input) {
                var idx = parseInt(input, 10) - 1;
                if (input !== null && angular.isDefined(months[idx])) {
                    return months[idx];
                } else {
                    return null;
                }
            };
        })
        .filter('cronDayName', function () {
            var days = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ];
            return function (input) {
                input = parseInt(input, 10)
                if (input !== null && angular.isDefined(days[input])) {
                    return days[input];
                } else {
                    return null;
                }
            };
        })
    ;
})();
(function () {
    'use strict';

    angular.module('angular-cron-jobs').factory('cronService', ['cronFrequency',
        function (cronFrequency) {
            var service = {};

            service.setCron = function (n, isMultiMode) {
                //  console.log('set cron called: ', n);
                var cron = ['*', '*', '*', '*', '*'];

                var cronValue = function (val) {
                    if (angular.isUndefined(val) || val === '') {
                        return '*';
                    }

                    if (isMultiMode && angular.isArray(val)) {
                        return val.length > 0 ? val.join(',') : '*';
                    }

                    return val;
                };


                if (n && n.base) {
                    if (n.base >= cronFrequency.EVERY_HOUR) {
                        cron[0] = cronValue(n.minuteValue);
                    }

                    if (n.base >= cronFrequency.EVERY_DAY) {
                        cron[1] = cronValue(n.hourValue);
                    }

                    if (n.base === cronFrequency.EVERY_WEEK) {
                        cron[4] = cronValue(n.dayValue);
                    }

                    if (n.base >= cronFrequency.EVERY_MONTH) {
                        cron[2] = cronValue(n.dayOfMonthValue);
                    }

                    if (n.base === cronFrequency.EVERY_YEAR) {
                        cron[3] = cronValue(n.monthValue);
                    }
                }
                //  console.log('cron after setCron ', cron.join(' '));
                console.log('Cron', cron);
                return cron.join(' ');
            };

            service.fromCron = function (value, isMultiMode) {
                //  console.log('set cron fired!');
                var cron = value.replace(/\s+/g, ' ').split(' ');
                var frequency = {base: '1'}; // default: every minute

                //cron must be of length 5
                while (cron.length < 5) {
                    cron.push('*');
                }

                var parseValue = function (v) {
                    return isMultiMode ? v.split(',').map(function (val) {
                        return parseInt(val, 10)
                    }) : parseInt(v);
                };

                if (cron[0] === '*' && cron[1] === '*' && cron[2] === '*' && cron[3] === '*' && cron[4] === '*') {
                    frequency.base = cronFrequency.EVERY_MINUTE; // every minute
                } else if (cron[1] === '*' && cron[2] === '*' && cron[3] === '*' && cron[4] === '*') {
                    frequency.base = cronFrequency.EVERY_HOUR; // every hour
                } else if (cron[2] === '*' && cron[3] === '*' && cron[4] === '*') {
                    frequency.base = cronFrequency.EVERY_DAY; // every day
                } else if (cron[2] === '*' && cron[3] === '*') {
                    frequency.base = cronFrequency.EVERY_WEEK; // every week
                } else if (cron[3] === '*' && cron[4] === '*') {
                    frequency.base = cronFrequency.EVERY_MONTH; // every month
                } else if (cron[4] === '*') {
                    frequency.base = cronFrequency.EVERY_YEAR; // every year
                }

                // console.log('frequency should be 5: ', frequency, cron);

                if (cron[0] !== '*') {
                    frequency.minuteValue = parseValue(cron[0]);
                }
                if (cron[1] !== '*') {
                    frequency.hourValue = parseValue(cron[1]);
                }
                if (cron[2] !== '*') {
                    frequency.dayOfMonthValue = parseValue(cron[2]);
                }
                if (cron[3] !== '*') {
                    frequency.monthValue = parseValue(cron[3]);
                }
                if (cron[4] !== '*') {
                    frequency.dayValue = parseValue(cron[4]);
                }

                //frequency.base += ''; // 'cast' to string in order to set proper value on "every" modal

                // console.log('freq ', frequency);
                return frequency;
            };

            return service;
        }
    ]);
})();