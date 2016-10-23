'use strict';


angular.module('AuditModule', [])
    .controller('AuditController',
        ['$rootScope',
            '$http',
            'LocationHierarchyService',
            'FieldWorkerService',
            'LocationService',
            'SocialGroupService',
            'IndividualService',
            'MembershipService',
            'RelationshipService',
            'ResidencyService',
            AuditController]);

function AuditController($rootScope,
                            $http,
                            LocationHierarchyService,
                            FieldWorkerService,
                            LocationService,
                            SocialGroupService,
                            IndividualService,
                            MembershipService,
                            RelationshipService,
                            ResidencyService) {


    var vm = this;







    vm.init = function() {

    };

    return vm;
}