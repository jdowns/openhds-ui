'use strict';

describe('Backend Service', function() {
    var backendService;
    var $httpBackend;
    
    beforeEach(module('openHDS.core'));
    beforeEach(inject(function(_$httpBackend_, _BackendService_) {
        backendService = _BackendService_;
        $httpBackend = _$httpBackend_;
    }));

    it('should be defined', function() {
        expect(backendService).toBeDefined();
        expect(backendService.hostname).toBe("http://www.example.com");
    });

    it('should have a get method that returns a promise', function() {
        var passed = false;
        $httpBackend.expectGET("http://www.example.com/url").respond(200, fieldWorkersResponse());

        backendService.get("/url").then(function() {
            passed = true;
        });

        $httpBackend.flush();
        expect(passed).toBe(true);
    })
});