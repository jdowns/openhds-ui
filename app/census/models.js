angular.module('openHDS.model', [])
    .service('Model', function() {

        /* For mocking during tests to prevent
        *  millisecond boundary errors
        */
        this.fieldWorkerId = "";
        this.setFieldWorkerId = function(fieldWorkerId) {
            this.fieldWorkerId = fieldWorkerId;
        };

        this.Location = function(collectionDate, binding) {
            this.collectionDate = collectionDate;
            this.collectedBy = this.fieldworkerId;
            this.externalId = binding.externalId;
            this.name = binding.name;
            this.locationType = binding.locationType;
            this.parent = binding.parent;
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

