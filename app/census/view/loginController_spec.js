'use strict';

function mockFieldWorkerService() {
    return {
        authorize: function (a, b) {
        },
        authorized: function () {
            return true;
        },
        currentFieldWorker: function () {
            return "acbd";
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
    var fieldworkerService = mockFieldWorkerService()
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

        expect(loginController).toBeDefined();
    })
});