'use strict';

/* jasmine specs for controllers go here */
describe('OpenHDS controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('openhdsApp'));

  describe('AppCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('/').
          respond('Hello, World!');

      scope = $rootScope.$new();
      ctrl = $controller('AppCtrl', {$scope: scope});
    }));


    it('True should be true', function() {
        expect(true).toBe(true);
    });

  });
});
