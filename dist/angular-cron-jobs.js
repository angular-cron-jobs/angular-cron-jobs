/**
 * UI Component For Creating Cron Job Syntax To Send To Server
 * @version v3.0.2 - 2016-09-14 * @link https://github.com/jacobscarter/angular-cron-jobs
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
    "        <span ng-show=\"myFrequency.base == 4\">on </span>\n" +
    "        <div ng-show=\"myFrequency.base == 4\" class=\"cron-select-wrap\">\n" +
    "            <!-- If Multiple is Enabled -->\n" +
    "            <select class=\"cron-select day-value\"\n" +
    "                    ng-model=\"myFrequency.dayValues\"\n" +
    "                    ng-if=\"allowMultiple\" multiple\n" +
    "                    ng-options=\"value as (value | cronDayName) for value in dayValues\">\n" +
    "            </select>\n" +
    "            <!-- If Multiple is not Enabled -->\n" +
    "            <select class=\"cron-select day-value\"\n" +
    "                    ng-model=\"myFrequency.dayValues\"\n" +
    "                    ng-if=\"!allowMultiple\"\n" +
    "                    ng-options=\"value as (value | cronDayName) for value in dayValues\">\n" +
    "            </select>\n" +
    "        </div>\n" +
    "        <span ng-show=\"myFrequency.base >= 5\">on the </span>\n" +
    "        <div ng-show=\"myFrequency.base >= 5\" class=\"cron-select-wrap\">\n" +
    "            <!-- If Multiple is Enabled -->\n" +
    "            <select class=\"cron-select day-of-month-value\"\n" +
    "                    ng-model=\"myFrequency.dayOfMonthValues\"\n" +
    "                    ng-if=\"allowMultiple\" multiple\n" +
    "                    ng-options=\"value as (value | cronNumeral) for value in dayOfMonthValues\">\n" +
    "            </select>\n" +
    "            <!-- If Multiple is not Enabled -->\n" +
    "            <select class=\"cron-select day-of-month-value\"\n" +
    "                    ng-model=\"myFrequency.dayOfMonthValues\"\n" +
    "                    ng-if=\"!allowMultiple\"\n" +
    "                    ng-options=\"value as (value | cronNumeral) for value in dayOfMonthValues\">\n" +
    "            </select>\n" +
    "        </div>\n" +
    "        <span ng-show=\"myFrequency.base == 6\">of </span>\n" +
    "        <!-- If Multiple is Enabled -->\n" +
    "        <div ng-show=\"myFrequency.base == 6\" class=\"cron-select-wrap\">\n" +
    "            <select class=\"cron-select month-value\"\n" +
    "                    ng-model=\"myFrequency.monthValues\"\n" +
    "                    ng-if=\"allowMultiple\" multiple\n" +
    "                    ng-options=\"value as (value | cronMonthName) for value in monthValues\">\n" +
    "            </select>\n" +
    "            <!-- If Multiple is not Enabled -->\n" +
    "            <select class=\"cron-select month-value\"\n" +
    "                    ng-model=\"myFrequency.monthValues\"\n" +
    "                    ng-if=\"!allowMultiple\"\n" +
    "                    ng-options=\"value as (value | cronMonthName) for value in monthValues\">\n" +
    "            </select>\n" +
    "        </div>\n" +
    "        <span ng-show=\"myFrequency.base >= 2\">at </span>\n" +
    "        <!-- If Multiple is Enabled -->\n" +
    "        <div ng-show=\"myFrequency.base >= 3\" class=\"cron-select-wrap\">\n" +
    "            <select class=\"cron-select hour-value\"\n" +
    "                    ng-model=\"myFrequency.hourValues\"\n" +
    "                    ng-if=\"allowMultiple\" multiple\n" +
    "                    ng-options=\"value as value for value in hourValues\">\n" +
    "            </select>\n" +
    "            <!-- If Multiple is not Enabled -->\n" +
    "            <select class=\"cron-select hour-value\"\n" +
    "                    ng-model=\"myFrequency.hourValues\"\n" +
    "                    ng-if=\"!allowMultiple\"\n" +
    "                    ng-options=\"value as value for value in hourValues\">\n" +
    "            </select>\n" +
    "        </div>\n" +
    "        <span ng-show=\"myFrequency.base >= 3\"> : </span>\n" +
    "        <!-- If Multiple is Enabled -->\n" +
    "        <div ng-show=\"myFrequency.base >= 2\" class=\"cron-select-wrap\">\n" +
    "            <select class=\"cron-select minute-value\"\n" +
    "                    ng-model=\"myFrequency.minuteValues\"\n" +
    "                    ng-if=\"allowMultiple\" multiple\n" +
    "                    ng-options=\"value as value for value in minuteValues\">\n" +
    "            </select>\n" +
    "            <!-- If Multiple is not Enabled -->\n" +
    "            <select class=\"cron-select minute-value\"\n" +
    "                    ng-model=\"myFrequency.minuteValues\"\n" +
    "                    ng-if=\"!allowMultiple\"\n" +
    "                    ng-options=\"value as value for value in minuteValues\">\n" +
    "            </select>\n" +
    "        </div>\n" +
    "        <span ng-show=\"myFrequency.base == 2\"> past the hour</span>\n" +
    "    </div>\n" +
    "</div>");
}]);

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

"use strict";

angular.module("angular-cron-jobs").factory("cronService", function() {
    var service = {};

    service.setCron = function(n) {
        var cron = ["*", "*", "*", "*", "*"];

        if (n && n.base && n.base >= 2) {
            cron[0] = typeof n.minuteValues !== "undefined" ? n.minuteValues : "*";
        }

        if (n && n.base && n.base >= 3) {
            cron[1] = typeof n.hourValues !== "undefined" ? n.hourValues : "*";
        }

        if (n && n.base && n.base === 4) {
            cron[4] = n.dayValues;
        }

        if (n && n.base && n.base >= 5) {
            cron[2] = typeof n.dayOfMonthValues !== "undefined" ? n.dayOfMonthValues : "*";
        }

        if (n && n.base && n.base === 6) {
            cron[3] = typeof n.monthValues !== "undefined" ? n.monthValues : "*";
        }
        return cron.join(" ");
    };

    service.fromCron = function(value, allowMultiple) {
        var cron = value.replace(/\s+/g, " ").split(" ");
        var frequency = { base: "1" }; // default: every minute
        var tempArray = [];

        if (cron[0] === "*" && cron[1] === "*" && cron[2] === "*" && cron[3] === "*" && cron[4] === "*") {
            frequency.base = 1; // every minute
        } else if (cron[1] === "*" && cron[2] === "*" && cron[3] === "*" && cron[4] === "*") {
            frequency.base = 2; // every hour
        } else if (cron[2] === "*" && cron[3] === "*" && cron[4] === "*") {
            frequency.base = 3; // every day
        } else if (cron[2] === "*" && cron[3] === "*") {
            frequency.base = 4; // every week
        } else if (cron[3] === "*" && cron[4] === "*") {
            frequency.base = 5; // every month
        } else if (cron[4] === "*") {
            frequency.base = 6; // every year
        }

        if (cron[0] !== "*") {
            //preparing to handle multiple minutes
            if (allowMultiple) {
                tempArray = cron[0].split(",");
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.minuteValues = tempArray;
            } else {
                frequency.minuteValues = parseInt(cron[0]);
            }
        }
        if (cron[1] !== "*") {
            //preparing to handle multiple hours
            if (allowMultiple) {
                tempArray = cron[1].split(",");
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.hourValues = tempArray;
            } else {
                frequency.hourValues = parseInt(cron[1]);
            }
        }
        if (cron[2] !== "*") {
            //preparing to handle multiple days of the month
            if (allowMultiple) {
                tempArray = cron[2].split(",");
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.dayOfMonthValues = tempArray;
            } else {
                frequency.dayOfMonthValues = parseInt(cron[2]);
            }
        }
        if (cron[3] !== "*") {
            //preparing to handle multiple months
            if (allowMultiple) {
                tempArray = cron[3].split(",");
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.monthValues = tempArray;
            } else {
                frequency.monthValues = parseInt(cron[3]);
            }
        }
        if (cron[4] !== "*") {
            //preparing to handle multiple days of the week
            if (allowMultiple) {
                tempArray = cron[4].split(",");
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.dayValues = tempArray;
            } else {
                frequency.dayValues = parseInt(cron[4]);
            }
        }
        return frequency;
    };
    return service;
});
