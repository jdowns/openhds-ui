'use strict';

function capitalize(str) {
    return str && str[0].toUpperCase() + str.slice(1);
}

var apiDescription = {
    create: 'POST /',
    get: 'GET /',
    getOne: 'GET /{id}',
    getAll: 'GET /all',
    getAllFiltered: 'GET /byLocation{?filters}',
    getVoided: 'GET /voided',
    delete: 'DELETE /{id}'
};

function buildClient(baseUrl) {
    return feign.builder()
        .client(new FeignRequest())
        .target(apiDescription, baseUrl);
}

var services = [
    'death',
    'individual',
    'inMigration',
    'locationHierarchy',
    'locationHierarchyLevel',
    'membership',
    'outMigration',
    'pregnancyObservation',
    'pregnancyOutcome',
    'pregnancyResult',
    'projectCode',
    'relationship',
    'residency',
    'socialGroup',
    'user',
    'visit'
];

services.forEach(function buildService(name) {
    angular.module('openHDS.core').factory(capitalize(name) + 'Client',
        function() {
            return buildClient('/' + name)
        })});
