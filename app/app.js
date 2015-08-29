'use strict';

angular.module('openHDS', [
    'ngRoute',
    'openHDS.login',
    'openHDS.location',
    'openHDS.individual',
    'openHDS.user',
])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .otherwise({redirectTo: '/dashboard'});
}])
    .directive('wrapInput', function() {
        return {
            require: 'ngModel',
            restrict: 'E',
            template: '<div class="form-group" >' +
            '<label class="col-md-4 control-label" for="{{ name }}" ng-transclude></label>' +
            '<div class="col-md-4">' +
            '<input id="{{ name }}-input" name={{ name }} ng-model="ngModel" class="form-control input-md" value="{{value}}"/>' +
            '</div>' +
            '</div>',
            scope: {
                ngModel: '=',
                name: '@name',
                value: '@value'
            },
            //replace: true,
            transclude: true,
            priority: 10
        };
    });
