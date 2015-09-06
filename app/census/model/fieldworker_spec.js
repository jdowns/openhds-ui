'use strict';

describe('Fieldworker Service', function() {
    var fieldWorkerService;

    beforeEach(module('openHDS.core'));
    beforeEach(module('openHDS.model'));


    beforeEach(module(function ($provide) {
        $provide.value('BackendService', {
            someVariable: 1
        });
        $provide.value('ModelService', {
        });
    }));

    it('should authorize a valid user', inject(function(FieldWorkerService, BackendService, ModelService) {
        expect(BackendService.someVariable).toEqual(1);
        expect(FieldWorkerService.authorize('username', 'password')).toBe(true);
    }));
});