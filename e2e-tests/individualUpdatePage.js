var fw = require('./framework.js');

function IndividualUpdatePage() {
    this.outMigrationCheckbox = fw.getElement('outMigrationEvent');
    this.deathCheckbox = fw.getElement('deathEvent');
    this.pregnancyObservationCheckbox = fw.getElement('pregnancyObservationEvent');
    this.pregnancyOutcomeCheckbox = fw.getElement('pregnancyOutcomeEvent');
    this.submit = fw.getElement("createButton");

    this.doCreateVisit = function(visit) {
        if (visit.toggleOutMigration) {
            this.outMigrationCheckbox.click();
        }
        if (visit.toggleDeath) {
            this.deathCheckbox.click();
        }
        if (visit.togglePregnancyObservation) {
            this.pregnancyObservationCheckbox.click();
        }
        if (visit.togglePregnancyOutcome) {
            this.pregnancyOutcomeCheckbox.click();
        }

        this.submit.click();
    };
}

exports.IndividualUpdatePage = IndividualUpdatePage;
