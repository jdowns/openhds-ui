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
    })
    .service('domainModels', Models);

function Models() {
    this.Location = Location;
}

function Location() {
        this.uuid = null;
}

        //uuid (string, optional),
        //    voidBy (User, optional),
        //    voidReason (string, optional),
        //    voidDate (ZonedDateTime, optional),
        //    insertBy (User, optional),
        //    insertDate (ZonedDateTime, optional),
        //    lastModifiedBy (User, optional),
        //    lastModifiedDate (ZonedDateTime, optional),
        //    status (string, optional),
        //    collectedBy (FieldWorker, optional),
        //    collectionDateTime (ZonedDateTime, optional),
        //    statusMessage (string, optional),
        //    extId (string, optional),
        //    name (string, optional),
        //    type (string, optional),
        //    longitude (string, optional),
        //    latitude (string, optional),
        //    accuracy (string, optional),
        //    altitude (string, optional),
        //    locationHierarchy (LocationHierarchy, optional),
        //    buildingNumber (string, optional),
        //    floorNumber (string, optional),
        //    regionName (string, optional),
        //    provinceName (string, optional),
        //    subDistrictName (string, optional),
        //    districtName (string, optional),
        //    sectorName (string, optional),
        //    localityName (string, optional),
        //    communityName (string, optional),
        //    communityCode (string, optional),
        //    mapAreaName (string, optional),
        //    description (string, optional)
