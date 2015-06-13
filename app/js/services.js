'use strict';

/* Services */

var openhdsServices = angular.module('openhdsServices', ['ngResource']);

openhdsServices.factory('Service', ['$resource',
  function($resource){
    return $resource('/', {}, {
      query: {method:'GET', params:{}, isArray:true}
    });
  }]);
