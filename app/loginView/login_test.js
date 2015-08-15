'use strict';

describe('openHDS.login module', function() {

    var loginController;
    var scope = {};
    var $location, $route, $rootScope;

    describe('Login Controller', function() {
        beforeEach(module('openHDS.login'));

        beforeEach(inject(function(_$location_, _$route_, _$rootScope_){
            $location = _$location_;
            $route = _$route_;
            $rootScope = _$rootScope_;
        }));

        beforeEach(inject(function($controller, $http, $injector) {
            loginController = $controller('LoginController', {
                $scope: scope,
                $http: $http,
                $userService: $injector.get('userService')
            });
        }));

        //// We need to setup a mock backend to handle the fetching of templates from the 'templateUrl'.
        //beforeEach(inject(function($httpBackend){
        //    $httpBackend.expectGET('locationView/location-form.html').respond(200, 'main HTML');
        //}));

        it('login() sets username, password and server', function() {
            expect(loginController.user.username).toBeNull();
            expect(loginController.user.password).toBeNull();
            expect(loginController.user.server).toBeNull();
            loginController.login('user', 'password', 'https://www.example.com');

            expect(loginController.user.username).toEqual("user");
        });
    });
});