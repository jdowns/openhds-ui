'use strict';

describe('openHDS.dashboard module', function() {

    var loginController;
    var scope = {};
    var $location, $route, $rootScope;

    describe('Dashboard Controller', function() {
        beforeEach(module('openHDS.dashboard'));

        beforeEach(inject(function(_$location_, _$route_, _$rootScope_){
            $location = _$location_;
            $route = _$route_;
            $rootScope = _$rootScope_;
        }));

        beforeEach(inject(function($controller, $http, $injector) {
            loginController = $controller('Dashboard', {
                $scope: scope,
                $http: $http,
                $userService: $injector.get('userService')
            });
        }));

    });
});