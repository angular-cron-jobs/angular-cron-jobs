angular.module('angular-cron-jobs').factory('cronService', function() {
   
   var service = {};

    service.setCron = function(n) { 
        var cron = ['*', '*', '*',  '*',  '*'];

        if(n && n.base && n.base >= 2) {
           cron[0] = n.minuteValue || '*';
        }

        if(n && n.base && n.base >= 3) {
           cron[1] = n.hourValue || '*';
        }

        if(n && n.base && n.base == 4) {
           cron[4] = n.dayValue;
        }

        if(n && n.base && n.base >= 5) {
           cron[2] = n.dayOfMonthValue || '*';
        }

        if(n && n.base && n.base == 6) {
           cron[3] = n.monthValue || '*';
        }

        return cron.join(' ');
    }

    service.fromCron = function(value) { 

       var frequency = {base: "1"}; // default: every minute
       var cron = value.replace(/\s+/g, ' ').split(' ');

       if(cron[1] === '*' && cron[2] === '*' && cron[3] === '*'  && cron[4] === '*') {
           frequency.base = "2"; // every hour
       } else if(cron[2] === '*' && cron[3] === '*'  && cron[4] === '*') {
           frequency.base = "3"; // every day
       } else if(cron[2] === '*' && cron[3] === '*') {
           frequency.base = "4"; // every week
       } else if(cron[3] === '*' && cron[4] === '*') {
           frequency.base = "5"; // every month
       } else if(cron[4] === '*') {
           frequency.base = "6"; // every year
       }

       if (cron[0] !== '*') {
           frequency.minuteValue = cron[0];
       }
       if (cron[1] !== '*') {
           frequency.hourValue = cron[1];
       }
       if (cron[2] !== '*') {
           frequency.dayOfMonthValue = cron[2];
       }
       if (cron[3] !== '*') {
           frequency.monthValue = cron[3];
       }
       if (cron[4] !== '*') {
           frequency.dayValue = cron[4];
       }

       return frequency;
   };
   
   return service;
});
