(function () {
  'use strict';

  angular.module('angular-cron-jobs')
    .controller('CronJobInputController', ['$scope', 'cronService', 'cronFrequency',
      function ($scope, cronService, cronFrequency) {
        var cron = this,
          originalInit = undefined,
          initChanged = false;

        cron.frequency = [
          {
            value: cronFrequency.EVERY_MINUTE,
            label: 'Minute'
          },
          {
            value: cronFrequency.EVERY_HOUR,
            label: 'Hour'
          },
          {
            value: cronFrequency.EVERY_DAY,
            label: 'Day'
          },
          {
            value: cronFrequency.EVERY_WEEK,
            label: 'Week'
          },
          {
            value: cronFrequency.EVERY_MONTH,
            label: 'Month'
          },
          {
            value: cronFrequency.EVERY_YEAR,
            label: 'Year'
          }
        ];

        if (angular.isDefined(cron.init)) {
          //console.log('init value found: ', $scope.init);
          originalInit = angular.copy(cron.init);
          cron.myFrequency = cronService.fromCron(cron.init, !!cron.multiMode);
        }


        if (typeof cron.config === 'object' && !angular.isArray(cron.config)) {
          var optionsKeyArray = Object.keys(cron.config.options);
          for (var i in optionsKeyArray) {
            var currentKey = optionsKeyArray[i].replace(/^allow/, '');
            var originalKey = optionsKeyArray[i];
            if (!cron.config.options[originalKey]) {
              for (var b in cron.frequency) {
                if (cron.frequency[b].label === currentKey) {
                  cron.frequency.splice(b, 1);
                }
              }
            }
          }
        }

        var range = function (start, end, step) {
          var r = [];
          step = step || (start > end ? -1 : 1);
          for (var i = start; i <= end; i += step) {
            r.push(i);
          }
          return r;
        };
        cron.minuteValue = range(0, 55, 5);
        cron.hourValue = range(0, 23);
        cron.dayOfMonthValue = range(1, 31);
        cron.dayValue = range(0, 6);
        cron.monthValue = range(1, 12);

        $scope.$watch('cron.init', function (newValue) {
          //console.log('watch on init fired!', newValue, originalInit);
          if (angular.isDefined(newValue) && newValue && (newValue !== originalInit)) {
            initChanged = true;
            cron.myFrequency = cronService.fromCron(newValue, !!cron.multiMode);
          }
        });

        $scope.$watch('cron.myFrequency', function (n, o) {
          //console.log('myFrequency changed: ', n, initChanged);
          if (n && (!o || n.base !== o.base) && !initChanged) {
            //console.log('base changed!', n, o);
            if (n && n.base) {
              n.base = parseInt(n.base, 10);

              if (n.base >= cronFrequency.EVERY_HOUR) {
                n.minuteValue = cron.multiMode ? [cron.minuteValue[0]] : cron.minuteValue[0];
              }

              if (n.base >= cronFrequency.EVERY_DAY) {
                n.hourValue = cron.multiMode ? [cron.hourValue[0]] : cron.hourValue[0];
              }

              if (n.base === cronFrequency.EVERY_WEEK) {
                n.dayValue = cron.multiMode ? [cron.dayValue[0]] : cron.dayValue[0];
              }

              if (n.base >= cronFrequency.EVERY_MONTH) {
                n.dayOfMonthValue = cron.multiMode ? [cron.dayOfMonthValue[0]] : cron.dayOfMonthValue[0];
              }

              if (n.base === cronFrequency.EVERY_YEAR) {
                n.monthValue = cron.multiMode ? [cron.monthValue[0]] : cron.monthValue[0];
              }
            }
          } else if (n && n.base && o && o.base) {
            initChanged = false;
          }

          cron.output = cronService.setCron(n, !!cron.multiMode);
        }, true);

      }]);
  angular.module('angular-cron-jobs')
    .directive('cronSelection', [function (cronService, cronFrequency) {
      return {
        restrict: 'EA',
        replace: true,
        //transclude: true,
        scope: {
          config: '=',
          output: '=?',
          init: '=?',
          multiMode: '='
        },
        templateUrl: function (element, attributes) {
          return attributes.template || 'cronselection.html';
        },
        bindToController: true,
        controllerAs: 'cron',
        controller: 'CronJobInputController',
        link: function ($scope) {
          console.log('Passed in: ', JSON.stringify($scope.cron));
        }
      };
    }])
    .filter('cronNumeral', function () {
      return function (input) {
        switch (input) {
          case 1:
            return '1st';
          case 2:
            return '2nd';
          case 3:
            return '3rd';
          case 21:
            return '21st';
          case 22:
            return '22nd';
          case 23:
            return '23rd';
          case 31:
            return '31st';
          case null:
            return null;
          default:
            return input + 'th';
        }
      };
    })
    .filter('cronMonthName', function () {
      var months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];
      return function (input) {
        var idx = parseInt(input, 10) - 1;
        if (input !== null && angular.isDefined(months[idx])) {
          return months[idx];
        } else {
          return null;
        }
      };
    })
    .filter('cronDayName', function () {
      var days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ];
      return function (input) {
        input = parseInt(input, 10)
        if (input !== null && angular.isDefined(days[input])) {
          return days[input];
        } else {
          return null;
        }
      };
    })
  ;
})();