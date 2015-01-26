/**
 * UI Component For Creating Cron Job Syntax To Send To Server
 * @version v0.0.1 - 2015-01-26 * @link https://github.com/jacobscarter/angular-cron-jobs
 * @author Jacob Carter <jacob@ieksolutions.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
angular.module('templates-angularcronjobs', ['cronselection.html']);

angular.module("cronselection.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("cronselection.html",
    "<div>\n" +
    "	<select>\n" +
    "		<option value=\"minute\">Minute</option>\n" +
    "		<option value=\"hour\">Hour</option>\n" +
    "		<option value=\"day\">Day</option>\n" +
    "		<option value=\"week\">Week</option>\n" +
    "		<option value=\"month\">Month</option>\n" +
    "	</select>\n" +
    "\n" +
    "	<input ng-model=\"showCustom\" type=\"text\">\n" +
    "\n" +
    "	<p ng-show=\"showCustom === 'true'\">SHOWING CUSTOM</p>\n" +
    "</div>");
}]);

angular.module('angular-cron-jobs', ['templates-angularcronjobs']);

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

angular.module('angular-cron-jobs').factory('cronService', function() {
   var service = {};
   
   var wizards = {};
   
   service.defaultName = "defaultWizard";
   
   service.addWizard = function(name, wizard) {
       wizards[name] = wizard;
   };
   
   service.removeWizard = function(name) {
       delete wizards[name];
   };
   
   service.wizard = function(name) {
       var nameToUse = name;
       if (!name) {
           nameToUse = service.defaultName;
       }
       
       return wizards[nameToUse];
   };
   
   return service;
});
