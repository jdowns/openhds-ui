var fw = require('../framework.js');

function LocationModal() {
    this.setName = function(name) {
        var input = fw.getElement('locationName_input');
        input.sendKeys(name);
    };

    this.setExtId = function(extId) {
        var input = fw.getElement('locationExtId_input');
        input.sendKeys(extId);
    };

    this.setType = function(locType) {
        fw.selectOption(locType);
    };

    this.submit = function() {
        fw.click('createLocation');
        browser.sleep(2000);
    };
}

function LocationTab() {
    this.openCreateModal = function() {
        fw.click('displayNewLocationModal');
        browser.sleep(2000);
    };

    this.openSelectModal = function() {
        var button = fw.getElement('displaySelectLocationModal');
        button.click();
        //TODO: add id to this modal to wait for
    };

    this.completeRegistration = function() {
        fw.click('startSocialGroups');
        browser.sleep(2000);
        return new GroupTab();
    };

    this.selectedLocation = function() {
        return {};
    };
}

function GroupTab() {

}

function BaselinePage() {
    this.collectionDateInput = fw.getElement('collectionDate_input');
    this.fieldWorkerModalButton = fw.getElement('fieldworker-select');
    this.hierarchyModalButton = fw.getElement('hierarchy-select');
    this.newLocationModalButton = fw.getElement('displayNewLocationModal');
    this.nextButton = fw.getElement('next');
    this.newLocationButton = fw.getElement('createNewLocation');
    this.locationNameInput = fw.getElement('locationName_input');
    this.locationExtIdInput = fw.getElement('locationExtId_input');
    this.createLocationButton = fw.getElement('createLocation');

    this.goToSocialGroupButton = fw.getElement('startSocialGroups');
    this.socialGroupTab = fw.getElement('groupTab');
    this.createSocialGroupButton = fw.getElement('createSocialGroup');
    this.submitSocialGroupButton = fw.getElement('submitSocialGroup');

    this.goToIndividualsButton = fw.getElement('startIndividuals');
    this.goToRelationshipsButton = fw.getElement('startRelationships');

    this.setExternalId = function(id) {
        // set individual extId
        fw.getElement('extId_input').sendKeys(id);
    };

    this.setGender = function(gender) {
        fw.selectOption(gender);
    };

    this.setDob = function(dob) {
        fw.getElement('dateOfBirth_input').sendKeys(dob);
    };

    this.setIndividualFirstName = function(name) {
        fw.sendKeys('firstName_input', name);
    };

    this.setIndividualLastName = function(name) {
        fw.sendKeys('lastName_input', name);
    };

    this.setResidencyStartDate = function(startDate) {
        fw.sendKeys('residencyStartDate_input', startDate);
    };

    this.startAssignMemberships = function() {
        fw.click('assignMembership');
    };

    this.openLocationModal = function() {
        fw.click('displayNewLocationModal');
        browser.sleep(2000);
        return new LocationModal();
    };

    this.setCollectionDate = function(collectionDate) {
        this.collectionDateInput.sendKeys(collectionDate);
    };

    this.setDefaultFieldWorker = function() {
        fw.click('fieldworker-select');
        browser.sleep(2000);
        fw.click('fieldworker');
        browser.sleep(1000);
    };

    this.getCurrentFieldworker = function() {
        return fw.getElement('currentFieldworker').getAttribute('value');
    };

    this.setHierarchy = function() {
        fw.click('hierarchy-select');
        browser.sleep(2000);
        fw.selectOption('hierarchy-0');
        browser.sleep(100);
        fw.selectOption('hierarchy-0-1');
        browser.sleep(100);
        fw.selectOption('hierarchy-0-1-1');
        browser.sleep(100);
        fw.getElement('saveHierarchy').click();
    };

    this.getCurrentHierarchy = function() {
        return fw.getElement('currentHierarchy').getAttribute('value');
    };

    this.setLocationName = function(name) {
        fw.sendKeys('locationName_input', name);
    };

    this.setLocationExtId = function(extId) {
        fw.sendKeys('locationExtId_input', extId);
    };

    this.selectLocationType = function(locType) {
        fw.selectOption(locType);
    };

    this.getCurrentLocation = function() {
        return fw.getElement('currentLocationData').getText();
    };

    this.setGroupName = function(name) {
        fw.sendKeys('groupName_input', name);
    };

    this.setGroupExtId = function(extId) {
        fw.sendKeys('socialGroupExtId_input', extId);
    };

    this.selectGroupType = function(grpType) {
        fw.selectOption(grpType);
    };
}

exports.BaselinePage = BaselinePage;
