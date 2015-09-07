angular.module('openHDS.core').factory('NavigationService', Navigation);

Navigation.$inject = ['$location'];

function Navigation ($location) {
    var vm = this;
    this.startCensus = function() {
        $location.path('/census');
    };
    this.startNewLocation = function() {
        $location.path('/location/new');
    };
    this.startNewIndividual = function() {
        $location.path('/individual/new');
    };

    this.returnToDashboard = function() {
        $location.path('/home');
    };
    return vm;
}