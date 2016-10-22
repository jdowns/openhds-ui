describe('In Migration Service Test', function() {
    var service, $httpBackend, $rootScope;

    beforeEach(module('smart-table'));
    beforeEach(module('openhds'));

    beforeEach(inject(function(_InMigrationService_, $injector) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        $rootScope.restApiUrl = 'http://example.com';
        $rootScope.credentials = "user:password";
        service = _InMigrationService_;
    }));

    it('submits inMigration', function() {
        $httpBackend.expectPOST('http://example.com/inMigrations', {
            collectedByUuid: 123,
            visitUuid: 456,
            individualUuid: 789,
            residencyUuid: 101112,
            inMigration: {
                migrationDate: "then",
                migrationType: "test",
                collectionDateTime: "01-13-2016"
            }
        }).respond(200, "posted in migration!");

        var fieldWorker = {uuid: 123};
        var visit = {uuid: 456};
        var individual = {uuid: 789};
        var residency = {uuid: 101112};
        var collectionDate = "01-13-2016";
        var event = {migrationDate: "then", migrationType: "test"};

        var result = service.submit(fieldWorker, collectionDate, visit, individual, residency, event);

        $httpBackend.flush();

        expect(result.$$state.value.data).toEqual("posted in migration!");

    });
});
