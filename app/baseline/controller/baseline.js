
function initTab(id) {
    $('id').click(function (e) {
        e.preventDefault();
        $('id').tab('show');
    });
}


angular.module('BaselineModule',
    [])



    .controller('BaselineController',
        [   '$rootScope','$http',
            'LocationHierarchyService',
            'FieldWorkerService',
            'LocationService',
            function($rootScope,
                     $http,
                     LocationHierarchyService,
                     FieldWorkerService,
                     LocationService) {
                var vm = this;
                var headers = { authorization: "Basic " + $rootScope.credentials };
                vm.selectedHierarchy = [];


                vm.saveFieldWorker = function() {
                    var result = vm.allFieldWorkers.filter(
                        function(fw) {
                            return fw.uuid === vm.currentFieldWorkerUuid;
                        });
                    vm.currentFieldWorker = result[0];
                };

                vm.saveLocationHierarchy = function() {
                    var parentIndex = vm.selectedHierarchy.length - 2;
                    var lastIndex = vm.selectedHierarchy.length - 1;

                    var parent = vm.selectedHierarchy[parentIndex];
                    var last = vm.selectedHierarchy[lastIndex];
                    var children = vm.locationHierarchies[parent];
                    vm.currentHierarchy = children.find(function(child) {
                        return child.uuid === last;
                    });
                };

                vm.availableHierarchies = function() {
                    var result = [];

                    vm.selectedHierarchy.forEach(function(h) {
                        result.push(vm.locationHierarchies[h]);
                    });
                    return result;
                };

                vm.init = function() {
                    var tabIds = ['#baselineTab', '#locationTab',
                        '#groupTab', '#individualsTab',
                        '#relationshipsTab'];

                    tabIds.map(initTab);

                    var fieldworkersUrl = $rootScope.restApiUrl + "/fieldWorkers/bulk.json";

                    var codesUrl = $rootScope.restApiUrl + "/projectCodes/bulk.json";


                    $http.get(codesUrl, {headers: headers})
                        .then(function(response) {
                            vm.codes = response.data;
                        });

                    FieldWorkerService.getAllFieldWorkers(function(fieldworkers) {
                        vm.allFieldWorkers = fieldworkers;
                    });

                    LocationHierarchyService.locationHierarchies(function(hierarchyTree) {
                        vm.locationHierarchies = hierarchyTree;
                    });
                    LocationHierarchyService.getLevels().then(function(response) {
                        vm.allHierarchyLevels = response.data;
                    });
                };


                function individualsSuccess(result) {
                    var memberhipsUrl = $rootScope.restApiUrl + "/memberships",
                        residenciesUrl = $rootScope.restApiUrl + "/residencies",
                        relationshipsUrl = $rootScope.restApiUrl + "/relationships";
                }

                function groupSuccess(result) {
                    var individualsUrl = $rootScope.restApiUrl + "/individuals";

                }

                function locationSuccess(result) {
                    var socialGroupsUrl = $rootScope.restApiUrl + "/socialGroups";
                }

                vm.submitVisit = function() {
                    LocationService.submit(vm, locationSuccess);
                };

                return vm;
            }]);
