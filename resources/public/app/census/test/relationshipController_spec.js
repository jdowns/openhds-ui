"use strict";
describe('RelationshipController', function () {
    var $controller;
    var controller;

    var AppStateMock;
    var $locationMock;
    var $httpBackend;

    beforeEach(module('openHDS.view'));

    beforeEach(inject(function ($q, $rootScope, _$controller_, _$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $controller = _$controller_;
        q = $q;
        rootScope = $rootScope;

        AppStateMock = {
            user: {isSupervisor: true, userId: 123},
            individual: ['A', 'B', 'C'],
            relationshipTypeCodes: ['a', 'b', 'c']
        };


        $locationMock = jasmine.createSpyObj('$location', ['url']);

        controller = $controller('RelationshipController',
            {
                AppState: AppStateMock,
                $location: $locationMock
            });
    }));

    describe('RelationshipController', function () {

        it('submits relationship between head of household and first individual', function () {
            $httpBackend.expectPOST("/api/relationship",
                                    {individualA:"A",
                                     individualB:"C",
                                     relationshipType:"a",
                                     startDate:"2000-01-01",
                                     collectionDateTime: controller.date,
                                     collectedByUuid: 123}).respond(123);
            controller.relationshipType = 'a';
            controller.startDate = '2000-01-01';

            expect(controller.headOfHousehold).toEqual('A');
            expect(controller.individuals).toEqual(['B']);

            controller.create(true);
            $httpBackend.flush();

            expect($locationMock.url.calls.count()).toEqual(0);

            expect(controller.individualB).toEqual('C');
        });

        it('submits relationship between head of household and last individual', function () {
            $httpBackend.expectPOST("/api/relationship",
                                    {individualA:"A",
                                     individualB:"C",
                                     relationshipType:"a",
                                     startDate:"2000-01-01",
                                     collectionDateTime: controller.date,
                                     collectedByUuid: 123}).respond('123');
            controller.relationshipType = 'a';
            controller.startDate = '2000-01-01';

            expect(controller.headOfHousehold).toEqual('A');
            expect(controller.individuals).toEqual(['B']);

            controller.create(true);
            $httpBackend.flush();


            expect($locationMock.url.calls.count()).toEqual(0);

            $httpBackend.expectPOST("/api/relationship",
                                    {individualA:"A",
                                     individualB:"B",
                                     relationshipType:"a",
                                     startDate:"2000-01-01",
                                     collectionDateTime: controller.date,
                                     collectedByUuid: 123}).respond('456');

            controller.create(true);
            $httpBackend.flush();



            expect(controller.individualB).toEqual('B');

            expect(controller.individuals).toEqual([]);
            expect($locationMock.url).toHaveBeenCalledWith("/fieldworkerHome");
        });

    });
});
