angular.module('openHDS.navigation', []).factory('NavigationService', ['$location', function($location) {
    function Navigation () {
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
    }

    return Navigation;
}]);