describe('BaselineController', function() {

    var controller,
        $rootScope,
        $location,
        $httpBackend;

    beforeEach(module('openhds'));
    beforeEach(module('LoginModule'));
    beforeEach(module('BaselineModule'));
    beforeEach(module('smart-table'));

    beforeEach(inject(function(_$controller_, _$httpBackend_,
                               _$rootScope_, _$location_){
        var mockLocationService = {
            submit: function(vm, locationSuccess) {}
        };

        spyOn(mockLocationService, 'submit');

        var args = {LocationService: mockLocationService};
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $location = _$location_;
        controller = _$controller_('BaselineController', args);
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Remove Selected Social Group updates selectedSocialGroup', function() {
        controller.selectedSocialGroups = ["a", "b", "c"];
        controller.removeSelectedSocialGroup("b");
        expect(controller.selectedSocialGroups).toEqual(["a", "c"]);
    });

    it('Should leave selectedSocialGroups alone if group not found', function() {
        controller.selectedSocialGroups = ["a", "b", "c"];
        controller.removeSelectedSocialGroup("d");
        expect(controller.selectedSocialGroups).toEqual(["a", "b", "c"]);
    });

    it('Should update social groups', function() {
        controller.selectedSocialGroups = ["a", "b", "c"];
        controller.addToSocialGroups("d");
        expect(controller.selectedSocialGroups).toEqual(["a", "b", "c", "d"]);
    });

    it('Should set selected fieldworker', function() {
        controller.allFieldWorkers = [{uuid: 1}, {uuid: 2}];
        controller.currentFieldWorkerUuid = 2;
        controller.saveFieldWorker();
        expect(controller.currentFieldWorker).toEqual({uuid: 2});
    });



});
