var boilerPlateApp = angular.module('boilerPlateApp', ['ui.router', 'angular-cron-jobs'])
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
	function($stateProvider, $urlRouterProvider, $locationProvider) {


    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('main', {
        url : "/",
        templateUrl: 'partials/main.html',
        controller: 'mainController'
      })
      ;
	}
])
.controller('mainController', function($scope) {

  $scope.mainMessage = "Main Controller Loaded";

  $scope.output;

  $scope.myOutput;

  $scope.config = {
      options : {
        allowMonth : false,
        allowYear : false
      }
  };

  $scope.config2 = {
      allowMultiple: true
  };

  $scope.config3 = {
      allowMultiple: true,
      options: {
        allowMinute: false,
        allowHour: false,
        allowDay: false,
        allowMonth: false,
        allowYear: false
      }
  };

  $scope.serverData = "40 5 * * 0,1";

  $scope.mySecondOutput;

  $scope.myThirdOutput;

  $scope.myFourthOutput;

  $scope.myLocalFrequency = null;

  $scope.selectDay = function(day) {
    if ($scope.myLocalFrequency.dayValues.indexOf(day) >= 0) {
      $scope.myLocalFrequency.dayValues.splice($scope.myLocalFrequency.dayValues.indexOf(day), 1);
    } else {
      $scope.myLocalFrequency.dayValues.push(day);
    }
  };

})



