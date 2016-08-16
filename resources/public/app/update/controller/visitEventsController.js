angular.module('openHDS.view')
    .controller('VisitEventsController',
                ['AppState', '$location', '$http', VisitEventsController]);

function VisitEventsController(AppState, $location, $http) {
    var vm = this;
    if (!AppState.user) {
        $location.url('/');
        return vm;
    }

    //fetch individuals at this location
    //add event for each individual
    //when done with individual, return to this page
    //show recorded events for each individual
}
