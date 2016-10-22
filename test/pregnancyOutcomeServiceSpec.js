describe('PregnancyOutcome Service Test', function() {
    var service, $httpBackend, $rootScope;

    beforeEach(module('smart-table'));
    beforeEach(module('openhds'));

    beforeEach(inject(function(_PregnancyOutcomeService_, $injector) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        $rootScope.restApiUrl = 'http://example.com';
        $rootScope.credentials = "user:password";
        service = _PregnancyOutcomeService_;
    }));

    it('submits observation', function() {
        $httpBackend.expectPOST('http://example.com/pregnancyOutcomes', {
            collectedByUuid: 123,
            visitUuid: 456,
            motherUuid: 789,
            fatherUuid: 101112,
            pregnancyOutcome: {
                outcomeDate: "then",
                collectionDateTime: "01-13-2016"
            }
        }).respond(200, "posted outcome");

        var fieldWorker = {uuid: 123};
        var visit = {uuid: 456};
        var individual = {uuid: 789};
        var father = {uuid: 101112};
        var collectionDate = "01-13-2016";
        var event = {outcomeDate: "then"};

        var result = service.submit(fieldWorker, collectionDate, visit, individual, father, event);

        $httpBackend.flush();

        expect(result.$$state.value.data).toEqual("posted outcome");

    });
});
