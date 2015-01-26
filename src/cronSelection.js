angular.module('angular-cron-jobs').directive('cronSelection', function() {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: true,
        templateUrl: function(element, attributes) {
          return attributes.template || "cronselection.html";
        },
        //controller for wizard directive, treat this just like an angular controller
        controller: ['$scope', '$element', '$log', 'cronService', function($scope, $element, $log, cronService) {
            
        

        }],
        link: function($scope, $element, $attrs, wizard) {

            $scope.showCustom = false;
        }
        
    };
});
