describe('UpdateController', function() {

    var controller,
        $rootScope,
        $location,
        $httpBackend,
        mockLocationService,
        mockSocialGroupService,
        mockIndividualService,
        mockMembershipService,
        mockRelationshipService;

    beforeEach(module('LoginModule'));
    beforeEach(module('UpdateModule'));
    beforeEach(module('openhds'));
    beforeEach(module('smart-table'));

    beforeEach(inject(function(_$controller_, _$httpBackend_,
                               _$rootScope_, _$location_){

        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $location = _$location_;
	var args = {};
        controller = _$controller_('UpdateController', args);
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Inits controller', function() {
        expect(controller).toBeDefined();
    });
});
