'use strict';

angular.module('openHDS.core').factory('AppState', AppState);

AppState.$inject = [];

function AppState() {
    console.log("Init app state");
    var vm = this;
    return vm;
}