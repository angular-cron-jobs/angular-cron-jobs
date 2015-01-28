describe('AngularCronJobs', function() {
    var $compile, $rootScope, cronService;

    beforeEach(module('angular-cron-jobs'));


    beforeEach(inject(function(_$compile_, _$rootScope_, _cronService_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        cronService = _cronService_;
    }));

    function createView(scope) {
        scope.config = {
            options : {
                allowMinute : false
            }
        };
        var element = angular.element('<cron-selection config="config"></cron-selection>');
        var elementCompiled = $compile(element)(scope);
        $rootScope.$digest();
        return elementCompiled;
    }

    it("cron should be set for every minute", function() {
        var scope = $rootScope.$new();
        var view = createView(scope);
        scope.myFrequency = {};
        scope.myFrequency.base = {};
        scope.myFrequency.base.value = 1;
        scope.cron = cronService.setCron(scope.myFrequency);
        $rootScope.$digest();
        expect(scope.cron).toEqual('* * * * *');
    });

    it("cron should be set for every hour at 10 past", function() {
        var scope = $rootScope.$new();
        var view = createView(scope);
        scope.myFrequency = {};
        scope.myFrequency.base = {};
        scope.myFrequency.base.value = 2;
        scope.myFrequency.pastTheHour = {};
        scope.myFrequency.pastTheHour.value = 10;
        scope.cron = cronService.setCron(scope.myFrequency);
        $rootScope.$digest();
        expect(scope.cron).toEqual('10 * * * *');
    });

    it("cron should be set for every day at 4:30 AM", function() {
        var scope = $rootScope.$new();
        var view = createView(scope);
        scope.myFrequency = {};
        scope.myFrequency.base = {};
        scope.myFrequency.base.value = 3;
        scope.myFrequency.hourValue = {};
        scope.myFrequency.hourValue.value = 4;
        scope.myFrequency.minuteValue = {};
        scope.myFrequency.minuteValue.value = 30;
        scope.cron = cronService.setCron(scope.myFrequency);
        $rootScope.$digest();
        expect(scope.cron).toEqual('30 4 * * *');
    });

    it("cron should be set for every week on Monday at 12:45 PM", function() {
        var scope = $rootScope.$new();
        var view = createView(scope);
        scope.myFrequency = {};
        scope.myFrequency.base = {};
        scope.myFrequency.base.value = 4;
        scope.myFrequency.weekHourValue = {};
        scope.myFrequency.weekHourValue.value = 12;
        scope.myFrequency.weekMinuteValue = {};
        scope.myFrequency.weekMinuteValue.value = 45;
        scope.myFrequency.dayValue = {};
        scope.myFrequency.dayValue.value = 2;
        scope.cron = cronService.setCron(scope.myFrequency);
        $rootScope.$digest();
        expect(scope.cron).toEqual('45 12 * * 1');
    });

    it("cron should be set for every month on the 3rd at 6:55 PM", function() {
        var scope = $rootScope.$new();
        var view = createView(scope);
        scope.myFrequency = {};
        scope.myFrequency.base = {};
        scope.myFrequency.base.value = 5;
        scope.myFrequency.weekHourValue = {};
        scope.myFrequency.weekHourValue.value = 18;
        scope.myFrequency.weekMinuteValue = {};
        scope.myFrequency.weekMinuteValue.value = 55;
        scope.myFrequency.dayOfMonthValue = {};
        scope.myFrequency.dayOfMonthValue.value = 3;
        scope.cron = cronService.setCron(scope.myFrequency);
        $rootScope.$digest();
        expect(scope.cron).toEqual('55 18 3 * *');
    });

    it("cron should be set for every year on the 5th of May at 4:10 AM", function() {
        var scope = $rootScope.$new();
        var view = createView(scope);
        scope.myFrequency = {};
        scope.myFrequency.base = {};
        scope.myFrequency.base.value = 6;
        scope.myFrequency.weekHourValue = {};
        scope.myFrequency.weekHourValue.value = 4;
        scope.myFrequency.weekMinuteValue = {};
        scope.myFrequency.weekMinuteValue.value = 10;
        scope.myFrequency.dayOfMonthValue = {};
        scope.myFrequency.dayOfMonthValue.value = 5;
        scope.myFrequency.monthValue = {};
        scope.myFrequency.monthValue.value = 5;
        scope.cron = cronService.setCron(scope.myFrequency);
        $rootScope.$digest();
        expect(scope.cron).toEqual('10 4 5 5 *');
    });

});