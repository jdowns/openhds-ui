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
            someVariable: 2
        });
    }));

    it('should authorize a valid user', inject(function(FieldWorkerService) {
        expect(FieldWorkerService).toBeDefined();
        expect(FieldWorkerService.foo).toEqual(1);
        expect(FieldWorkerService.b).toEqual(1);
        expect(FieldWorkerService.c).toEqual(2);

    }));
});