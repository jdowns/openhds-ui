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
        withBackendPromise(BackendService, function() {
            FieldWorkerService.authorize('username', 'password');
        });

        expect(BackendService.get).toHaveBeenCalled();
        expect(FieldWorkerService.authorized()).toBe(true);
    }));
});

function withBackendPromise(backend, f) {
    var deferred = q.defer();
    var httpPromise = deferred.promise;
    deferred.resolve("Truthy");
    spyOn(backend, 'get').and.returnValue(httpPromise);
    f();
    rootScope.$apply();
}