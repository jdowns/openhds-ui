describe('LocationService Test', function() {

    var service, $httpBackend, $rootScope;

    beforeEach(module('openhds'));
    beforeEach(module('LoginModule'));
    beforeEach(module('BaselineModule'));
    beforeEach(module('smart-table'));

    beforeEach(inject(function(_LocationService_, $injector){
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        $rootScope.restApiUrl = 'http://example.com';
        $rootScope.credentials = "user:password";
        service = _LocationService_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should post well formed data to rest api', function() {

        $httpBackend.expectPOST(
            'http://example.com/locations',
            {
                collectedByUuid: '123',
                locationHierarchyUuid: '456',
                location: {
                    name: 'testName',
                    extId: 'testId',
                    type: 'UNIT TEST',
                    collectionDateTime: 'nowish'
                }
            },
            function(headers) {
                return headers.authorization === 'Basic user:password';
            }
        ).respond(200, 'response data...');

        var model = {
            currentFieldworker: {
                uuid: '123'
            },
            currentHierarchy: {
                uuid: '456'
            },
            collectionDateTime: 'nowish',
            location: {
                name: 'testName',
                extId: 'testId',
                type: 'UNIT TEST'
            }
        };

        service.submit(model, function(response) {
            expect(response).toEqual('response data...');
        });

        $httpBackend.flush();
    });
});
