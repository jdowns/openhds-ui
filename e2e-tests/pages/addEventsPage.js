var fw = require('../framework.js');

function AddEventsPage() {
    this.openIndividualSelectModal = function() {
        fw.pauseForBootstrap();
        fw.click('individual-select');
        fw.pauseForBootstrap();
    };

    this.selectIndividual = function(indId) {
        fw.click(indId);
        fw.click('choose-individual-button');
        fw.pauseForBootstrap();
    };

    this.completeVisit = function() {
        fw.click('complete-visit');
    };

    this.submitInMigration = function(data) {
        if(data.origin) {
            fw.getElement('origin_input').sendKeys(data.origin);
        }
        if(data.reason) {
            fw.getElement('reason_input').sendKeys(data.reason);
        }

        if (data.type === "internal") {
            fw.selectOption('internal');
            openSelectModal();

            fw.click('location-5-member');
            fw.pauseForBootstrap();
            fw.click('createInMigration');
        }

        fw.pauseForBootstrap();
    };

    function openSelectModal() {
        fw.click('individualSelect');
        fw.pauseForBootstrap();

    }
}

exports.AddEventsPage = AddEventsPage;
