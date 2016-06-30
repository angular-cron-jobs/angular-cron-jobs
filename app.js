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

  $scope.myLocalFrequency = null;

  $scope.selectDay = function(day) {
    if ($scope.myLocalFrequency.dayValue.indexOf(day) >= 0) {
      $scope.myLocalFrequency.dayValue.splice(1, $scope.myLocalFrequency.dayValue.indexOf(day));
    } else {
      $scope.myLocalFrequency.dayValue.push(day);
    }
  };

})



