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
                                n.base = parseInt(n.base, 10);

                                if (n.base >= cronFrequency.EVERY_HOUR) {
                                    n.minuteValue = $scope.multiMode ? [$scope.minuteValue[0]] : $scope.minuteValue[0];
                                }

                                if (n.base >= cronFrequency.EVERY_DAY) {
                                    n.hourValue = $scope.multiMode ? [$scope.hourValue[0]] : $scope.hourValue[0];
                                }

                                if (n.base === cronFrequency.EVERY_WEEK) {
                                    n.dayValue = $scope.multiMode ? [$scope.dayValue[0]] : $scope.dayValue[0];
                                }

                                if (n.base >= cronFrequency.EVERY_MONTH) {
                                    n.dayOfMonthValue = $scope.multiMode ? [$scope.dayOfMonthValue[0]] : $scope.dayOfMonthValue[0];
                                }

                                if (n.base === cronFrequency.EVERY_YEAR) {
                                    n.monthValue = $scope.multiMode ? [$scope.monthValue[0]] : $scope.monthValue[0];
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