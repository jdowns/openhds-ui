describe('ResidencyService Test', function() {

    var service, $httpBackend, $rootScope;

    beforeEach(module('smart-table'));
    beforeEach(module('LoginModule'));
    beforeEach(module('BaselineModule'));
    beforeEach(module('openhds'));
    beforeEach(module('LoginModule'));
    beforeEach(module('BaselineModule'));
    beforeEach(module('smart-table'));

    beforeEach(inject(function(_ResidencyService_, $injector) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        $rootScope.restApiUrl = 'http://example.com';
        $rootScope.credentials = "user:password";
        service = _ResidencyService_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should post well formed data to rest api', function() {

        $httpBackend.expectPOST(
            'http://example.com/residencies',
            {
                collectedByUuid: '123',
                individualUuid: 'indA',
                locationUuid: 'locA',
                residency: {
                    startDate: 'then',
                    startType: 'UNIT TEST',
                    collectionDateTime: 'nowish'
                }
            }
        ).respond(200, 'response one');

        var model = {
            currentFieldworker: {
                uuid: '123'
            },
            collectionDateTime: 'nowish',
            residencies: [
                {
                    individual: {uuid: 'indA'},
                    location: {uuid: 'locA'},
                    startType: 'UNIT TEST',
                    startDate: 'then'
                },
                {
                    individual: {uuid: 'indB'},
                    location: {uuid: 'locA'},
                    startType: 'UNIT TEST',
                    startDate: 'then'
                }]
        };

        var startType = "UNIT TEST";
        var individual = {uuid: "indA"};
        var location = {uuid: "locA"};

        var result = service.submit(startType,
                                    model.currentFieldworker,
                                    individual,
                                    location,
                                    model.collectionDateTime,
                                    model.residencies[0]);

        $httpBackend.flush();

        expect(result.$$state.value.data).toEqual('response one');

    });
});
