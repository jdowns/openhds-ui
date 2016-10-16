describe('MembershipService Test', function() {

    var service, $httpBackend, $rootScope;

    beforeEach(module('smart-table'));
    beforeEach(module('LoginModule'));
    beforeEach(module('BaselineModule'));
    beforeEach(module('openhds'));
    beforeEach(module('LoginModule'));
    beforeEach(module('BaselineModule'));
    beforeEach(module('smart-table'));

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
                individualUuid: 'indA',
                socialGroupUuid: 'grp',
                membership: {
                    startType: 'UNIT TEST',
                    startDate: 'then',
                    collectionDateTime: 'nowish'
                }
            },
            function(headers) {
                return headers.authorization === 'Basic user:password';
            }
        ).respond(200, 'response one');


        var model = {
            currentFieldworker: {
                uuid: '123'
            },
            collectionDateTime: 'nowish',
            membership: {
                individual: {uuid: 'indA'},
                socialGroup: {uuid: 'grp'},
                startType: 'UNIT TEST',
                startDate: 'then'
            }
        };

        var result = service.submit(model.currentFieldworker,
                                    model.collectionDateTime,
                                    model.membership);

        Promise.all(result).then(function(response) {
            //TODO: this is not executing correctly. It should fail
            expect(response).toEqual('response one');
        });

        $httpBackend.flush();
    });
});
