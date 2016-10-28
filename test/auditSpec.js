describe('AuditController', function() {

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
    beforeEach(module('AuditModule'));
    beforeEach(module('openhds'));
    beforeEach(module('smart-table'));

    beforeEach(inject(function(_$controller_, _$httpBackend_,
                               _$rootScope_, _$location_){

        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $location = _$location_;
        var args = {};
        controller = _$controller_('AuditController', args);
        $rootScope.restApiUrl = 'http://example.com';
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Inits controller', function() {
        $httpBackend.expectGET('http://example.com/projectCodes/bulk.json')
            .respond('codes');
        $httpBackend.expectGET('http://example.com/locationHierarchyLevels/bulk.json')
            .respond(['levels']);
        $httpBackend.expectGET('http://example.com/locationHierarchies/bulk.json')
            .respond([{uuid: 1, parent: {uuid: 2}}]);
        $httpBackend.expectGET('http://example.com/locationHierarchyLevels/bulk.json')
            .respond(['levels']);

        controller.init();

        $httpBackend.flush();
        expect(controller).toBeDefined();
    });
});
