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
        var button = fw.getElement('createLocation');
        button.click();
        browser.driver.wait(protractor.until.elementIsNotVisible(button));
    };
}

function LocationTab() {
    this.openCreateModal = function() {
        var button = fw.getElement('displayNewLocationModal');
        button.click();
        browser.driver.wait(protractor.until.elementIsVisible(fw.getElement('createLocation')));
    };

    this.openSelectModal = function() {
        var button = fw.getElement('displaySelectLocationModal');
        button.click();
        //TODO: add id to this modal to wait for
    };

    this.completeRegistration = function() {
        var button = fw.getElement('startSocialGroups');
        button.click();
        browser.driver.wait(protractor.until.elementIsVisible(fw.getElement('createSocialGroup')));
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
    }

    this.setGender = function(gender) {
        fw.selectOption(gender);
    }

    this.setDob = function(dob) {
        fw.getElement('dateOfBirth_input').sendKeys(dob);
    }

    this.setIndividualFirstName = function(name) {
        var input = fw.getElement('firstName_input');
	browser.sleep(2000);
        browser.driver.wait(protractor.until.elementIsVisible(input));
	input.sendKeys(name);
    }

    this.setIndividualLastName = function(name) {
        var input = fw.getElement('lastName_input');
	input.sendKeys(name);
    }

    this.setResidencyStartDate = function(startDate) {
        fw.getElement('residencyStartDate_input').sendKeys(startDate);
    }

    this.startAssignMemberships = function() {
        var button = fw.getElement('assignMembership');
	button.click()
        browser.driver.wait(protractor.until.elementIsNotVisible(button));
    }

    this.openLocationModal = function() {
        var openModalButton = fw.getElement('displayNewLocationModal');
        openModalButton.click();
        browser.driver.wait(protractor.until.elementIsVisible(fw.getElement('createLocation')));
        return new LocationModal();
    };

    this.setCollectionDate = function(collectionDate) {
        this.collectionDateInput.sendKeys(collectionDate);
    };

    this.setDefaultFieldWorker = function() {
        this.fieldWorkerModalButton.click();
        var fieldWorkerSelectButton = fw.getElement('fieldworker');
        browser.driver.wait(protractor.until.elementIsVisible(fieldWorkerSelectButton));
        fieldWorkerSelectButton.click();
        browser.sleep(1000);
    };

    this.getCurrentFieldworker = function() {
        return fw.getElement('currentFieldworker').getAttribute('value');
    };

    this.setHierarchy = function() {
        browser.driver.wait(protractor.until.elementIsNotVisible(fw.getElement('fieldworker')));
        this.hierarchyModalButton.click();
        browser.sleep(1000);
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
        var input = fw.getElement('locationName_input');
        browser.driver.wait(protractor.until.elementIsVisible(input));
        input.sendKeys(name);
    };

    this.setLocationExtId = function(extId) {
        var input = fw.getElement('locationExtId_input');
        browser.driver.wait(protractor.until.elementIsVisible(input));
        input.sendKeys(extId);
    };

    this.selectLocationType = function(locType) {
        fw.selectOption(locType);
    };

    this.getCurrentLocation = function() {
        return fw.getElement('currentLocationData').getText();
    };

    this.setGroupName = function(name) {
        var input = fw.getElement('groupName_input');
        browser.driver.wait(protractor.until.elementIsVisible(input));
        input.sendKeys(name);
    };

    this.setGroupExtId = function(extId) {
        var input = fw.getElement('socialGroupExtId_input');
        browser.driver.wait(protractor.until.elementIsVisible(input));
        input.sendKeys(extId);
    };

    this.selectGroupType = function(grpType) {
        fw.selectOption(grpType);
    };
}

exports.BaselinePage = BaselinePage;
