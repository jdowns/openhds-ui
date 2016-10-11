describe('IndividualService Test', function() {

    var service, $httpBackend, $rootScope;

    beforeEach(module('smart-table'));
    beforeEach(module('LoginModule'));
    beforeEach(module('BaselineModule'));
    beforeEach(module('openhds'));
    beforeEach(module('LoginModule'));
    beforeEach(module('BaselineModule'));
    beforeEach(module('smart-table'));

    beforeEach(inject(function(_IndividualService_, $injector) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        $rootScope.restApiUrl = 'http://example.com';
        $rootScope.credentials = "user:password";
        service = _IndividualService_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should post well formed data to rest api', function() {

        $httpBackend.expectPOST(
            'http://example.com/individuals',
            {
                collectedByUuid: '123',
                individual: {
                    firstName: 'firstNameOne',
                    lastName: 'lastNameOne',
                    dateOfBirth: 'dob1',
                    extId: 'idOne',
                    gender: 'UNIT TEST',
                    collectionDateTime: 'nowish'
                }
            }
        ).respond(200, 'response one');


        var model = {
            currentFieldworker: {
                uuid: '123'
            },
            collectionDateTime: 'nowish',
            individual: {
                    firstName: 'firstNameOne',
                    lastName: 'lastNameOne',
                    dateOfBirth: 'dob1',
                    extId: 'idOne',
                    gender: 'UNIT TEST'
                }
        };

        service.submit(model.currentFieldworker,
                       model.collectionDateTime,
                       model.individual)
                .then(function(response) {
            //TODO: this is not executing correctly. It should fail
            expect(response.data).toEqual('response one');
        });

        $httpBackend.flush();
    });


    it('should get all locations at a hierarchy', function() {
        $httpBackend.expectGET('http://example.com/individuals.json?locationHierarchyUuid=123')
            .respond({content: [{
                extId: 'extId',
                firstName: 'firstName',
                lastName: 'lastName',
                dateOfBirth: 'dob',
                gender: 'gender'
            }]});
        service.getByHierarchy('123').then(function(response) {
            var locations = response;
            expect(locations).toEqual([
                {
                    extId: 'extId',
                    firstName: 'firstName',
                    lastName: 'lastName',
                    dateOfBirth: 'dob',
                    gender: 'gender'
                }]);
        });

        $httpBackend.flush();
    });
});
