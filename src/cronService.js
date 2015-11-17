(function () {
    'use strict';

    angular.module('angular-cron-jobs').factory('cronService', ['cronFrequency',
        function (cronFrequency) {
            var service = {};

            service.setCron = function (n, isMultiMode) {
                //  console.log('set cron called: ', n);
                var cron = ['*', '*', '*', '*', '*'];

                var cronValue = function (val) {
                    if (angular.isUndefined(val) || val === '') {
                        return '*';
                    }

                    if (isMultiMode && angular.isArray(val)) {
                        return val.join(',');
                    }

                    return val;
                };


                if (n && n.base) {
                    if (n.base >= cronFrequency.EVERY_HOUR) {
                        cron[0] = cronValue(n.minuteValue);
                    }

                    if (n.base >= cronFrequency.EVERY_DAY) {
                        cron[1] = cronValue(n.hourValue);
                    }

                    if (n.base === cronFrequency.EVERY_WEEK) {
                        cron[4] = cronValue(n.dayValue);
                    }

                    if (n.base >= cronFrequency.EVERY_MONTH) {
                        cron[2] = cronValue(n.dayOfMonthValue);
                    }

                    if (n.base === cronFrequency.EVERY_YEAR) {
                        cron[3] = cronValue(n.monthValue);
                    }
                }
                //  console.log('cron after setCron ', cron.join(' '));
                console.log('Cron', cron);
                return cron.join(' ');
            };

            service.fromCron = function (value, isMultiMode) {
                //  console.log('set cron fired!');
                var cron = value.replace(/\s+/g, ' ').split(' ');
                var frequency = {base: '1'}; // default: every minute

                //cron must be of length 5
                while (cron.length < 5) {
                    cron.push('*');
                }

                var parseValue = function (v) {
                    return isMultiMode ? v.split(',').map(function (val) {
                        return parseInt(val, 10)
                    }) : parseInt(v);
                };

                if (cron[0] === '*' && cron[1] === '*' && cron[2] === '*' && cron[3] === '*' && cron[4] === '*') {
                    frequency.base = cronFrequency.EVERY_MINUTE; // every minute
                } else if (cron[1] === '*' && cron[2] === '*' && cron[3] === '*' && cron[4] === '*') {
                    frequency.base = cronFrequency.EVERY_HOUR; // every hour
                } else if (cron[2] === '*' && cron[3] === '*' && cron[4] === '*') {
                    frequency.base = cronFrequency.EVERY_DAY; // every day
                } else if (cron[2] === '*' && cron[3] === '*') {
                    frequency.base = cronFrequency.EVERY_WEEK; // every week
                } else if (cron[3] === '*' && cron[4] === '*') {
                    frequency.base = cronFrequency.EVERY_MONTH; // every month
                } else if (cron[4] === '*') {
                    frequency.base = cronFrequency.EVERY_YEAR; // every year
                }

                // console.log('frequency should be 5: ', frequency, cron);

                if (cron[0] !== '*') {
                    frequency.minuteValue = parseValue(cron[0]);
                }
                if (cron[1] !== '*') {
                    frequency.hourValue = parseValue(cron[1]);
                }
                if (cron[2] !== '*') {
                    frequency.dayOfMonthValue = parseValue(cron[2]);
                }
                if (cron[3] !== '*') {
                    frequency.monthValue = parseValue(cron[3]);
                }
                if (cron[4] !== '*') {
                    frequency.dayValue = parseValue(cron[4]);
                }

                //frequency.base += ''; // 'cast' to string in order to set proper value on "every" modal

                // console.log('freq ', frequency);
                return frequency;
            };

            return service;
        }
    ]);
})();