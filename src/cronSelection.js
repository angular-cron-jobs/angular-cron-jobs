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