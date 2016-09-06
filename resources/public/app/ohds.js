(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

require('./core/componentDirectives.js');
require('./auth/controller/loginController.js');
require('./core/appState.js');

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

},{"./auth/controller/loginController.js":2,"./core/appState.js":3,"./core/componentDirectives.js":4}],2:[function(require,module,exports){
angular.module('openHDS.view')
    .controller('LoginController',
        ['AppState', '$location', '$http', LoginController]);

function LoginController(AppState, $location, $http) {
    var vm = this;
    vm.isSupervisor = false;
    vm.loginPending = false;
    vm.login = login;

    function handleLogin(response) {
        AppState.user = {
            isSupervisor: response.config.data.isSupervisor,
            userId: response.data
        };
        AppState.errors = {};
        if(AppState.user.isSupervisor) {
            $location.url('/supervisorHome');
        } else {
            $location.url('/fieldworkerHome');
        }
    }

    function handleLoginError(response) {
        vm.username = null;
        vm.password = null;
        AppState.user = {};
        AppState.errors = ["Invalid Credentials."];
    }

    function login(formValid) {
        if (formValid) {
            var body = {
                username: vm.username,
                password: vm.password,
                isSupervisor: vm.isSupervisor
            };

            var url = "/api/fieldworker";
            if (vm.isSupervisor) {
                url = "/api/user";
            }

            $http.put(url, body).then(handleLogin, handleLoginError);
        }
    }

}

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
angular.module('openHDS.view')
    .directive('textbox', textbox)
    .directive('passwordbox', passwordbox)
    .directive('datebox', datebox)
    .directive('constbox', constbox)
    .directive('checkbox', checkbox)
    .directive('submitbutton', submitbutton)
    .directive('selectbox', selectbox);

function textbox() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            label: '@',
            id: '@',
            modelKey: "=ngModel"
        },
        template: '<div class="form-group">' +
                  '<label class="col-md-4 control-label" for="{{id}}">{{label}}</label>' +
                  '<div class="col-md-4">' +
                  '<input required type="text" id="{{id}}_input" name="{{id}}" ng-model="modelKey" class="form-control input-md"/>' +
                  '</div>' +
                  '</div>'
    };
}

function constbox() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            label: '@',
            id: '@',
            modelKey: "=ngModel"
        },
        template: '<div class="form-group">' +
        '<label class="col-md-4 control-label" for="{{id}}">{{label}}</label>' +
        '<div class="col-md-4">' +
        '<input ng-readonly="true" type="text" id="{{id}}" name="{{id}}" ng-model="modelKey" class="form-control input-md"/>' +
        '</div>' +
        '</div>'
    };
}

function checkbox() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            label: '@',
            id: '@',
            modelKey: "=ngModel"
        },
        template: '<div class="form-group">' +
        '<label class="col-md-4 control-label" for="{{id}}">{{label}}</label>' +
        '<div class="col-md-4">' +
        '<input type="checkbox" id="{{id}}_check" name="{{id}}" ng-model="modelKey" class="form-control input-md"/>' +
        '</div>' +
        '</div>'
    };
}

function passwordbox() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            label: '@',
            id: '@',
            modelKey: "=ngModel"
        },
        template: '<div class="form-group">' +
        '<label class="col-md-4 control-label" for="{{id}}">{{label}}</label>' +
        '<div class="col-md-4">' +
        '<input required type="password" id="{{id}}_input" name="{{id}}" ng-model="modelKey" class="form-control input-md"/>' +
        '</div>' +
        '</div>'
    };
}

function datebox() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            label: '@',
            id: '@',
            modelKey: "=ngModel"
        },
        template: '<div class="form-group">' +
        '<label class="col-md-4 control-label" for="{{id}}">{{label}}</label>' +
        '<div class="col-md-4">' +
        '<input required type="date" id="{{id}}_input" name="{{id}}" ng-model="modelKey" class="form-control input-md"/>' +
        '</div>' +
        '</div>'
    };
}

function selectbox() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            label: '@',
            id: '@',
            modelKey: '=ngModel'
        },
        template: '<div class="form-group">' +
                  '<label class="col-md-4 control-label" for="{{id}}">{{label}}</label>' +
                  '<div class="col-md-4">' +
                  '<select required ng-transclude id="{{id}}_select" ng-model=modelKey ng-required="true" class="form-control">' +

                  '</select>' +
                  '</div>' +
                  '</div>'
    };
}

function submitbutton() {
    return {
            restrict: 'E',
            replace: true,
            scope: {
            },
            template: '<div class="form-group">' +
            '<label class="col-md-4 control-label" for="createButton"></label>' +
            '<div class="col-md-4">' +
            '<input type="submit" class="btn btn-success form-control" id="createButton" />' +
            '</div>' +
            '</div>'
    };
}

},{}]},{},[1]);
