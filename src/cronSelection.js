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
