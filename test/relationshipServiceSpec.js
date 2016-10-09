describe('RelationshipService Test', function() {

    var service, $httpBackend, $rootScope;

    beforeEach(module('smart-table'));
    beforeEach(module('LoginModule'));
    beforeEach(module('BaselineModule'));
    beforeEach(module('openhds'));
    beforeEach(module('LoginModule'));
    beforeEach(module('BaselineModule'));
    beforeEach(module('smart-table'));

    beforeEach(inject(function(_RelationshipService_, $injector) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        $rootScope.restApiUrl = 'http://example.com';
        $rootScope.credentials = "user:password";
        service = _RelationshipService_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should post well formed data to rest api', function() {

        $httpBackend.expectPOST(
            'http://example.com/relationships',
            {
                collectedByUuid: '123',
                relationship: {
                    individualA: 'indA',
                    individualB: 'indB',
                    relationshipType: 'UNIT TEST',
                    startDate: 'then',
                    collectionDateTime: 'nowish'
                }
            },
            function(headers) {
                return headers.authorization === 'Basic user:password';
            }
        ).respond(200, 'response one');

        $httpBackend.expectPOST(
            'http://example.com/relationships',
            {
                collectedByUuid: '123',
                relationship: {
                    individualA: 'indC',
                    individualB: 'indD',
                    relationshipType: 'UNIT TEST',
                    startDate: 'then',
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
            relationships: [
                {
                    individualA: 'indA',
                    individualB: 'indB',
                    relationshipType: 'UNIT TEST',
                    startDate: 'then'
                },
                {
                    individualA: 'indC',
                    individualB: 'indD',
                    relationshipType: 'UNIT TEST',
                    startDate: 'then'
                }]
        };

        var result = service.submit(model);

        Promise.all(result).then(function(response) {
            //TODO: this is not executing correctly. it should fail
            expect(response).toEqual(['response one', 'response 2']);
        });

        $httpBackend.flush();
    });
});
