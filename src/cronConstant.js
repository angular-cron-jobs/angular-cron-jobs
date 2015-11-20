/**
 * Created by intelWorx on 17/11/2015.
 */
(function () {
  'use strict';

  angular.module('angular-cron-jobs')
    .value('cronFrequency', {
      EVERY_MINUTE: 1,
      EVERY_HOUR: 2,
      EVERY_DAY: 3,
      EVERY_WEEK: 4,
      EVERY_MONTH: 5,
      EVERY_YEAR: 6
    });

})();