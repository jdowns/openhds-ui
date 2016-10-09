'use strict';

angular.module('openhds')

    .service('LocationService',
             ['$rootScope', '$http', '$q',
              function($rootScope, $http, $q) {
                  var service = this;

                  function Request(model) {
                      return {
                          collectedByUuid: model.currentFieldworker.uuid,
                          locationHierarchyUuid: model.currentHierarchy.uuid,
                          location: {
                              name: model.location.name,
                              extId: model.location.extId,
                              type: model.location.type,
                              collectionDateTime: model.collectionDateTime
                          }
                      };
                  }

                  function getHeaders() {
                      return {
                          headers: {
                              authorization: "Basic " + $rootScope.credentials
                          }
                      };
                  }

                  service.getByHierarchy = function(hierarchyUuid) {
                      var url = $rootScope.restApiUrl + "/locations.json" + '?locationHierarchyUuid=' + hierarchyUuid;
                      var locationsPromise = $http.get(url, getHeaders());

                      return $q(function(resolve, reject) {
                          locationsPromise.then(
                              function(response) {
                                  var locations = response.data.content.map(
                                      function(loc) {
                                          return {
                                              description: loc.description,
                                              extId: loc.extId,
                                              type: loc.type,
                                              uuid: loc.uuid,
                                              name: loc.name
                                          };
                                      });
                                  resolve(locations);
                              }
                          );
                      });
                  };

                  service.submit = function (model, callback) {
                      var url = $rootScope.restApiUrl + "/locations";
                      var request = Request(model);
                      $http.post(url, request, getHeaders()).then(function (response) {
                          callback(response.data);
                      });
                  };

                  return service;
              }]);
