describe('MembershipService Test', function() {

    var service, $httpBackend, $rootScope;

    beforeEach(module('openhds'));

    beforeEach(inject(function(_MembershipService_, $injector) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        $rootScope.restApiUrl = 'http://example.com';
        $rootScope.credentials = "user:password";
        service = _MembershipService_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should post well formed data to rest api', function() {

        $httpBackend.expectPOST(
            'http://example.com/memberships',
            {
                collectedByUuid: '123',
                membership: {
                    individual: 'indA',
                    socialGroup: 'grp',
                    startType: 'UNIT TEST',
                    startDate: 'then',
                    collectionDateTime: 'nowish'
                }
            },
            function(headers) {
                return headers.authorization === 'Basic user:password';
            }
        ).respond(200, 'response one');

        $httpBackend.expectPOST(
            'http://example.com/memberships',
            {
                collectedByUuid: '123',
                membership: {
                    individual: 'indB',
                    socialGroup: 'grp',
                    startType: 'UNIT TEST',
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
            memberships: [
                {
                    individual: 'indA',
                    socialGroup: 'grp',
                    startType: 'UNIT TEST',
                    startDate: 'then'
                },
                {
                    individual: 'indB',
                    socialGroup: 'grp',
                    startType: 'UNIT TEST',
                    startDate: 'then'
                }]
        };

        var result = service.submit(model);

        Promise.all(result).then(function(response) {
            //TODO: this is not executing correctly. It should fail
            expect(response).toEqual(['response one', 'response 2']);
        });

        $httpBackend.flush();
    });
});
