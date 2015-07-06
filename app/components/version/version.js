'use strict';

angular.module('openHDS.version', [
  'openHDS.version.interpolate-filter',
  'openHDS.version.version-directive'
])

.value('version', '0.1');
