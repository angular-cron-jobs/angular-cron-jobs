angular.module('angular-cron-jobs').directive('cronSelection', ['cronService', function(cronService) {
        
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            config : '=',
            output : '=',
            value  : '='
        },
        templateUrl: function(element, attributes) {
          return attributes.template || "cronselection.html";
        },
        link: function($scope, $element, $attrs) {

            $scope.output = $scope.cron;

            $scope.frequency = {
                1: 'Minute',
                2: 'Hour',
                3: 'Day',
                4: 'Week',
                5: 'Month',
                6: 'Year'
            };

            if (angular.isDefined($scope.value)) {
                console.log('value: ' + $scope.value);
                $scope.myFrequency = cronService.fromCron($scope.value);
            }

            if(typeof $scope.config === 'object' && !$scope.config.length){
                var optionsKeyArray = Object.keys($scope.config.options);
                for(var i in optionsKeyArray){
                    console.log('optionsKeyArray[i]: ', optionsKeyArray[i]);
                    var currentKeyArray = optionsKeyArray[i].split('allow');
                    var currentKey = currentKeyArray[1];
                    var originalKey = optionsKeyArray[i];
                    console.log('currentKey: ', currentKey);
                    if(!$scope.config.options[originalKey]){
                        console.log('found false config option: ', $scope.config.options[originalKey]);
                        for(var b in $scope.frequency){
                            console.log('entered frequency loop');
                            console.log('$scope.frequency[i]', $scope.frequency[b].text);
                            console.log('currentKey: ', currentKey);
                            if($scope.frequency[b].text === currentKey){
                                $scope.frequency.splice(b, 1);
                            }
                        }
                    }
                }
            }

            $scope.minuteValue = ["0", "5", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"];

            $scope.hourValue = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"];

            $scope.dayValue = {
                "0": "Sunday",
                "1": "Monday",
                "2": "Tuesday",
                "3": "Wednesday",
                "4": "Thursday",
                "5": "Friday",
                "6": "Saturday",
            };

            $scope.dayOfMonthValue = {
                "1": "1st",
                "2": "2nd",
                "3": "3rd",
                "4": "4th",
                "5": "5th",
                "6": "6th",
                "7": "7th",
                "8": "8th",
                "9": "9th",
                "10": "10th",
                "11": "11th",
                "12": "12th",
                "13": "13th",
                "14": "14th",
                "15": "15th",
                "16": "16th",
                "17": "17th",
                "18": "18th",
                "19": "19th",
                "20": "20th",
                "21": "21st",
                "22": "22nd",
                "23": "23rd",
                "24": "24th",
                "25": "25th",
                "26": "26th",
                "27": "27th",
                "28": "28th",
                "29": "29th",
                "30": "30th",
                "31": "31st"
            };

            $scope.monthValue = {
                "1": "January",
                "2": "February",
                "3": "March",
                "4": "April",
                "5": "May",
                "6": "June",
                "7": "July",
                "8": "August",
                "9": "September",
                "10": "October",
                "11": "November",
                "12": "December"
            };

           $scope.$watch('myFrequency', function(n){
                $scope.output = cronService.setCron(n);
            }, true);
        }
    };
}]);
