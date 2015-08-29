'use strict';

describe('openHDS client service', function() {

    var clientService;

    beforeEach(module('openHDS.client'));

    beforeEach(inject(function(_clientService_) {
        clientService = _clientService_;
    }));

    it('Service should exist', function() {
        expect(clientService).not.toBe(null);
    });
});
