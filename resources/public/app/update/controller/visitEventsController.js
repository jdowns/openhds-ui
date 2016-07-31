angular.module('openHDS.view')
    .controller('VisitEventsController',
        ['BackendService', 'AppState', '$location', VisitEventsController]);

function VisitEventsController(BackendService, AppState, $location) {
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