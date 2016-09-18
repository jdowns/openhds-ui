"use strict";

var provide, q, rootScope;

describe('LoginController', function() {

    var $controller;
    var controller;

    var AppStateMock;
    var $locationMock;
    var $httpBackend;

    beforeEach(module('openHDS.view'));

    beforeEach(inject(function($q, $rootScope, _$controller_, _$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $controller = _$controller_;
        q = $q;
        rootScope = $rootScope;

        AppStateMock = {};
        $locationMock = jasmine.createSpyObj('$location', ['url']);

        controller = $controller('LoginController',
            {
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

            $httpBackend.expectPUT("/api/fieldworker", {username:"validFieldworker",
                                                        password:"validPassword",
                                                        isSupervisor:false
                                                       }).respond("123-uuid");

            controller.username = "validFieldworker";
            controller.password = "validPassword";
            controller.isSupervisor = false;
            controller.login(true);
            $httpBackend.flush();

            expect(AppStateMock.user).toEqual({isSupervisor: false, userId: "123-uuid"});
            expect($locationMock.url).toHaveBeenCalledWith("/fieldworkerHome");
        });

        it('valid supervisor credentials authorizes user and updates location to supervisor home', function() {

            $httpBackend.expectPUT("/api/user", {username:"validSupervisor",
                                                 password:"validPassword",
                                                 isSupervisor:true
                                                }).respond("123-uuid");

            controller.username = "validSupervisor";
            controller.password = "validPassword";
            controller.isSupervisor = true;
            controller.login(true);
            $httpBackend.flush();

            expect(AppStateMock.user).toEqual({isSupervisor: true, userId: "123-uuid"});
            expect($locationMock.url).toHaveBeenCalledWith("/supervisorHome");
        });

        it('invalid credentials does not authorize', function() {
            $httpBackend.expectPUT("/api/user",
                                   {username:"invalidSupervisor",
                                    password:"invalidPassword",
                                    isSupervisor:true}).respond(401, '');

            controller.username = "invalidSupervisor";
            controller.password = "invalidPassword";
            controller.isSupervisor = true;

            controller.login(true);
            $httpBackend.flush();

            expect(AppStateMock.user).toEqual({});
            expect($locationMock.url.calls.count()).toEqual(0);
        });

    });
});
