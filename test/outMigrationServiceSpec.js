describe('Out Migration Service Test', function() {
    var service, $httpBackend, $rootScope;

    beforeEach(module('smart-table'));
    beforeEach(module('openhds'));

    beforeEach(inject(function(_OutMigrationService_, $injector) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        $rootScope.restApiUrl = 'http://example.com';
        $rootScope.credentials = "user:password";
        service = _OutMigrationService_;
    }));

    it('submits out Migration', function() {
        $httpBackend.expectPOST('http://example.com/outMigrations', {
            collectedByUuid: 123,
            visitUuid: 456,
            individualUuid: 789,
            residencyUuid: 101112,
            outMigration: {
                migrationDate: "then",
                destination: "foo",
                reason: "moved",
                collectionDateTime: "01-13-2016"
            }
        }).respond(200, "posted out migration!");

        var fieldWorker = {uuid: 123};
        var visit = {uuid: 456};
        var individual = {uuid: 789};
        var residency = {uuid: 101112};
        var collectionDate = "01-13-2016";
        var event = {migrationDate: "then", destination: "foo", reason: "moved"};

        var result = service.submit(fieldWorker, collectionDate, visit, individual, residency, event);

        $httpBackend.flush();

        expect(result.$$state.value.data).toEqual("posted out migration!");

    });
    it('sets residency to unknown if not specified', function() {
        $httpBackend.expectPOST('http://example.com/outMigrations', {
            collectedByUuid: 123,
            visitUuid: 456,
            individualUuid: 789,
            residencyUuid: "UNKNOWN",
            outMigration: {
                migrationDate: "then",
                destination: "foo",
                reason: "moved",
                collectionDateTime: "01-13-2016"
            }
        }).respond(200, "posted out migration!");

        var fieldWorker = {uuid: 123};
        var visit = {uuid: 456};
        var individual = {uuid: 789};
        var residency = null;
        var collectionDate = "01-13-2016";
        var event = {migrationDate: "then", destination: "foo", reason: "moved"};

        var result = service.submit(fieldWorker, collectionDate, visit, individual, residency, event);

        $httpBackend.flush();

        expect(result.$$state.value.data).toEqual("posted out migration!");

    });
});
