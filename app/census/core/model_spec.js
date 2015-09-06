'use strict';

describe('Models.core', function() {
    var modelService;

    beforeEach(module('openHDS.core'));
    beforeEach(inject(function(_ModelService_) {
        modelService = _ModelService_;
    }));

    it('should have initial empty models', function() {
        expect(modelService.currentFieldWorker).toEqual({});
        expect(modelService.currentLocation).toEqual({});
        expect(modelService.currentIndividual).toEqual({});
    })
})