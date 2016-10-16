var fw = require('../framework.js');

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
}

exports.BaselinePage = BaselinePage;
