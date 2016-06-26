angular.module('openHDS.view')
    .controller('VisitEventsController',
        ['BackendService', 'AppState', '$location', VisitController]);

function VisitEventsController(BackendService, AppState, $location) {
    var vm = this;
    if (!AppState.user) {
        $location.url('/');
        return vm;
    }
}