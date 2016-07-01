'use strict';

angular.module('angular-cron-jobs').factory('cronService', function() {
    var service = {};

    service.setCron = function(n) {
        var cron = ['*', '*', '*', '*', '*'];

        if (n && n.base && n.base >= 2) {
            cron[0] = typeof n.minuteValue !== undefined ? n.minuteValue : '*';
        }

        if (n && n.base && n.base >= 3) {
            cron[1] = typeof n.hourValue !== undefined ? n.hourValue : '*';
        }

        if (n && n.base && n.base === 4) {
            cron[4] = n.dayValue;
        }

        if (n && n.base && n.base >= 5) {
            cron[2] = typeof n.dayOfMonthValue !== undefined ? n.dayOfMonthValue : '*';
        }

        if (n && n.base && n.base === 6) {
            cron[3] = typeof n.monthValue !== undefined ? n.monthValue : '*';
        }
        return cron.join(' ');
    };

    service.fromCron = function(value) {
        var cron = value.replace(/\s+/g, ' ').split(' ');
        var frequency = { base: '1' }; // default: every minute

        if (cron[0] === '*' && cron[1] === '*' && cron[2] === '*' && cron[3] === '*' && cron[4] === '*') {
            frequency.base = 1; // every minute
        } else if (cron[1] === '*' && cron[2] === '*' && cron[3] === '*' && cron[4] === '*') {
            frequency.base = 2; // every hour
        } else if (cron[2] === '*' && cron[3] === '*' && cron[4] === '*') {
            frequency.base = 3; // every day
        } else if (cron[2] === '*' && cron[3] === '*') {
            frequency.base = 4; // every week
        } else if (cron[3] === '*' && cron[4] === '*') {
            frequency.base = 5; // every month
        } else if (cron[4] === '*') {
            frequency.base = 6; // every year
        }

        if (cron[0] !== '*') {
            //preparing to handle multiple minutes
            if (cron[0].indexOf(',') >= 0) {
                var tempArray = cron[0].split(',');
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.minuteValue = tempArray;
            } else {
                frequency.minuteValue = parseInt(cron[0]);
            }
        }
        if (cron[1] !== '*') {
            //preparing to handle multiple hours
            if (cron[1].indexOf(',') >= 0) {
                var tempArray = cron[1].split(',');
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.hourValue = tempArray;
            } else {
                frequency.hourValue = parseInt(cron[1]);
            }
        }
        if (cron[2] !== '*') {
            //preparing to handle multiple days of the month
            if (cron[2].indexOf(',') >= 0) {
                var tempArray = cron[2].split(',');
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.dayOfMonthValue = tempArray;
            } else {
                frequency.dayOfMonthValue = parseInt(cron[2]);
            }
        }
        if (cron[3] !== '*') {
            //preparing to handle multiple months
            if (cron[3].indexOf(',') >= 0) {
                var tempArray = cron[3].split(',');
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.monthValue = tempArray;
            } else {
                frequency.monthValue = parseInt(cron[3]);
            }
        }
        if (cron[4] !== '*') {
            //preparing to handle multiple days of the week
            if (cron[4].indexOf(',') >= 0) {
                var tempArray = cron[4].split(',');
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.dayValue = tempArray;
            } else {
                frequency.dayValue = parseInt(cron[4]);
            }
        }
        return frequency;
    };
    return service;
});
