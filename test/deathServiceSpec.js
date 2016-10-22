describe('Death Service Test', function() {
    var service, $httpBackend, $rootScope;

    beforeEach(module('smart-table'));
    beforeEach(module('openhds'));

    beforeEach(inject(function(_DeathService_, $injector) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        $rootScope.restApiUrl = 'http://example.com';
        $rootScope.credentials = "user:password";
        service = _DeathService_;
    }));

    it('submits death', function() {
        $httpBackend.expectPOST('http://example.com/deaths', {
            collectedByUuid: 123,
            visitUuid: 456,
            individualUuid: 789,
            death: {
                deathDate: "then",
                collectionDateTime: "01-13-2016"
            }
        }).respond(200, "posted death");

        var fieldWorker = {uuid: 123};
        var visit = {uuid: 456};
        var individual = {uuid: 789};
        var collectionDate = "01-13-2016";
        var event = {deathDate: "then"};

        var result = service.submit(fieldWorker, collectionDate, visit, individual, event);

        $httpBackend.flush();

        expect(result.$$state.value.data).toEqual("posted death");

    });
});
