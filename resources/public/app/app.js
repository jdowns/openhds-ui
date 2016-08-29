'use strict';
console.log("Starting application");

angular.module('openHDS.core', ['ngRoute'])
    .config(['$httpProvider', corsConfig])
    .config(['$routeProvider', routeConfig]);

angular.module('openHDS.model', ['openHDS.core'])
    .config(['$httpProvider', corsConfig]);

angular.module('openHDS.view', ['openHDS.core', 'openHDS.model'])
    .config(['$httpProvider', corsConfig]);

function routeConfig($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'auth/view/login.html',
            controller: 'LoginController',
            controllerAs: 'model'
        })
        .when('/location/new', {
            templateUrl: 'census/view/create-location.html',
            controller: 'LocationController',
            controllerAs: 'model'
        })
        .when('/socialGroup/new', {
            templateUrl: 'census/view/create-socialgroup.html',
            controller: 'SocialGroupController',
            controllerAs: 'model'
        })
        .when('/individual/new', {
            templateUrl: 'census/view/create-individual.html',
            controller: 'IndividualController',
            controllerAs: 'model'
        })
        .when('/membership/new', {
            templateUrl: 'census/view/create-membership.html',
            controller: 'MembershipController',
            controllerAs: 'model'
        })
        .when('/relationship/new', {
            templateUrl: 'census/view/create-relationship.html',
            controller: 'RelationshipController',
            controllerAs: 'model'
        })
        .when('/residency/new', {
            templateUrl: 'census/view/create-residency.html',
            controller: 'ResidencyController',
            controllerAs: 'model'
        })
        .when('/visit/new', {
            templateUrl: 'update/view/create-visit.html',
            controller: 'VisitController',
            controllerAs: 'model'
        })
        .when('/visit', {
            templateUrl: 'update/view/handle-visit.html',
            controller: 'VisitEventsController',
            controllerAs: 'model'
        })
        .when('/visit/inMigration', {
            templateUrl: 'update/view/create-inMigration.html',
            controller: 'InMigrationController',
            controllerAs: 'model'
        })
        .when('/visit/outMigration', {
            templateUrl: 'update/view/create-outMigration.html',
            controller: 'OutMigrationController',
            controllerAs: 'model'
        })
        .when('/visit/death', {
            templateUrl: 'update/view/create-death.html',
            controller: 'DeathController',
            controllerAs: 'model'
        })
        .when('/visit/pregnancyObservation', {
            templateUrl: 'update/view/create-pregnancyObservation.html',
            controller: 'PregnancyObservationController',
            controllerAs: 'model'
        })
        .when('/visit/pregnancyResult', {
            templateUrl: 'update/view/create-pregnancyResult.html',
            controller: 'PregnancyResultController',
            controllerAs: 'model'
        })
        .when('/visit/pregnancyOutcome', {
            templateUrl: 'update/view/create-pregnancyOutcome.html',
            controller: 'PregnancyOutcomeController',
            controllerAs: 'model'
        })
        .when('/locationHierarchyLevel/new', {
            templateUrl: 'study/view/create-locationHierarchyLevel.html',
            controller: 'LocationHierarchyLevelController',
            controllerAs: 'model'
        })

        .when('/locationHierarchy/new', {
            templateUrl: 'study/view/create-locationHierarchy.html',
            controller: 'LocationHierarchyController',
            controllerAs: 'model'
        })
        .when('/projectCode/new', {
            templateUrl: 'study/view/create-projectCode.html',
            controller: 'ProjectCodeController',
            controllerAs: 'model'
        })
        .when('/fieldworkerHome', {
            templateUrl: 'core/fieldworkerHome.html'
        })
        .when('/supervisorHome', {
            templateUrl: 'core/supervisorHome.html'
        })
        .when('/user/new', {
            templateUrl: 'census/view/create-user.html',
            controller: 'UserController',
            controllerAs: 'model'
        })
        .when('/fieldworker/new', {
            templateUrl: 'census/view/create-fieldworker.html',
            controller: 'FieldWorkerController',
            controllerAs: 'model'
        })
        .when('/audit', {
            templateUrl: 'audit/view/entity-audit.html',
            controller: 'EntityAuditController',
            controllerAs: 'model'
        })
        .otherwise({redirectTo: '/'});
}

function corsConfig($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.Authorization = 'Basic dXNlcjpwYXNzd29yZA==';
    $httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
