angular.module('openHDS.model', [])
    .service('Model', function() {

        this.fieldWorkerId = "";
        this.locationHierarchyId = "";

        this.setFieldWorkerId = function(fieldWorkerId) {
            this.fieldWorkerId = fieldWorkerId;
        };

        this.setLocationHierarchyId = function(locationHierarchyId) {
            this.locationHierarchyId = locationHierarchyId;
        };

        this.Location = function(collectionDate, data) {

            this.location = {
                "collectedByUuid": this.fieldWorkerId,
                "locationHierarchyUuid": this.locationHierarchyId,
                "location": data
            };
            location.collectionDateTime = collectionDate;
        };

        this.Individual = function(collectionDate, binding) {
            this.collectionDate = collectionDate;
            this.collectedBy = this.fieldWorkerId;
            this.externalId = binding.externalId;
            this.gender = binding.gender;
            this.dateOfBirth = binding.dateOfBirth;
            this.firstName = binding.firstName;
        };
    });

