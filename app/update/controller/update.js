'use strict';

angular.module('UpdateModule', [])
    .controller('UpdateController',
                ['$rootScope',
                    UpdateController ]);


function UpdateController($rootScope) {

    var vm = this;

    vm.selectedLocation = null;
    vm.selectedIndividual = null;
    vm.submittedEvents = [];


    vm.currentInMigration = null;
    vm.currentOutMigration = null;
    vm.currentDeath = null;
    vm.currentPregnancyObservation = null;
    vm.currentPregnancyOutcome = null;

    vm.submitInMigration = function(){
        // post logic
        // add to submitted events []
        vm.currentInMigration = null;
    };

    vm.submitOutMigration = function(){
        // post logic
        // add to submitted events []
        vm.currentOutMigration = null;
    };

    vm.submitDeath = function(){
        // post logic
        // add to submitted events []
        vm.currentDeath = null;
    };

    vm.submitPregnancyObservation = function(){
        // post logic
        // add to submitted events []
        vm.currentPregnancyObservation = null;
    };

    vm.submitPregnancyOutcome = function(){
        // post logic
        // add to submitted events []
        vm.currentPregnancyOutcome = null;
    };


    vm.finishVisit = function(){
        vm.submittedEvents = [];
        vm.selectedLocation = null;
        vm.selectedIndividual = null;
    };

}
