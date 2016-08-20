angular.module('openHDS.view')
    .controller('VisitEventsController',
                ['AppState', '$location', '$http', '$log',
                 VisitEventsController]);

function VisitEventsController(AppState, $location, $http, $log) {
    var vm = this;
    if (!AppState.user) {
        $location.url('/');
        return vm;
    }

    vm.currentVisit = AppState.currentVisit.visitId;
    vm.currentLocation = AppState.currentVisit.locationId;
    vm.collectedByUuid = AppState.user.userId;
    vm.loadData = loadData;
    vm.outMigration = outMigration;
    vm.pregnancyObservation = pregnancyObservation;
    vm.pregnancyOutcome = pregnancyOutcome;
    vm.death = death;

    AppState.currentVisit.individualsPromise.then(
        function(response) { // TODO: This might have a bug and not terminate
            vm.individuals = response.data;
            vm.currentIndividual = vm.individuals.pop();
            console.log("got current individuals");
            AppState.currentVisit.individuals = vm.individuals;
            AppState.currentVisit.currentIndividual = vm.currentIndividual;
        },
        function(response) {
            console.log("Failed to get individuals: " + response.status);
        }

    );

    function loadData() {
        console.log("loading data for visit events controller");
        $http.get("/api/individual/" + vm.currentLocation).then
        (function(response) {
            vm.individuals = response.data;
        },
         function(response) {
             console.log("unable to get individuals at " + vm.currentLocation
                         + ". Response was " + response.status);
         });
    }

    function outMigration() {
        console.log("clicked out migration..." + vm.outMigration);
    }

    function pregnancyObservation() {
        console.log("clicked pregnancy observation");
    }

    function pregnancyOutcome() {
        console.log("clicked pregnancy outcome");
    }

    function death() {
        console.log("clicked death");
    }
    //fetch individuals at this location
    //add event for each individual
    //when done with individual, return to this page
    //show recorded events for each individual
}
