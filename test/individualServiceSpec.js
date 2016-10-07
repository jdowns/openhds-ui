describe('IndividualService Test', function() {

    var service, $httpBackend, $rootScope;

    beforeEach(module('openhds'));

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
            },
            function(headers) {
                return headers.authorization === 'Basic user:password';
            }
        ).respond(200, 'response one');

        $httpBackend.expectPOST(
            'http://example.com/individuals',
            {
                collectedByUuid: '123',
                individual: {
                    firstName: 'firstNameTwo',
                    lastName: 'lastNameTwo',
                    dateOfBirth: 'dob2',
                    extId: 'idTwo',
                    gender: 'UNIT TEST',
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
            individuals: [
                {
                    firstName: 'firstNameOne',
                    lastName: 'lastNameOne',
                    dateOfBirth: 'dob1',
                    extId: 'idOne',
                    gender: 'UNIT TEST'
                },
                {
                    firstName: 'firstNameTwo',
                    lastName: 'lastNameTwo',
                    dateOfBirth: 'dob2',
                    extId: 'idTwo',
                    gender: 'UNIT TEST'
                }]
        };

        var result = service.submit(model).then(function(response) {
            //TODO: this is not executing correctly. It should fail
            expect(response).toEqual(['response one', 'response 2']);
        });

        $httpBackend.flush();
    });
});
