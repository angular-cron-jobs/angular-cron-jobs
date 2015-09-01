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
        scope.myFrequency = {base: 1};
        scope.cron = cronService.setCron(scope.myFrequency);
        $rootScope.$digest();
        expect(scope.cron).toEqual('* * * * *');
    });

    it("cron should be set for every hour at 10 past", function() {
        var scope = $rootScope.$new();
        var view = createView(scope);
        scope.myFrequency = {base: 2, minuteValue: 10};
        scope.cron = cronService.setCron(scope.myFrequency);
        $rootScope.$digest();
        expect(scope.cron).toEqual('10 * * * *');
    });

    it("cron should be set for every day at 4:30 AM", function() {
        var scope = $rootScope.$new();
        var view = createView(scope);
        scope.myFrequency = {base: 3, hourValue: 4, minuteValue: 30};
        scope.cron = cronService.setCron(scope.myFrequency);
        $rootScope.$digest();
        expect(scope.cron).toEqual('30 4 * * *');
    });

    it("cron should be set for every week on Monday at 12:45 PM", function() {
        var scope = $rootScope.$new();
        var view = createView(scope);
        scope.myFrequency = {base: 4, hourValue: 12, minuteValue: 45, dayValue: 1};
        scope.cron = cronService.setCron(scope.myFrequency);
        $rootScope.$digest();
        expect(scope.cron).toEqual('45 12 * * 1');
    });

    it("cron should be set for every month on the 3rd at 6:55 PM", function() {
        var scope = $rootScope.$new();
        var view = createView(scope);
        scope.myFrequency = {base: 5, hourValue: 18, minuteValue: 55, dayOfMonthValue: 3};
        scope.cron = cronService.setCron(scope.myFrequency);
        $rootScope.$digest();
        expect(scope.cron).toEqual('55 18 3 * *');
    });

    it("cron should be set for every year on the 5th of May at 4:10 AM", function() {
        var scope = $rootScope.$new();
        var view = createView(scope);
        scope.myFrequency = {base: 6, hourValue: 4, minuteValue: 10, dayOfMonthValue: 5, monthValue: 5};
        scope.cron = cronService.setCron(scope.myFrequency);
        $rootScope.$digest();
        expect(scope.cron).toEqual('10 4 5 5 *');
    });

    it("cron with init '15 * * * *' should have minutes set and base mode 2", function() {
        expect(cronService.fromCron('15 * * * *')).toEqual({base: 2, minuteValue: 15});
    });

    it("cron with init '20 19 * * *' should have minutes and hours set and base mode 3", function() {
        expect(cronService.fromCron('20 19 * * *')).toEqual({base: 3, minuteValue: 20, hourValue: 19});
    });

    it("cron with init '25 1 * * 3' should have minutes and hours set and base mode 4", function() {
        expect(cronService.fromCron('25 1 * * 3')).toEqual({base: 4, minuteValue: 25, hourValue: 1, dayValue: 3});
    });

    it("cron with init '30 10 7 * *' should have minutes and hours set and base mode 5", function() {
        expect(cronService.fromCron('30 10 7 * *')).toEqual({base: 5, minuteValue: 30, hourValue: 10, dayOfMonthValue: 7});
    });

    it("cron with init '35 23 29 4 *' should have minutes and hours set and base mode 6", function() {
        expect(cronService.fromCron('35 23 29 4 *')).toEqual({base: 6, minuteValue: 35, hourValue: 23, dayOfMonthValue: 29, monthValue: 4});
    });

    it("cron should disallow minute if set in config", function() {
        var scope = $rootScope.$new();
        var view = createView(scope);
        var isolateScope = view.isolateScope();
        expect(isolateScope.frequency[0].label).toEqual('Hour');
    });
});
