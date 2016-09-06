var fw = require('./framework.js');

function IndividualUpdatePage() {
    this.outMigrationCheckbox = fw.getElement('outMigration');
    this.deathCheckbox = fw.getElement('death');
    this.pregnancyObservationCheckbox = fw.getElement('pregnancyObservation');
    this.pregnancyOutcomeCheckbox = fw.getElement('pregnancyOutcome');
    this.submit = fw.getElement("createButton");

    this.doCreateVisit = function(visit) {
        if (visit.toggleOutMigration) {
            this.outMigrationCheckbox.click();
        }
        if (visit.toggleDeath) {
            this.deathCheckbox.click();
        }
        if (visit.togglePregnancyObservation) {
            this.pregnancyObservation.click();
        }
        if (visit.togglePregnancyOutcome) {
            this.pregnancyOutcome.click();
        }

        this.submit.click();
    };
}

exports.IndividualUpdatePage = IndividualUpdatePage;
