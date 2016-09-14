"use strict";

angular.module("angular-cron-jobs", ["templates-angularcronjobs"]);

angular.module("angular-cron-jobs").directive("cronSelection", ["cronService", function(cronService) {
    return {
        restrict: "EA",
        replace: true,
        transclude: true,
        require: "ngModel",
        scope: {
            ngModel: "=",
            config: "=",
            myFrequency: "=?frequency"
        },
        templateUrl: function(element, attributes) {
            return attributes.template || "cronselection.html";
        },
        link: function($scope, $el, $attr, $ngModel) {

            var modelChanged = false;
            var setInitialValuesForBase = setInitialValuesForBase_;

            $scope.frequency = [{
                value: 1,
                label: "Minute"
            }, {
                value: 2,
                label: "Hour"
            }, {
                value: 3,
                label: "Day"
            }, {
                value: 4,
                label: "Week"
            }, {
                value: 5,
                label: "Month"
            }, {
                value: 6,
                label: "Year"
            }];

            $scope.$watch("ngModel", function (newValue) {
                if (angular.isDefined(newValue) && newValue) {
                    modelChanged = true;
                    $scope.myFrequency = cronService.fromCron(newValue, $scope.allowMultiple);
                } else if (newValue === "") {
                    $scope.myFrequency = undefined;
                }
            });

            if (typeof $scope.config === "object" && !$scope.config.length) {
                if (typeof $scope.config.options === "object") {
                    var optionsKeyArray = Object.keys($scope.config.options);
                    for (var i in optionsKeyArray) {
                        var currentKey = optionsKeyArray[i].replace(/^allow/, "");
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

            $scope.$watch("myFrequency", function (n, o) {
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

            function setInitialValuesForBase_(freq) {
                freq.base = parseInt(freq.base);

                if (freq.base >= 2) {
                    freq.minuteValues = $scope.minuteValues[0];
                }

                if (freq.base >= 3) {
                    freq.hourValues = $scope.hourValues[0];
                }

                if (freq.base === 4) {
                    freq.dayValues = $scope.dayValues[0];
                }

                if (freq.base >= 5) {
                    freq.dayOfMonthValues = $scope.dayOfMonthValues[0];
                }

                if (freq.base === 6) {
                    freq.monthValues = $scope.monthValues[0];
                }
            }
        }
    };
}]).filter("cronNumeral", function() {
    return function(input) {
        switch (input) {
            case 1:
                return "1st";
            case 2:
                return "2nd";
            case 3:
                return "3rd";
            case 21:
                return "21st";
            case 22:
                return "22nd";
            case 23:
                return "23rd";
            case 31:
                return "31st";
            case null:
                return null;
            default:
                return input + "th";
        }
    };
}).filter("cronMonthName", function() {
    return function(input) {
        var months = {
            1: "January",
            2: "February",
            3: "March",
            4: "April",
            5: "May",
            6: "June",
            7: "July",
            8: "August",
            9: "September",
            10: "October",
            11: "November",
            12: "December"
        };

        if (input !== null && angular.isDefined(months[input])) {
            return months[input];
        } else {
            return null;
        }
    };
}).filter("cronDayName", function() {
    return function(input) {
        var days = {
            0: "Sunday",
            1: "Monday",
            2: "Tuesday",
            3: "Wednesday",
            4: "Thursday",
            5: "Friday",
            6: "Saturday",
        };

        if (input !== null && angular.isDefined(days[input])) {
            return days[input];
        } else {
            return null;
        }
    };
});
