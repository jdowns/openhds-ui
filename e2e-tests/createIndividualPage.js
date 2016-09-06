var fw = require('./framework.js');

function CreateIndividualsPage() {
    this.firstName = fw.getElement("firstName_input");
    this.externalId = fw.getElement("extId_input");
    this.gender = fw.getElement("gender_select");
    this.membbershipStartType = fw.getElement("membershipStartType_select");
    this.membershipStartDate = fw.getElement("membershipStartDate_input");
    this.residencyStartType = fw.getElement("residencyStartType_select");
    this.residencyStartDate = fw.getElement("residencyStartDate_input");
    this.submit = fw.getElement("createButton");
    this.more = fw.getElement("moreIndividuals_check");

    this.setFirstName = function(name) {
        this.firstName.clear();
        this.firstName.sendKeys(name);
    };
    this.setExternalId = function(extId) {
        this.externalId.clear();
        this.externalId.sendKeys(extId);
    };
    // TODO: make this particular to the one select...
    this.setGender = fw.selectOption;
    this.setMembershipStartType = fw.selectOption;
    this.setResidencyStartType = fw.selectOption;
    this.setMembershipStartDate = function(date) {
        this.membershipStartDate.clear();
        this.membershipStartDate.sendKeys(date);
    };
    this.setResidencyStartDate = function(date) {
        this.residencyStartDate.clear();
        this.residencyStartDate.sendKeys(date);
    };
    this.clickMoreIndividuals = function() {
        this.more.click();
    };
    this.createIndividual = this.submit.click;

    this.doCreateIndividual = function(individual) {
        this.setFirstName(individual.firstName);
        this.setExternalId(individual.extId);
        this.setGender(individual.gender);
        this.setMembershipStartType(individual.membershipStartType);
        this.setMembershipStartDate(individual.membershipStartDate);
        this.setResidencyStartType(individual.residencyStartType);
        this.setResidencyStartDate(individual.residencyStartDate);
        if (individual.toggleMore) {
            this.clickMoreIndividuals ();
        }
        this.createIndividual();
    };

}

exports.CreateIndividualsPage = CreateIndividualsPage;
