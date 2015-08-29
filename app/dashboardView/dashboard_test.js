'use strict';

describe('openHDS.dashboard module', function() {

    var dashboardController;
    var scope = {};
    var $location, $route, $rootScope;

    describe('Dashboard Controller', function() {
        beforeEach(module('openHDS.login'));
        beforeEach(module('openHDS.user'))

        beforeEach(inject(function(_$location_, _$route_, _$rootScope_){
            $location = _$location_;
            $route = _$route_;
            $rootScope = _$rootScope_;
        }));

        beforeEach(inject(function($controller, $http, _userService_) {
            dashboardController = $controller('DashboardController', {
                $scope: scope,
                $http: $http,
                userService: _userService_
            });
        }));

        it('User service should be defined', function() {
            expect(dashboardController).toBeDefined();
            expect(scope.userService).toBeDefined();
            expect(scope.userService.fieldWorkerID).toBe("fieldWorker");
        })

    });
});