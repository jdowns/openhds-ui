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
    });

    it('should have a post method that returns a promise', function() {
        var passed = false;
        $httpBackend.expectPOST("http://www.example.com/url", {}).respond(200, fieldWorkersResponse());

        backendService.post("/url", {}).then(function() {
            passed = true;
        });

        $httpBackend.flush();
        expect(passed).toBe(true);
    })
});

function fieldWorkersResponse() {
    return [
        {
            "uuid": "76bb5548-d6c9-4e84-a89b-7263144eae34",
            "insertBy": {
                "uuid": "UNKNOWN"
            },
            "insertDate": "2015-08-30T00:09:15.636Z[UTC]",
            "lastModifiedBy": {
                "uuid": "UNKNOWN"
            },
            "lastModifiedDate": "2015-08-30T00:09:15.636Z[UTC]",
            "fieldWorkerId": "fieldworker",
            "firstName": "default fieldworker",
            "lastName": "default fieldworker",
            "passwordHash": "password"
        },
        {
            "uuid": "UNKNOWN",
            "insertBy": {
                "uuid": "UNKNOWN"
            },
            "insertDate": "2015-08-30T00:09:15.644Z[UTC]",
            "lastModifiedBy": {
                "uuid": "UNKNOWN"
            },
            "lastModifiedDate": "2015-08-30T00:09:15.644Z[UTC]",
            "fieldWorkerId": "UNKNOWN_NAME",
            "passwordHash": "UNKNOWN_NAME"
        }
    ];
}