"use strict";

describe('EntityAuditController', function() {
    var $controller,
        controller,
        AppStateMock,
        $locationMock,
        $httpBackend;

    beforeEach(module('openHDS.view'));

    beforeEach(inject(function(_$httpBackend_, _$controller_) {
        $httpBackend = _$httpBackend_;
        $controller = _$controller_;

        AppStateMock = {};
        $locationMock = jasmine.createSpyObj('$location', ['url']);

        controller = $controller('EntityAuditController', {
            AppState: AppStateMock
        });
    }));

    describe('EntityAuditController', function() {
        it('initializes correctly', function() {

            var visibleForm = 'an-entity';
            controller.show(visibleForm);

            expect(controller.visible).toEqual(visibleForm);
        });
        it('searches visible entity', function() {

            var uuid = 'a-uuid',
                visibleForm = 'an-entity',
                entity = 'entity';

            $httpBackend.expectGET("/api/search/" + visibleForm + '/' +  uuid)
                .respond(entity);

            controller.show(visibleForm);
            controller.search(uuid);
            $httpBackend.flush();

            expect(controller.entity).toEqual(entity);
        });
    });
});
