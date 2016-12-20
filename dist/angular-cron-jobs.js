/**
 * UI Component For Creating Cron Job Syntax To Send To Server
 * @version v3.2.2 - 2016-12-20 * @link https://github.com/jacobscarter/angular-cron-jobs
 * @author Jacob Carter <jc@jacobcarter.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
angular.module('templates-angularcronjobs', ['cronselection.html']);

angular.module("cronselection.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("cronselection.html",
    "<div class=\"cron-wrap\">\n" +
    "    <span>{{templateKeys.EVERY}}: </span>\n" +
    "    <div class=\"cron-select-wrap\">\n" +
    "        <select class=\"cron-select\" ng-model=\"myFrequency.base\" ng-options=\"item.value as item.label for item in frequency\"></select>\n" +
    "    </div>\n" +
    "    <div class=\"select-options\">\n" +
    "        <span ng-show=\"myFrequency.base == 4\">{{templateKeys.ON}} </span>\n" +
    "        <div ng-show=\"myFrequency.base == 4\" class=\"cron-select-wrap\">\n" +
    "            <!-- If Multiple is Enabled -->\n" +
    "            <select class=\"cron-select day-value\"\n" +
    "                    ng-model=\"myFrequency.dayValues\"\n" +
    "                    ng-if=\"allowMultiple\" multiple\n" +
    "                    ng-options=\"value as (value | cronDayName: cronStyle) for value in dayValues\">\n" +
    "            </select>\n" +
    "            <!-- If Multiple is not Enabled -->\n" +
    "            <select class=\"cron-select day-value\"\n" +
    "                    ng-model=\"myFrequency.dayValues\"\n" +
    "                    ng-if=\"!allowMultiple\"\n" +
    "                    ng-options=\"value as (value | cronDayName: cronStyle) for value in dayValues\">\n" +
    "            </select>\n" +
    "        </div>\n" +
    "        <span ng-show=\"myFrequency.base >= 5\">{{templateKeys.ON_THE}} </span>\n" +
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
    "        <span ng-show=\"myFrequency.base == 6\">{{templateKeys.OF}} </span>\n" +
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
    "        <span ng-show=\"myFrequency.base >= 2\">{{templateKeys.AT}} </span>\n" +
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
    "        <span ng-show=\"myFrequency.base == 2\"> {{templateKeys.PAST_THE_HOUR}}</span>\n" +
    "    </div>\n" +
    "</div>");
}]);

(function(angular){

    "use strict";

    angular.module("angular-cron-jobs", ["templates-angularcronjobs"]);

    angular.module("angular-cron-jobs")
        .directive("cronSelection", ["cronService", "i18nRetriever", "baseFrequency",
            function(cronService, i18n, baseFrequency) {
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

                        if (typeof $scope.config === "object" && !$scope.config.length) {

                            if (angular.isDefined($scope.config.allowMultiple)) {
                                $scope.allowMultiple = $scope.config.allowMultiple;
                            } else {
                                $scope.allowMultiple = false;
                            }

                            if (angular.isDefined($scope.config.quartz) && $scope.config.quartz) {
                                $scope.cronStyle = "quartz";
                            } else {
                                $scope.cronStyle = "default";
                            }

                            if (angular.isDefined($scope.config.i18n)) {
                                $scope.cronI18n = $scope.config.i18n;
                            } else {
                                $scope.cronI18n = "EN";
                            }

                            i18n.initialize($scope.cronI18n);

                            $scope.templateKeys = i18n.getTemplateKeys();
                        }

                        $scope.baseFrequency = baseFrequency;
                        $scope.frequency = i18n.getFrequencies();

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
                        }

                        $scope.$watch("ngModel", function (newValue) {
                            if (angular.isDefined(newValue) && newValue) {
                                modelChanged = true;
                                $scope.myFrequency = cronService.fromCron(newValue, $scope.allowMultiple, $scope.cronStyle);
                            } else if (newValue === "") {
                                $scope.myFrequency = undefined;
                            }
                        });

                        $scope.minuteValues = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
                        $scope.hourValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
                        $scope.dayOfMonthValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
                        $scope.dayValues = [0, 1, 2, 3, 4, 5, 6];
                        $scope.monthValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

                        if ($scope.cronStyle === "quartz") {
                            $scope.dayValues = [1, 2, 3, 4, 5, 6, 7];
                        }

                        $scope.$watch("myFrequency", function (n, o) {
                            if (n !== undefined) {
                                if (n && n.base && (!o || n.base !== o.base) && !modelChanged) {
                                    setInitialValuesForBase(n);
                                } else if (n && n.base && o && o.base) {
                                    modelChanged = false;
                                }

                                var newVal = cronService.setCron(n, $scope.cronStyle);
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
            }]).filter("cronNumeral", ["i18nRetriever", function(i18n) {
        return function(input) {
            if (input !== null) {
                return i18n.getNumeral(input);
            }
            return null;
        };
    }]).filter("cronMonthName", ["i18nRetriever", function(i18n) {
        return function(input) {
            var months = i18n.getMonths();

            if (input !== null && angular.isDefined(months[input])) {
                return months[input];
            } else {
                return null;
            }
        };
    }]).filter("cronDayName", ["i18nRetriever", function(i18n) {
        return function(input, cronType) {

            var days = i18n.getDays();
            var dayDefinition = (cronType === "quartz") ? days[input-1] : days[input];

            if (input !== null && angular.isDefined(dayDefinition)) {
                return dayDefinition;
            } else {
                return null;
            }
        };
    }]).directive("ngMultiple", function() {
        return {
            restrict: "A",
            scope: {
                ngMultiple: "="
            },
            link: function (scope, element) {
                var unwatch = scope.$watch("ngMultiple", function(newValue) {
                    if (newValue) {
                        element.attr("multiple", "multiple");
                    } else {
                        element.removeAttr("multiple");
                    }
                });
            }
        };
    });

}(angular));
(function(angular){
    "use strict";

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

            service.setCron = function(n, cronType) {
                if(cronType === "quartz") {
                    return this.setQuartzCron(n);
                } else {
                    return this.setDefaultCron(n);
                }
            };

            service.setQuartzCron = function(n){
                var cron = ["0", "*", "*",  "*",  "*", "?"];
                if(n && n.base && n.base >= baseFrequency.hour) {
                    cron[1] = typeof n.minuteValues !== "undefined" ? n.minuteValues : "0";
                }

                if(n && n.base && n.base >= baseFrequency.day) {
                    cron[2] = typeof n.hourValues !== "undefined" ? n.hourValues  : "*";
                }

                if(n && n.base && n.base === baseFrequency.week) {
                    cron[3] = "?";
                    cron[5] = n.dayValues;
                }

                if(n && n.base && n.base >= baseFrequency.month) {
                    cron[3] = typeof n.dayOfMonthValues !== "undefined" ? n.dayOfMonthValues : "?";
                }

                if(n && n.base && n.base === baseFrequency.year) {
                    cron[4] = typeof n.monthValues !== "undefined" ? n.monthValues : "*";
                }

                return cron.join(" ");
            };

            service.setDefaultCron = function(n){
                var cron = ["*", "*", "*", "*", "*"];

                if (n && n.base && n.base >= baseFrequency.hour) {
                    cron[0] = typeof n.minuteValues !== "undefined" ? n.minuteValues : "*";
                }

                if (n && n.base && n.base >= baseFrequency.day) {
                    cron[1] = typeof n.hourValues !== "undefined" ? n.hourValues : "*";
                }

                if (n && n.base && n.base === baseFrequency.week) {
                    cron[4] = n.dayValues;
                }

                if (n && n.base && n.base >= baseFrequency.month) {
                    cron[2] = typeof n.dayOfMonthValues !== "undefined" ? n.dayOfMonthValues : "*";
                }

                if (n && n.base && n.base === baseFrequency.year) {
                    cron[3] = typeof n.monthValues !== "undefined" ? n.monthValues : "*";
                }
                return cron.join(" ");
            };

            service.fromCron = function(value, allowMultiple, cronType) {
                if(cronType === "quartz") {
                    return this.fromQuartzCron(value, allowMultiple);
                } else {
                    return this.fromDefaultCron(value, allowMultiple);
                }
            };

            service.fromDefaultCron = function(value, allowMultiple) {
                var cron = value.replace(/\s+/g, " ").split(" ");
                var frequency = { base: "1" }; // default: every minute
                var tempArray = [];

                if (cron[0] === "*" && cron[1] === "*" && cron[2] === "*" && cron[3] === "*" && cron[4] === "*") {
                    frequency.base = baseFrequency.minute; // every minute
                } else if (cron[1] === "*" && cron[2] === "*" && cron[3] === "*" && cron[4] === "*") {
                    frequency.base = baseFrequency.hour; // every hour
                } else if (cron[2] === "*" && cron[3] === "*" && cron[4] === "*") {
                    frequency.base = baseFrequency.day; // every day
                } else if (cron[2] === "*" && cron[3] === "*") {
                    frequency.base = baseFrequency.week; // every week
                } else if (cron[3] === "*" && cron[4] === "*") {
                    frequency.base = baseFrequency.month; // every month
                } else if (cron[4] === "*") {
                    frequency.base = baseFrequency.year; // every year
                }

                if (cron[0] !== "*") {
                    //preparing to handle multiple minutes
                    if (allowMultiple) {
                        tempArray = cron[0].split(',');
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

            service.fromQuartzCron = function(value, allowMultiple) {
                var cron = value.replace(/\s+/g, " ").split(" ");
                var frequency = {base: "1"}; // default: every minute
                var tempArray = [];

                if(cron[1] === "*" && cron[2] === "*" && cron[3] === "*"  && cron[4] === "*" && cron[5] === "?") {
                    frequency.base = 1; // every minute
                } else if(cron[2] === "*" && cron[3] === "*"  && cron[4] === "*" && cron[5] === "?") {
                    frequency.base = 2; // every hour
                } else if(cron[3] === "*"  && cron[4] === "*" && cron[5] === "?") {
                    frequency.base = 3; // every day
                } else if(cron[3] === "?") {
                    frequency.base = 4; // every week
                } else if(cron[4] === "*" && cron[5] === "?") {
                    frequency.base = 5; // every month
                } else if(cron[5] === "?") {
                    frequency.base = 6; // every year
                }

                if (cron[1] !== "*") {
                    //preparing to handle multiple minutes
                    if (allowMultiple) {
                        tempArray = cron[1].split(",");
                        for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                        frequency.minuteValues = tempArray;
                    } else {
                        frequency.minuteValues = parseInt(cron[1]);
                    }
                }
                if (cron[2] !== "*") {
                    //preparing to handle multiple hours
                    if (allowMultiple) {
                        tempArray = cron[2].split(",");
                        for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                        frequency.hourValues = tempArray;
                    } else {
                        frequency.hourValues = parseInt(cron[2]);
                    }
                }
                if (cron[3] !== "*" && cron[3] !== "?") {
                    //preparing to handle multiple days of the month
                    if (allowMultiple) {
                        tempArray = cron[3].split(",");
                        for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                        frequency.dayOfMonthValues = tempArray;
                    } else {
                        frequency.dayOfMonthValues = parseInt(cron[3]);
                    }
                }
                if (cron[4] !== "*") {
                    //preparing to handle multiple months
                    if (allowMultiple) {
                        tempArray = cron[4].split(",");
                        for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                        frequency.monthValues = tempArray;
                    } else {
                        frequency.monthValues = parseInt(cron[4]);
                    }
                }
                if (cron[5] !== "*" && cron[5] !== "?") {
                    //preparing to handle multiple days of the week
                    if (allowMultiple) {
                        tempArray = cron[5].split(",");
                        for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                        frequency.dayValues = tempArray;
                    } else {
                        frequency.dayValues = parseInt(cron[5]);
                    }
                }

                return frequency;
            };

            return service;
        }]);

}(angular));


(function(angular){
    "use strict";

    angular.module("angular-cron-jobs")
        .service("i18nRetriever", function() {

            var translation = {
                EN: {
                    TEMPLATE_KEYS: {
                        EVERY: "Every",
                        ON: "on",
                        ON_THE: "on the",
                        OF: "of",
                        AT: "at",
                        PAST_THE_HOUR: "past the hour"
                    },
                    FREQUENCIES: [
                        { value: 1, label: "Minute"},
                        { value: 2, label: "Hour"},
                        { value: 3, label: "Day"},
                        { value: 4, label: "Week"},
                        { value: 5, label: "Month"},
                        { value: 6, label: "Year"}
                    ],
                    NUMERALS: {
                        1: "1st",
                        2: "2nd",
                        3: "3rd",
                        21: "21st",
                        22: "22nd",
                        23: "23rd",
                        31: "31st"
                    },
                    UNTREATED_NUMERAL_INFO: "th",
                    MONTHS: {
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
                    },
                    DAYS: {
                        0: "Sunday",
                        1: "Monday",
                        2: "Tuesday",
                        3: "Wednesday",
                        4: "Thursday",
                        5: "Friday",
                        6: "Saturday"
                    }
                },
                PT_BR: {
                    TEMPLATE_KEYS: {
                        EVERY: "Todo(a)",
                        ON: "no(a)",
                        ON_THE: "em",
                        OF: "de",
                        AT: "às",
                        PAST_THE_HOUR: "passado(a) da hora"
                    },
                    FREQUENCIES: [
                        { value: 1, label: "Minuto"},
                        { value: 2, label: "Hora"},
                        { value: 3, label: "Dia"},
                        { value: 4, label: "Semana"},
                        { value: 5, label: "Mês"},
                        { value: 6, label: "Ano"}
                    ],
                    NUMERALS: {
                        1: "1",
                        2: "2",
                        3: "3",
                        21: "21",
                        22: "22",
                        23: "23",
                        31: "31"
                    },
                    UNTREATED_NUMERAL_INFO: "",
                    MONTHS: {
                        1: "Janeiro",
                        2: "Fevereiro",
                        3: "Março",
                        4: "Abril",
                        5: "Maio",
                        6: "Junho",
                        7: "Julho",
                        8: "Agosto",
                        9: "Setembro",
                        10: "Outubro",
                        11: "Novembro",
                        12: "Dezembro"
                    },
                    DAYS: {
                        0: "Domingo",
                        1: "Segunda-feira",
                        2: "Terça-feira",
                        3: "Quarta-feira",
                        4: "Quinta-feira",
                        5: "Sexta-feira",
                        6: "Sábado"
                    }
                }
            };

            var actualInfo = translation["EN"];

            return {
                initialize: function(i18n){
                    actualInfo = translation[i18n.toUpperCase()];
                },
                getTemplateKeys: function(){
                    return actualInfo.TEMPLATE_KEYS;
                },
                getFrequencies: function(){
                    return actualInfo.FREQUENCIES;
                },
                getNumeral: function(input){
                    if (typeof(actualInfo.NUMERALS[input]) === "undefined"){
                        return input + actualInfo.UNTREATED_NUMERAL_INFO;
                    }
                    return actualInfo.NUMERALS[input];
                },
                getMonths: function(){
                    return actualInfo.MONTHS;
                },
                getDays: function(){
                    return actualInfo.DAYS;
                }
            };

        });

}(angular));