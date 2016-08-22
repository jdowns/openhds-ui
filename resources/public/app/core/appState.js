'use strict';

angular.module('openHDS.core').factory('AppState', AppState);

AppState.$inject = ['$http', '$location'];

/* This is a service to hold the global application state between controllers */
function AppState($http, $location) {
    console.log("Init app state");

    var appState = this;

    appState.handleNextUpdate = function() {
        console.log(appState.currentVisit);
        var nextUpdate = appState.currentVisit.activeIndividual.updates.pop();

        console.log(nextUpdate);
        if (nextUpdate == undefined || nextUpdate == null) {
            $location.url('/visit');
            return;
        }
        if (nextUpdate === 'outMigration') {
            $location.url('/visit/outMigration');
        } else if (nextUpdate === 'death') {
            $location.url('/visit/death');
        } else if (nextUpdate === 'pregnancyObservation') {
            $location.url('/visit/pregnancyObservation');
        } else if (nextUpdate === 'pregnancyOutcome') {
            $location.url('/visit/pregnancyOutcome');
        } else {
            console.log('invalid event: ' + nextUpdate);
            appState.handleNextUpdate();
        }
    };

    appState.validateUser = function() {
        if (!appState.user) {
            $location.url('/');
            return false;
        }
        return true;
    };

    return appState;
}
