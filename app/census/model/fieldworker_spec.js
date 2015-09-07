'use strict';
var provide, q, rootScope;
describe('Fieldworker Service', function() {
    var fieldWorkerService;


    beforeEach(module('openHDS.core'));
    beforeEach(module('openHDS.model'));


    beforeEach(module(function ($provide) {
        provide = $provide;
        $provide.value('ModelService',{});
    }));

    beforeEach(inject(function($q, $rootScope) {
        q = $q;
        rootScope = $rootScope
    }));


    it('should authorize a valid user', inject(function(FieldWorkerService, BackendService, ModelService) {
        withBackendPromiseGet(BackendService, function() {
            FieldWorkerService.authorize('fieldworker', 'password');
        });

        expect(BackendService.get).toHaveBeenCalledWith("/fieldWorkers/bulk.json");
        expect(FieldWorkerService.authorized()).toBe(true);
        expect(ModelService.currentFieldWorker).toBe("ef1ffbc2-8cfb-4a73-a222-f9581c83cc86");
    }));
});

function withBackendPromiseGet(backend, f) {
    var deferred = q.defer();
    var httpPromise = deferred.promise;
    var responseData = [
        {
            "uuid": "ef1ffbc2-8cfb-4a73-a222-f9581c83cc86",
            "insertBy": {
                "uuid": "UNKNOWN"
            },
            "insertDate": "2015-09-06T19:05:05.172Z[UTC]",
            "lastModifiedBy": {
                "uuid": "UNKNOWN"
            },
            "lastModifiedDate": "2015-09-06T19:05:05.172Z[UTC]",
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
            "insertDate": "2015-09-06T19:05:05.180Z[UTC]",
            "lastModifiedBy": {
                "uuid": "UNKNOWN"
            },
            "lastModifiedDate": "2015-09-06T19:05:05.180Z[UTC]",
            "fieldWorkerId": "UNKNOWN_NAME",
            "passwordHash": "UNKNOWN_NAME"
        }
    ]
    deferred.resolve({data: responseData});
    spyOn(backend, 'get').and.returnValue(httpPromise);
    f();
    rootScope.$apply();
}