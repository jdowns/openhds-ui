describe('ResidencyService Test', function() {

    var service, $httpBackend, $rootScope;

    beforeEach(module('openhds'));

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
                residency: {
                    individual: 'indA',
                    location: 'locA',
                    startDate: 'then',
                    startType: 'UNIT TEST',
                    collectionDateTime: 'nowish'
                }
            },
            function(headers) {
                return headers.authorization === 'Basic user:password';
            }
        ).respond(200, 'response one');

        $httpBackend.expectPOST(
            'http://example.com/residencies',
            {
                collectedByUuid: '123',
                residency: {
                    individual: 'indB',
                    location: 'locA',
                    startDate: 'then',
                    startType: 'UNIT TEST',
                    collectionDateTime: 'nowish'
                }
            },
            function(headers) {
                return headers.authorization === 'Basic user:password';
            }
        ).respond(200, 'response two');

        var model = {
            currentFieldworker: {
                uuid: '123'
            },
            collectionDateTime: 'nowish',
            residencies: [
                {
                    individual: 'indA',
                    location: 'locA',
                    startType: 'UNIT TEST',
                    startDate: 'then'
                },
                {
                    individual: 'indB',
                    location: 'locA',
                    startType: 'UNIT TEST',
                    startDate: 'then'
                }]
        };

        var result = service.submit(model);

        console.log(result[0]);
        Promise.all(result).then(function(response) {
            //TODO: this is not executing correctly. it should fail
            expect(response).toEqual(['response one', 'response 2']);
        });

        $httpBackend.flush();
    });
});
