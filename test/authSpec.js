describe('LoginController', function() {

    var controller,
        $rootScope,
        $location,
        $httpBackend;

    beforeEach(module('smart-table'));
    beforeEach(module('LoginModule'));
    beforeEach(module('BaselineModule'));
    beforeEach(module('openhds'));
    beforeEach(module('LoginModule'));
    beforeEach(module('AuditModule'));
    beforeEach(module('BaselineModule'));
    beforeEach(module('smart-table'));

    beforeEach(inject(function(_$controller_, _$httpBackend_,
                               _$rootScope_, _$location_){
        var args = {};
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $location = _$location_;
        controller = _$controller_('LoginController', args);
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Initialization sets rest api url', function() {
        $httpBackend.expectGET('/config.json').respond(
            {
                openhdsRest: 'http://example.com'
            }
        );

        controller.load();
        $httpBackend.flush();

        expect($rootScope.restApiUrl).toEqual('http://example.com');
    });

    it('Successful login redirects to data entry and saves credentials', function() {
        $rootScope.restApiUrl = "http://example.com";
        var username = "username",
            password = "password";

        $httpBackend.expectGET($rootScope.restApiUrl).respond('ok');

        controller.username = username;
        controller.password = password;

        controller.login(true);

        $httpBackend.flush();
    });

    it('Unsuccessful login resets credentials', function() {
        $rootScope.restApiUrl = "http://example.com";
        var username = "username",
            password = "password";

        $httpBackend.expectGET($rootScope.restApiUrl).respond(401);

        controller.login(true);
        $httpBackend.flush();
    });
});
