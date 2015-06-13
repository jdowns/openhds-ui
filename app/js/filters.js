'use strict';

/* Filters */

angular.module('openhdsFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});
