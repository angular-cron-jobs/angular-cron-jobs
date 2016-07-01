'use strict';

angular.module('angular-cron-jobs')
.value('baseFrequency', {
    minute: 1,
    hour: 2,
    day: 3,
    week: 4,
    month: 5,
    year: 6
})
.factory('cronService', ['baseFrequency', function(baseFrequency) {
    var service = {};

    service.setCron = function(n) {
        // minute, hour, day, week, month, year
        var cron = ['*', '*', '*', '*', '*'];

        if (n && n.base && n.base >= baseFrequency.hour) {
            cron[0] = typeof n.minuteValues !== 'undefined' ? n.minuteValues : '*';
        }

        if (n && n.base && n.base >= baseFrequency.day) {
            cron[1] = typeof n.hourValues !== 'undefined' ? n.hourValues : '*';
        }

        if (n && n.base && n.base === baseFrequency.week) {
            cron[4] = n.dayValues;
        }

        if (n && n.base && n.base >= baseFrequency.month) {
            cron[2] = typeof n.dayOfMonthValues !== 'undefined' ? n.dayOfMonthValues : '*';
        }

        if (n && n.base && n.base === baseFrequency.year) {
            cron[3] = typeof n.monthValues !== 'undefined' ? n.monthValues : '*';
        }
        return cron.join(' ');
    };

    service.fromCron = function(value, allowMultiple) {
        var cron = value.replace(/\s+/g, ' ').split(' ');
        var frequency = { base: '1' }; // default: every minute

        if (cron[0] === '*' && cron[1] === '*' && cron[2] === '*' && cron[3] === '*' && cron[4] === '*') {
            frequency.base = baseFrequency.minute; // every minute
        } else if (cron[1] === '*' && cron[2] === '*' && cron[3] === '*' && cron[4] === '*') {
            frequency.base = baseFrequency.hour; // every hour
        } else if (cron[2] === '*' && cron[3] === '*' && cron[4] === '*') {
            frequency.base = baseFrequency.day; // every day
        } else if (cron[2] === '*' && cron[3] === '*') {
            frequency.base = baseFrequency.week; // every week
        } else if (cron[3] === '*' && cron[4] === '*') {
            frequency.base = baseFrequency.month; // every month
        } else if (cron[4] === '*') {
            frequency.base = baseFrequency.year; // every year
        }

        if (cron[0] !== '*') {
            //preparing to handle multiple minutes
            if (allowMultiple) {
                var tempArray = cron[0].split(',');
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.minuteValues = tempArray;
            } else {
                frequency.minuteValues = parseInt(cron[0]);
            }
        }
        if (cron[1] !== '*') {
            //preparing to handle multiple hours
            if (allowMultiple) {
                var tempArray = cron[1].split(',');
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.hourValues = tempArray;
            } else {
                frequency.hourValues = parseInt(cron[1]);
            }
        }
        if (cron[2] !== '*') {
            //preparing to handle multiple days of the month
            if (allowMultiple) {
                var tempArray = cron[2].split(',');
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.dayOfMonthValues = tempArray;
            } else {
                frequency.dayOfMonthValues = parseInt(cron[2]);
            }
        }
        if (cron[3] !== '*') {
            //preparing to handle multiple months
            if (allowMultiple) {
                var tempArray = cron[3].split(',');
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.monthValues = tempArray;
            } else {
                frequency.monthValues = parseInt(cron[3]);
            }
        }
        if (cron[4] !== '*') {
            //preparing to handle multiple days of the week
            if (allowMultiple) {
                var tempArray = cron[4].split(',');
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.dayValues = tempArray;
            } else {
                frequency.dayValues = parseInt(cron[4]);
            }
        }
        return frequency;
    };
    return service;
}]);