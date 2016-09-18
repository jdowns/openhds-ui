angular.module('openHDS.view')
    .controller('VisitEventsController',
                ['AppState', '$location', '$http', '$log',
                 VisitEventsController]);

function VisitEventsController(AppState, $location, $http, $log) {
    var vm = this;

    AppState.validateUser();

    vm.updateEvents = {
        death: false,
        outMigration: false,
        pregnancyObservation: false,
        pregnancyOutcome: false
    };

    vm.loadData = function() {
        vm.collectedByUuid = AppState.user.userId;
        vm.currentVisit = AppState.currentVisit.visitId;
        vm.currentLocation = AppState.currentVisit.locationId;
        vm.currentIndividual = AppState.currentVisit.individuals.shift();

        if (!vm.currentIndividual) {
            $location.url('/visit/new');
        }

        AppState.currentVisit.activeIndividual = {
            uuid: vm.currentIndividual,
            updates: []
        };
    };

    vm.create = function() {
        if (vm.updateEvents.outMigration) {
            AppState.currentVisit.activeIndividual.updates.push('outMigration');
        }
        if (vm.updateEvents.death) {
            AppState.currentVisit.activeIndividual.updates.push('death');
        }
        if (vm.updateEvents.pregnancyObservation) {
            AppState.currentVisit.activeIndividual.updates.push('pregnancyObservation');
        }
        if (vm.updateEvents.pregnancyOutcome) {
            AppState.currentVisit.activeIndividual.updates.push('pregnancyOutcome');
        }

        AppState.handleNextUpdate();
    };

    return vm;

}
