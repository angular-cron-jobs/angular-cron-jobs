'use strict';

angular.module('angular-cron-jobs').factory('cronService', function() {
    var service = {};

    service.setCron = function(n) {
        //  console.log('set cron called: ', n);
        var cron = ['*', '*', '*',  '*',  '*'];

        if(n && n.base && n.base >= 2) {
            cron[0] = typeof n.minuteValue !== undefined ? n.minuteValue : '*';
        }

        if(n && n.base && n.base >= 3) {
            cron[1] = typeof n.hourValue !== undefined ? n.hourValue  : '*';
        }

        if(n && n.base && n.base === 4) {
            cron[4] = n.dayValue;
        }

        if(n && n.base && n.base >= 5) {
            cron[2] = typeof n.dayOfMonthValue !== undefined ? n.dayOfMonthValue : '*';
        }

        if(n && n.base && n.base === 6) {
            cron[3] = typeof n.monthValue !== undefined ? n.monthValue : '*';
        }
        //  console.log('cron after setCron ', cron.join(' '));
        return cron.join(' ');
    };

    service.fromCron = function(value) { 
        //  console.log('set cron fired!');
       var cron = value.replace(/\s+/g, ' ').split(' ');
       var frequency = {base: '1'}; // default: every minute

       if(cron[0] === '*' && cron[1] === '*' && cron[2] === '*' && cron[3] === '*'  && cron[4] === '*') {
           frequency.base = 1; // every minute
       } else if(cron[1] === '*' && cron[2] === '*' && cron[3] === '*'  && cron[4] === '*') {
           frequency.base = 2; // every hour
       } else if(cron[2] === '*' && cron[3] === '*'  && cron[4] === '*') {
           frequency.base = 3; // every day
       } else if(cron[2] === '*' && cron[3] === '*') {
           frequency.base = 4; // every week
       } else if(cron[3] === '*' && cron[4] === '*') {
           frequency.base = 5; // every month
       } else if(cron[4] === '*') {
           frequency.base = 6; // every year
       }

       // console.log('frequency should be 5: ', frequency, cron);

       if (cron[0] !== '*') {
           frequency.minuteValue = parseInt(cron[0]);
       }
       if (cron[1] !== '*') {
           frequency.hourValue = parseInt(cron[1]);
       }
       if (cron[2] !== '*') {
           frequency.dayOfMonthValue = parseInt(cron[2]);
       }
       if (cron[3] !== '*') {
           frequency.monthValue = parseInt(cron[3]);
       }
       if (cron[4] !== '*') {
           frequency.dayValue = parseInt(cron[4]);
       }

       //frequency.base += ''; // 'cast' to string in order to set proper value on "every" modal

       // console.log('freq ', frequency);
       return frequency;
   };
   
   return service;
});
