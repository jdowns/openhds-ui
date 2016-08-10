"use strict";

var provide, q, rootScope;

describe('LoginController', function() {

    var $controller;
    var controller;

    var BackendServiceMock;
    var AppStateMock;
    var $locationMock;

    beforeEach(module('openHDS.view'));

    beforeEach(inject(function($q, $rootScope, _$controller_) {
        $controller = _$controller_;
        q = $q;
        rootScope = $rootScope;

        BackendServiceMock = jasmine.createSpyObj('BackendService', ['post']);
        AppStateMock = {};
        $locationMock = jasmine.createSpyObj('$location', ['url']);

        controller = $controller('LoginController',
            {   BackendService: BackendServiceMock,
                AppState: AppStateMock,
                $location: $locationMock
            });
    }));

    describe('LoginController', function() {
        
        it('invalid form will not submit', function() {
            controller.login(false);
            expect(controller.loginPending).toEqual(false);
        });

        it('valid fieldworker credentials authorizes user and updates location to fieldworker home', function() {

            var expectedResponse = {
                data: 123,
                config: {data: {isSupervisor: false}}
            };
            controller.username = "validFieldworker";
            controller.password = "validPassword";
            controller.isSupervisor = false;
            //noinspection JSUnresolvedFunction
            withMockPromiseResolved(BackendServiceMock.post, expectedResponse, function() {
                controller.login(true);
            }, q, rootScope);
            expect(AppStateMock.user).toEqual({isSupervisor: false, userId: 123});
            expect($locationMock.url).toHaveBeenCalledWith("/fieldworkerHome");
            expect(BackendServiceMock.post).toHaveBeenCalledWith("/login", {username: controller.username, password: controller.password, isSupervisor: controller.isSupervisor});
        });

        it('valid supervisor credentials authorizes user and updates location to supervisor home', function() {

            var expectedResponse = {
                data: 123,
                config: {data: {isSupervisor: true}}
            };
            controller.username = "validSupervisor";
            controller.password = "validPassword";
            controller.isSupervisor = true;
            //noinspection JSUnresolvedFunction
            withMockPromiseResolved(BackendServiceMock.post, expectedResponse, function() {
                controller.login(true);
            }, q, rootScope);
            expect(AppStateMock.user).toEqual({isSupervisor: true, userId: 123});
            expect($locationMock.url).toHaveBeenCalledWith("/supervisorHome");
            expect(BackendServiceMock.post).toHaveBeenCalledWith("/login", {username: controller.username, password: controller.password, isSupervisor: controller.isSupervisor});
        });

        it('invalid credentials does not authorize', function() {

            var expectedResponse = {
                data: 123,
                config: {data: {isSupervisor: true}}
            };
            controller.username = "invalidSupervisor";
            controller.password = "invalidPassword";
            controller.isSupervisor = true;
            //noinspection JSUnresolvedFunction
            withMockPromiseRejected(BackendServiceMock.post, expectedResponse, function() {
                controller.login(true);
            }, q, rootScope);
            expect(AppStateMock.user).toEqual({});
            expect($locationMock.url.calls.count()).toEqual(0);
            expect(BackendServiceMock.post).toHaveBeenCalledWith("/login", {username: "invalidSupervisor", password: "invalidPassword", isSupervisor: true});
        });

    });
});

