angular.module('angular-cron-jobs').factory('cronService', function() {
   
   var service = {};

   service.setCron = function(n) { 
    var cron;
    if(n && n.base){
            if(n.base.value === 1){
              cron = '* * * * *';
            } else if(n.base.value === 2) {
              cron = '0 * * * *';
            } else if(n.base.value === 3) {
              cron = '0 0 * * *';
            } else if(n.base.value === 4) {
              cron = '0 0 * * 0';
            } else if(n.base.value === 5) {
              cron = '0 0 1 * *';
            } else if(n.base.value === 5) {
              cron = '0 0 1 1 *';
            }
        }

        if(n && n.base && n.base.value === 2 && n.pastTheHour && n.pastTheHour.value) {
            cron = n.pastTheHour.value + ' * * * *';
        }

        if(n && n.base && n.base.value === 3) {
            if(!n.minuteValue){
                n.minuteValue = {};
                n.minuteValue.value = 0;
            }
            if(!n.hourValue){
                n.hourValue = {};
                n.hourValue.value = 0;
            }
            cron = n.minuteValue.value + ' ' + n.hourValue.value + ' * * *';
        }

        if(n && n.base && n.base.value === 4) {

            console.log('entered week if statement: ', angular.copy(n));
            
            if(!n.weekMinuteValue){
                n.weekMinuteValue = {};
                n.weekMinuteValue.value = 0;
            }
            if(!n.weekHourValue){
                n.weekHourValue = {};
                n.weekHourValue.value = 0;
            }
            if(!n.dayValue){
                n.dayValue = {};
                n.dayValue.value = 1;
            }

            cron = n.weekMinuteValue.value + ' ' + n.weekHourValue.value + ' * * ' + (n.dayValue.value - 1);
        }

        if(n && n.base && n.base.value === 5) {
            
            if(!n.weekMinuteValue){
                n.weekMinuteValue = {};
                n.weekMinuteValue.value = 0;
            }
            if(!n.weekHourValue){
                n.weekHourValue = {};
                n.weekHourValue.value = 0;
            }
            if(!n.dayOfMonthValue){
                n.dayOfMonthValue = {};
                n.dayOfMonthValue.value = 0;
            }

            cron = n.weekMinuteValue.value + ' ' + n.weekHourValue.value + ' ' + n.dayOfMonthValue.value + ' * *';
        }

        if(n && n.base && n.base.value === 6) {
            
            if(!n.weekMinuteValue){
                n.weekMinuteValue = {};
                n.weekMinuteValue.value = 0;
            }
            if(!n.weekHourValue){
                n.weekHourValue = {};
                n.weekHourValue.value = 0;
            }
            if(!n.dayOfMonthValue){
                n.dayOfMonthValue = {};
                n.dayOfMonthValue.value = 0;
            }

            if(!n.monthValue){
                n.monthValue = {};
                n.monthValue.value = 1;
            }

            cron = n.weekMinuteValue.value + ' ' + n.weekHourValue.value + ' ' + n.dayOfMonthValue.value + ' ' + n.monthValue.value + ' *';
        }
        return cron;
      }
   
   return service;
});
