describe('PregnancyResult Service Test', function() {
    var service, $httpBackend, $rootScope;

    beforeEach(module('smart-table'));
    beforeEach(module('openhds'));

    beforeEach(inject(function(_PregnancyResultService_, $injector) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        $rootScope.restApiUrl = 'http://example.com';
        $rootScope.credentials = "user:password";
        service = _PregnancyResultService_;
    }));

    it('submits observation', function() {
        $httpBackend.expectPOST('http://example.com/pregnancyResults', {
            collectedByUuid: 123,
            visitUuid: 456,
            pregnancyOutcomeUuid: 789,
            childUuid: 101112,
            pregnancyResult: {
                type: "test",
                collectionDateTime: "01-13-2016"
            }
        }).respond(200, "posted result");

        var fieldWorker = {uuid: 123};
        var visit = {uuid: 456};
        var outcome = {uuid: 789};
        var child = {uuid: 101112};
        var collectionDate = "01-13-2016";
        var event = {type: "test"};

        var result = service.submit(fieldWorker, collectionDate, visit, outcome, child, event);

        $httpBackend.flush();

        expect(result.$$state.value.data).toEqual("posted result");

    });
});
