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
            allowMultiple: true,
            options : {
                allowMinute : false
            }
        };
        var element = angular.element('<cron-selection ng-model="cron" config="config"></cron-selection>');
        var elementCompiled = $compile(element)(scope);
        $rootScope.$digest();
        return elementCompiled;
    }

    it("cronService.fromCron: '15 * * * *' should have minutes set and base mode 2 with multiple false", function() {
        expect(cronService.fromCron('15 * * * *', false)).toEqual({base: 2, minuteValues: 15});
    });

    it("cronService.fromCron: '15 * * * *' should have minutes set and base mode 2 with multiple true", function() {
        expect(cronService.fromCron('15 * * * *', true)).toEqual({base: 2, minuteValues: [15]});
    });

    it("cronService.fromCron: '20 19 * * *' should have minutes and hours set and base mode 3", function() {
        expect(cronService.fromCron('20 19 * * *')).toEqual({base: 3, minuteValues: 20, hourValues: 19});
    });

    it("cronService.fromCron: '25 1 * * 3' should have minutes and hours set and base mode 4", function() {
        expect(cronService.fromCron('25 1 * * 3')).toEqual({base: 4, minuteValues: 25, hourValues: 1, dayValues: 3});
    });

    it("cronService.fromCron: '30 10 7 * *' should have minutes and hours set and base mode 5", function() {
        expect(cronService.fromCron('30 10 7 * *', true)).toEqual({base: 5, minuteValues: [30], hourValues: [10], dayOfMonthValues: [7]});
    });

    it("cronService.fromCron: '35 23 29 4 *' should have minutes and hours set and base mode 6", function() {
        expect(cronService.fromCron('35 23 29 4 *', true)).toEqual({base: 6, minuteValues: [35], hourValues: [23], dayOfMonthValues: [29], monthValues: [4]});
    });

    it("cronService.fromCron: '10,15 * * * *' should have minutes set and base mode 2", function() {
        expect(cronService.fromCron('10,15 * * * *', true)).toEqual({base: 2, minuteValues: [10,15]});
    });

    it("cronService.fromCron: '15,20 18,19 * * *' should have minutes and hours set and base mode 3", function() {
        expect(cronService.fromCron('15,20 18,19 * * *', true)).toEqual({base: 3, minuteValues: [15,20], hourValues: [18,19]});
    });

    it("cronService.fromCron: '20,25 1 * * 3' should have minutes and hours set and base mode 4", function() {
        expect(cronService.fromCron('20,25 1 * * 2,3', true)).toEqual({base: 4, minuteValues: [20,25], hourValues: [1], dayValues: [2,3]});
    });

    it("cronService.fromCron: '25,30 9,10 6,7 * *' should have minutes and hours set and base mode 5", function() {
        expect(cronService.fromCron('25,30 9,10 6,7 * *', true)).toEqual({base: 5, minuteValues: [25,30], hourValues: [9,10], dayOfMonthValues: [6,7]});
    });

    it("cronService.fromCron: '35 23 29 3,4 *' should have minutes and hours set and base mode 6", function() {
        expect(cronService.fromCron('35 23 29 3,4 *', true)).toEqual({base: 6, minuteValues: [35], hourValues: [23], dayOfMonthValues: [29], monthValues: [3,4]});
    });

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
        scope.myFrequency = {base: 2, minuteValues: [10, 15]};
        scope.cron = cronService.setCron(scope.myFrequency);
        $rootScope.$digest();
        expect(scope.cron).toEqual('10,15 * * * *');
    });

    it("cron should be set for every day at 4:30 AM", function() {
        var scope = $rootScope.$new();
        var view = createView(scope);
        scope.myFrequency = {base: 3, hourValues: [4], minuteValues: [30]};
        scope.cron = cronService.setCron(scope.myFrequency);
        $rootScope.$digest();
        expect(scope.cron).toEqual('30 4 * * *');
    });

    it("cron should be set for every week on Monday at 12:45 PM", function() {
        var scope = $rootScope.$new();
        var view = createView(scope);
        scope.myFrequency = {base: 4, hourValues: [12], minuteValues: [45], dayValues: [1]};
        scope.cron = cronService.setCron(scope.myFrequency);
        $rootScope.$digest();
        expect(scope.cron).toEqual('45 12 * * 1');
    });

    it("cron should be set for every month on the 3rd at 6:55 PM", function() {
        var scope = $rootScope.$new();
        var view = createView(scope);
        scope.myFrequency = {base: 5, hourValues: [18], minuteValues: [55], dayOfMonthValues: [3]};
        scope.cron = cronService.setCron(scope.myFrequency);
        $rootScope.$digest();
        expect(scope.cron).toEqual('55 18 3 * *');
    });

    it("cron should be set for every year on the 5th of May at 4:10 AM", function() {
        var scope = $rootScope.$new();
        var view = createView(scope);
        scope.myFrequency = {base: 6, hourValues: [4], minuteValues: [10], dayOfMonthValues: [5], monthValues: [5]};
        scope.cron = cronService.setCron(scope.myFrequency);
        $rootScope.$digest();
        expect(scope.cron).toEqual('10 4 5 5 *');
    });

    it("cron should be set for every year on the 5th and 6th of May and June at 4:10 AM", function() {
        var scope = $rootScope.$new();
        var view = createView(scope);
        scope.myFrequency = {base: 6, hourValues: [4], minuteValues: [10], dayOfMonthValues: [5,6], monthValues: [5,6]};
        scope.cron = cronService.setCron(scope.myFrequency);
        $rootScope.$digest();
        expect(scope.cron).toEqual('10 4 5,6 5,6 *');
    });

    it("cron should disallow minute if set in config", function() {
        var scope = $rootScope.$new();
        var view = createView(scope);
        var isolateScope = view.isolateScope();
        expect(isolateScope.frequency[0].label).toEqual('Hour');
    });

    it("cron should allow multiselect if set to true in config", function() {
        var scope = $rootScope.$new();
        var view = createView(scope);
        var isolateScope = view.isolateScope();
        expect(isolateScope.allowMultiple).toEqual(true);
    });
});
