"use strict";
describe('RelationshipController', function () {
    var $controller;
    var controller;

    var BackendServiceMock;
    var AppStateMock;
    var $locationMock;

    beforeEach(module('openHDS.view'));

    beforeEach(inject(function ($q, $rootScope, _$controller_) {
        $controller = _$controller_;
        q = $q;
        rootScope = $rootScope;

        BackendServiceMock = jasmine.createSpyObj('BackendService', ['get', 'post']);
        AppStateMock = {
            user: {isSupervisor: true, userId: 123},
            individuals: ['A', 'B', 'C'],
            relationshipTypeCodes: ['a', 'b', 'c'],
            loadData: function () {
            }
        };

        spyOn(AppStateMock, 'loadData');

        $locationMock = jasmine.createSpyObj('$location', ['url']);

        controller = $controller('RelationshipController',
            {
                BackendService: BackendServiceMock,
                AppState: AppStateMock,
                $location: $locationMock
            });
    }));

    describe('RelationshipController', function () {
/*
        it('submits relationship between head of household and first individual', function () {
            var expectedResponse = {};
            controller.relationshipType = 'a';
            controller.startDate = '2000-01-01';

            expect(controller.headOfHousehold).toEqual('A');
            expect(controller.individuals).toEqual(['B']);
            withMockPromiseResolved(BackendServiceMock.post, expectedResponse, function () {
                controller.create(true);
            }, q, rootScope);
            expect($locationMock.url.calls.count()).toEqual(0);

            expect(BackendServiceMock.post).toHaveBeenCalledWith("/relationship",
                {
                    relationship: {
                        individualA: 'A',
                        individualB: 'C',
                        relationshipType: 'a',
                        startDate: '2000-01-01',
                        collectionDateTime: controller.date
                    },
                    collectedByUuid: 123
                });
            expect(controller.individualB).toEqual('B');
        });

        it('submits relationship between head of household and last individual', function () {
            var expectedResponse = {};
            controller.relationshipType = 'a';
            controller.startDate = '2000-01-01';

            expect(controller.headOfHousehold).toEqual('A');
            withMockPromiseResolved(BackendServiceMock.post, expectedResponse, function () {
                controller.create(true);
            }, q, rootScope);
            withMockPromiseResolved(BackendServiceMock.post, expectedResponse, function () {
                controller.create(true);
            }, q, rootScope);
            expect(BackendServiceMock.post).toHaveBeenCalledWith("/relationship",
                {
                    relationship: {
                        individualA: 'A',
                        individualB: 'B',
                        relationshipType: 'a',
                        startDate: '2000-01-01',
                        collectionDateTime: controller.date
                    },
                    collectedByUuid: 123
                });
            expect(controller.individuals).toEqual([]);
            expect($locationMock.url).toHaveBeenCalledWith("/fieldworkerHome");
        });
*/
    });
});
