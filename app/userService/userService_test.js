'use strict';

describe('openHDS user service', function() {

    var userService;

    beforeEach(module("openHDS.user"));

    beforeEach(inject(function(_userService_) {
        userService = _userService_;
    }));

    it('Should have Field Worker information', function() {
        expect(userService.fieldWorkerID).toBe('fieldWorker');
        userService.fieldWorkerId = "fieldWorkerId1";
        expect(userService.fieldWorkerId).toBe('fieldWorkerId1');
    });
});
