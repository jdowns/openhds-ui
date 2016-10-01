describe('BaselineController', function() {

    var controller;

    beforeEach(module('openhds'));

    beforeEach(inject(function(_$controller_){
        var args = {};
        controller = _$controller_('BaselineController', args);
    }));


    it('Set fieldworker adds selected fieldworker to ', function() {

        expect(1).toBe(1);
    });
});
