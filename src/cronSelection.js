angular.module('angular-cron-jobs').directive('cronSelection', function() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: true,
        templateUrl: function(element, attributes) {
          return attributes.template || "cronselection.html";
        },
        link: function($scope, $element, $attrs) {

            $scope.showCustom = false;


            $scope.frequency = [
                { 
                    "value": 1,
                    "text": "Minute"
                },
                {
                    "value": 2,
                    "text": "Hour"
                },
                {
                    "value": 3,
                    "text": "Day"
                },
                {
                    "value": 4,
                    "text": "Week"
                },
                {
                    "value": 5,
                    "text": "Month"
                },
                {
                    "value": 6,
                    "text": "Year"
                }
            ];

            $scope.pastTheHour = [
                { 
                    "value": 0
                },
                { 
                    "value": 5
                },
                { 
                    "value": 10
                },
                { 
                    "value": 15
                },
                { 
                    "value": 20
                },
                { 
                    "value": 25
                },
                { 
                    "value": 30
                },
                { 
                    "value": 35
                },
                { 
                    "value": 40
                },
                { 
                    "value": 45
                },
                { 
                    "value": 50
                },
                { 
                    "value": 55
                }
            ];

            $scope.minuteValue = [
                { 
                    "value": 0
                },
                { 
                    "value": 5
                },
                { 
                    "value": 10
                },
                { 
                    "value": 15
                },
                { 
                    "value": 20
                },
                { 
                    "value": 25
                },
                { 
                    "value": 30
                },
                { 
                    "value": 35
                },
                { 
                    "value": 40
                },
                { 
                    "value": 45
                },
                { 
                    "value": 50
                },
                { 
                    "value": 55
                }
            ];

            $scope.hourValue = [
                { 
                    "value": 0
                },
                { 
                    "value": 1
                },
                { 
                    "value": 2
                },
                { 
                    "value": 3
                },
                { 
                    "value": 4
                },
                { 
                    "value": 5
                },
                { 
                    "value": 6
                },
                { 
                    "value": 7
                },
                { 
                    "value": 8
                },
                { 
                    "value": 9
                },
                { 
                    "value": 10
                },
                { 
                    "value": 11
                },
                { 
                    "value": 12
                },
                { 
                    "value": 13
                },
                { 
                    "value": 14
                },
                { 
                    "value": 15
                },
                { 
                    "value": 16
                },
                { 
                    "value": 17
                },
                { 
                    "value": 18
                },
                { 
                    "value": 19
                },
                { 
                    "value": 20
                },
                { 
                    "value": 21
                },
                { 
                    "value": 22
                },
                { 
                    "value": 23
                }
            ];

            $scope.dayValue = [
                { 
                    "value": 0,
                    "text": "Sunday"
                },
                { 
                    "value": 1,
                    "text": "Monday"
                },
                { 
                    "value": 2,
                    "text": "Tuesday"
                },
                { 
                    "value": 3,
                    "text": "Wednesday"
                },
                { 
                    "value": 4,
                    "text": "Thursday"
                },
                { 
                    "value": 5,
                    "text": "Friday"
                },
                { 
                    "value": 6,
                    "text": "Saturday"
                }
            ];


            $scope.$watch('myFrequency', function(n){

                if(n && n.base){
                    if(n.base.value === 1){
                      $scope.cron = '* * * * *';
                    } else if(n.base.value === 2) {
                      $scope.cron = '0 * * * *';
                    } else if(n.base.value === 3) {
                      $scope.cron = '0 0 * * *';
                    } else if(n.base.value === 4) {
                      $scope.cron = '0 0 * * 0';
                    } else if(n.base.value === 5) {
                      $scope.cron = '0 0 1 * *';
                    } else if(n.base.value === 5) {
                      $scope.cron = '0 0 1 1 *';
                    }
                }

                if(n && n.base && n.base.value === 2 && n.pastTheHour && n.pastTheHour.value) {
                    $scope.cron = n.pastTheHour.value + ' * * * *';
                }

                if(n && n.base && n.base.value === 3) {
                    if(!n.minuteValue){
                        n.minuteValue = {};
                        n.minuteValue.value = 0;
                    }
                    if(!n.hourValue){
                        n.hourValue = {};
                        n.hourValue.value = 0;
                    }
                    $scope.cron = n.minuteValue.value + ' ' + n.hourValue.value + ' * * *';
                }

                if(n && n.base && n.base.value === 4) {

                    console.log('entered week if statement: ', angular.copy(n));
                    
                    if(!n.weekMinuteValue){
                        n.weekMinuteValue = {};
                        n.weekMinuteValue.value = 0;
                    }
                    if(!n.weekHourValue){
                        n.weekHourValue = {};
                        n.weekHourValue.value = 0;
                    }
                    if(!n.dayValue){
                        n.dayValue = {};
                        n.dayValue.value = 1;
                    }

                    $scope.cron = n.weekMinuteValue.value + ' ' + n.weekHourValue.value + ' * * ' + (n.dayValue.value - 1);
                }

            }, true);

        }
    };
});
