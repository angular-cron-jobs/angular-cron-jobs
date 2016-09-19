"use strict";

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

    service.setCron = function(n, cronType) {
        if(cronType === "quartz") {
            return this.setQuartzCron(n);
        } else {
            return this.setDefaultCron(n);
        }
    };

    service.setQuartzCron = function(n){
        var cron = ["0", "*", "*",  "*",  "*", "?"];
        if(n && n.base && n.base >= baseFrequency.hour) {
            cron[1] = typeof n.minuteValues !== "undefined" ? n.minuteValues : "0";
        }

        if(n && n.base && n.base >= baseFrequency.day) {
            cron[2] = typeof n.hourValues !== "undefined" ? n.hourValues  : "*";
        }

        if(n && n.base && n.base === baseFrequency.week) {
            cron[3] = "?";
            cron[5] = n.dayValues;
        }

        if(n && n.base && n.base >= baseFrequency.month) {
            cron[3] = typeof n.dayOfMonthValues !== "undefined" ? n.dayOfMonthValues : "?";
        }

        if(n && n.base && n.base === baseFrequency.year) {
            cron[4] = typeof n.monthValues !== "undefined" ? n.monthValues : "*";
        }
        
        return cron.join(" ");
    };

    service.setDefaultCron = function(n){
        var cron = ["*", "*", "*", "*", "*"];

        if (n && n.base && n.base >= baseFrequency.hour) {
            cron[0] = typeof n.minuteValues !== "undefined" ? n.minuteValues : "*";
        }

        if (n && n.base && n.base >= baseFrequency.day) {
            cron[1] = typeof n.hourValues !== "undefined" ? n.hourValues : "*";
        }

        if (n && n.base && n.base === baseFrequency.week) {
            cron[4] = n.dayValues;
        }

        if (n && n.base && n.base >= baseFrequency.month) {
            cron[2] = typeof n.dayOfMonthValues !== "undefined" ? n.dayOfMonthValues : "*";
        }

        if (n && n.base && n.base === baseFrequency.year) {
            cron[3] = typeof n.monthValues !== "undefined" ? n.monthValues : "*";
        }
        return cron.join(" ");
    };

	service.fromCron = function(value, allowMultiple, cronType) {
        if(cronType === "quartz") {
            return this.fromQuartzCron(value, allowMultiple);
        } else {
            return this.fromDefaultCron(value, allowMultiple);
        }
    };

    service.fromDefaultCron = function(value, allowMultiple) {
        var cron = value.replace(/\s+/g, " ").split(" ");
        var frequency = { base: "1" }; // default: every minute
        var tempArray = [];

        if (cron[0] === "*" && cron[1] === "*" && cron[2] === "*" && cron[3] === "*" && cron[4] === "*") {
            frequency.base = baseFrequency.minute; // every minute
        } else if (cron[1] === "*" && cron[2] === "*" && cron[3] === "*" && cron[4] === "*") {
            frequency.base = baseFrequency.hour; // every hour
        } else if (cron[2] === "*" && cron[3] === "*" && cron[4] === "*") {
            frequency.base = baseFrequency.day; // every day
        } else if (cron[2] === "*" && cron[3] === "*") {
            frequency.base = baseFrequency.week; // every week
        } else if (cron[3] === "*" && cron[4] === "*") {
            frequency.base = baseFrequency.month; // every month
        } else if (cron[4] === "*") {
            frequency.base = baseFrequency.year; // every year
        }

        if (cron[0] !== "*") {
            //preparing to handle multiple minutes
            if (allowMultiple) {
                tempArray = cron[0].split(',');
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.minuteValues = tempArray;
            } else {
                frequency.minuteValues = parseInt(cron[0]);
            }
        }
        if (cron[1] !== "*") {
            //preparing to handle multiple hours
            if (allowMultiple) {
                tempArray = cron[1].split(",");
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.hourValues = tempArray;
            } else {
                frequency.hourValues = parseInt(cron[1]);
            }
        }
        if (cron[2] !== "*") {
            //preparing to handle multiple days of the month
            if (allowMultiple) {
                tempArray = cron[2].split(",");
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.dayOfMonthValues = tempArray;
            } else {
                frequency.dayOfMonthValues = parseInt(cron[2]);
            }
        }
        if (cron[3] !== "*") {
            //preparing to handle multiple months
            if (allowMultiple) {
                tempArray = cron[3].split(",");
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.monthValues = tempArray;
            } else {
                frequency.monthValues = parseInt(cron[3]);
            }
        }
        if (cron[4] !== "*") {
            //preparing to handle multiple days of the week
            if (allowMultiple) {
                tempArray = cron[4].split(",");
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.dayValues = tempArray;
            } else {
                frequency.dayValues = parseInt(cron[4]);
            }
        }
        return frequency;
    };

    service.fromQuartzCron = function(value, allowMultiple) {
        var cron = value.replace(/\s+/g, " ").split(" ");
        var frequency = {base: "1"}; // default: every minute
        var tempArray = [];
        
        if(cron[1] === "*" && cron[2] === "*" && cron[3] === "*"  && cron[4] === "*" && cron[5] === "?") {
            frequency.base = 1; // every minute
        } else if(cron[2] === "*" && cron[3] === "*"  && cron[4] === "*" && cron[5] === "?") {
            frequency.base = 2; // every hour
        } else if(cron[3] === "*"  && cron[4] === "*" && cron[5] === "?") {
            frequency.base = 3; // every day
        } else if(cron[3] === "?") {
            frequency.base = 4; // every week
        } else if(cron[4] === "*" && cron[5] === "?") {
            frequency.base = 5; // every month
        } else if(cron[5] === "?") {
            frequency.base = 6; // every year
        }

        if (cron[1] !== "*") {
            //preparing to handle multiple minutes
            if (allowMultiple) {
                tempArray = cron[1].split(",");
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.minuteValues = tempArray;
            } else {
                frequency.minuteValues = parseInt(cron[1]);
            }
        }
        if (cron[2] !== "*") {
            //preparing to handle multiple hours
            if (allowMultiple) {
                tempArray = cron[2].split(",");
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.hourValues = tempArray;
            } else {
                frequency.hourValues = parseInt(cron[2]);
            }
        }
        if (cron[3] !== "*" && cron[3] !== "?") {
            //preparing to handle multiple days of the month
            if (allowMultiple) {
                tempArray = cron[3].split(",");
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.dayOfMonthValues = tempArray;
            } else {
                frequency.dayOfMonthValues = parseInt(cron[3]);
            }
        }
        if (cron[4] !== "*") {
            //preparing to handle multiple months
            if (allowMultiple) {
                tempArray = cron[4].split(",");
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.monthValues = tempArray;
            } else {
                frequency.monthValues = parseInt(cron[4]);
            }
        }
        if (cron[5] !== "*" && cron[5] !== "?") {
            //preparing to handle multiple days of the week
            if (allowMultiple) {
                tempArray = cron[5].split(",");
                for (var i = 0; i < tempArray.length; i++) { tempArray[i] = +tempArray[i]; }
                frequency.dayValues = tempArray;
            } else {
                frequency.dayValues = parseInt(cron[5]);
            }
        }

        return frequency;
    };

    return service;
}]);