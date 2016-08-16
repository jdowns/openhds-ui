angular.module('openHDS.view')
    .controller('VisitEventsController',
                ['AppState', '$location', '$http', VisitEventsController]);

function VisitEventsController(AppState, $location, $http) {
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
        function(response) {
            vm.individuals = response.data;
            vm.currentIndividual = vm.individuals.pop();
        },
        function(response) {
            console.log("Failed to get individuals: " + response.status);
        }

    );

    function loadData() {
        $http.get("/api/individual/").then
        (function() {

        },
         function() {

         });
    }

    function outMigration() {
        console.log("clicked out migration...");
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
