'use strict';

angular.module('UpdateModule', [])
    .controller('UpdateController',
                ['$rootScope',
                    UpdateController ]);


function UpdateController($rootScope) {

    var vm = this;

    vm.selectedIndividual = null;
    vm.submittedEvents = [];


    vm.currentInMigration = null;

}
