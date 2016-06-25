function withMockPromiseResolved(theSpy, responseData, f, q, rootScope) {
    var deferred = q.defer();
    var httpPromise = deferred.promise;
    deferred.resolve(responseData);
    theSpy.and.returnValue(httpPromise);
    f();
    rootScope.$apply();
}

function withMockPromiseRejected(theSpy, responseData, f, q, rootScope) {
    var deferred = q.defer();
    var httpPromise = deferred.promise;
    deferred.reject(responseData);
    theSpy.and.returnValue(httpPromise);
    f();
    rootScope.$apply();
}