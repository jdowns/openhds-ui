'use strict';

angular.module('openHDS.core').factory('Census', Census);

Census.$inject = ['$http'];

function Census($http) {
    var census = this; // avoid js 'this' mischief
    var state = 0;
    census.request = {};

    census.setFieldworker = function(fieldworkerId) {
        census.request.fieldworker = fieldworkerId;
        return transition();
    };
    census.setLocation = function(location) {
        census.request.location = location;
        return transition();
    };
    /*
    census.setCollectionTime = function() {
        census.request.collectionTime = new Date();
    };
    */
    census.setSocialGroup = function(socialGroup) {
        census.request.socialGroup = socialGroup;
        return transition();
    };
    census.addIndividual = function(individual) {
        if (census.request.individuals == null) {
            census.request.individuals = [];
        }
        census.request.individuals.push(individual);
        return transition();
    };
    census.addRelationship = function(relationship) {
        if (census.request.relationships == null) {
            census.request.relationships = [];
        }
        census.request.relationships.push(relationship);
        return transition();
    };


    /** Transition to next state if valid.
     *  Otherwise return errors.
     */
    function transition() {
        var states = [0, 1, 2, 3, 4, 5];
        // name states
        // validate current state
        // transition if correct
        //    update location
        //    submit requests
        //    return new state marker
        state = state + 1;
        return states[state];
    }
}
