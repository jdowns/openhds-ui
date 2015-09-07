'use strict';

function mockFieldWorkerService() {
    var fieldWorker;
    return {
        authorize: function (a, b) {
            fieldWorker = "abcd"
        },
        authorized: function () {
            return true;
        },
        currentFieldWorker: function () {
            return fieldWorker;
        }
    };
}

function MockBackendService() {
    var vm = this;
    vm.hostname = "http://www.example.com";
}

describe("Login Controller", function() {
    var loginController;
    var backendService = new MockBackendService();
    var fieldworkerService = mockFieldWorkerService();

    beforeEach(module('openHDS.view'));

    beforeEach(inject(function($controller) {
        loginController = $controller('LoginController', {
            $scope: {},
            FieldWorkerService: fieldworkerService,
            BackendService: backendService
        })
    }));

    it('login should set current fieldworker and server', function() {
        loginController.username = "fieldworker";
        loginController.password = "password";
        loginController.server = "http://www.example.org";

        loginController.login();

        expect(backendService.hostname).toEqual('http://www.example.org');
        expect(fieldworkerService.currentFieldWorker()).toEqual('abcd');
    });
});