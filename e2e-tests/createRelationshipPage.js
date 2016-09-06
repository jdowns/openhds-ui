var fw = require('./framework.js');

function CreateRelationshipPage() {
    this.individualB = fw.getElement("individualB_input");
    this.relationshipType = fw.getElement("relationshipType_select");
    this.startDate = fw.getElement("startDate_input");
    this.submit = fw.getElement("createButton");

    this.setIndividualB = function(individualId) {
        //TODO: this should be a select
        this.individualB.clear();
        this.individualB.sendKeys(individualId);
    };

    this.selectRelationshipType = fw.selectOption;
    this.setStartDate = function(date) {
        this.startDate.clear();
        this.startDate.sendKeys(date);
    };
    this.createRelationship = this.submit.click;

    this.doCreateRelationship = function(relationship) {
        this.setIndividualB(relationship.individualB);
        this.selectRelationshipType(relationship.type);
        this.setStartDate(relationship.startDate);
        this.createRelationship();
    };
}

exports.CreateRelationshipPage = CreateRelationshipPage;
