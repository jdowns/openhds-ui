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
            this.location.collectionDateTime = collectionDate;
        };

        this.Individual = function(collectionDate, data) {
            this.individual = {
                "collectedByUuid": this.fieldWorkerId,
                "individual": data
            }
            this.individual.collectionDate = collectionDate;
        };
    });

