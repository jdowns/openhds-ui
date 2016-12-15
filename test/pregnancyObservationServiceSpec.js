describe('PregnancyObservation Service Test', function() {
    var service, $httpBackend, $rootScope;

    beforeEach(module('smart-table'));
    beforeEach(module('openhds'));

    beforeEach(inject(function(_PregnancyObservationService_, $injector) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        $rootScope.restApiUrl = 'http://example.com';
        $rootScope.credentials = "user:password";
        service = _PregnancyObservationService_;
    }));

    it('submits observation', function() {
        $httpBackend.expectPOST('http://example.com/pregnancyObservations', {
            collectedByUuid: 123,
            visitUuid: 456,
            motherUuid: 789,
            pregnancyObservation: {
                pregnancyDate: "01-14-2016",
                expectedDeliveryDate: "later",
                collectionDateTime: "01-14-2016"
            }
        }).respond(200, "posted observation");

        var fieldWorker = {uuid: 123};
        var visit = {uuid: 456, visitDate: "01-14-2016"};
        var individual = {uuid: 789};
        var collectionDate = "01-13-2016";
        var event = {pregnancyDate: "then", deliveryDate: "later"};

        var result = service.submit(fieldWorker, collectionDate, visit, individual, event);

        $httpBackend.flush();

        expect(result.$$state.value.data).toEqual("posted observation");

    });
});
