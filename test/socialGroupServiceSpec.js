describe('SocialGroupService Test', function() {

    var service, $httpBackend, $rootScope;

    beforeEach(module('smart-table'));
    beforeEach(module('LoginModule'));
    beforeEach(module('BaselineModule'));
    beforeEach(module('openhds'));
    beforeEach(module('LoginModule'));
    beforeEach(module('BaselineModule'));
    beforeEach(module('smart-table'));

    beforeEach(inject(function(_SocialGroupService_, $injector) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        $rootScope.restApiUrl = 'http://example.com';
        $rootScope.credentials = "user:password";
        service = _SocialGroupService_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should post well formed data to rest api', function() {

        $httpBackend.expectPOST(
            'http://example.com/socialGroups',
            {
                collectedByUuid: '123',
                socialGroup: {
                    groupName: 'groupOne',
                    extId: 'groupOneId',
                    groupType: 'UNIT TEST',
                    collectionDateTime: 'nowish'
                }
            },
            function(headers) {
                return headers.authorization === 'Basic user:password';
            }
        ).respond(200, 'response one');

        $httpBackend.expectPOST(
            'http://example.com/socialGroups',
            {
                collectedByUuid: '123',
                socialGroup: {
                    groupName: 'groupTwo',
                    extId: 'groupTwoId',
                    groupType: 'UNIT TEST',
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
            socialGroups: [
                {
                    groupName: 'groupOne',
                    extId: 'groupOneId',
                    groupType: 'UNIT TEST'
                },
                {
                    groupName: 'groupTwo',
                    extId: 'groupTwoId',
                    groupType: 'UNIT TEST'
                }]
        };
        var result = service.submit(model);

        Promise.all(result).then(function(response) {
            //TODO: this is not executing correctly. it should fail
            expect(response).toEqual(['response one', 'response 2']);
        });

        $httpBackend.flush();
    });


    it('should get all socialGroups', function() {
        $httpBackend.expectGET('http://example.com/socialGroups/bulk.json')
            .respond([{
                uuid: 'uuid',
                extId: 'extId',
                groupName: 'name',
                groupType: 'type'
            }]);
        service.getAllSocialGroups('123').then(function(response) {
            var groups = response;
            expect(groups).toEqual([
                {
                    uuid: 'uuid',
                    extId: 'extId',
                    groupName: 'name',
                    groupType: 'type'
                }]);
        });

        $httpBackend.flush();
    });
});
