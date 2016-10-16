var fw = require('../framework.js');

function BaselinePage() {
    this.collectionDateInput = fw.getElement('collectionDate_input');
    this.fieldWorkerModalButton = fw.getElement('fieldworker-select');
    this.hierarchyModalButton = fw.getElement('hierarchy-select');
    this.nextButton = fw.getElement('next');
    this.newLocationButton = fw.getElement('createNewLocation');
    this.locationNameInput = fw.getElement('locationName_input');
    this.extIdInput = fw.getElement('locationExtId_input');
    this.createLocationButton = fw.getElement('createLocation');

    this.setCollectionDate = function(collectionDate) {
        this.collectionDateInput.sendKeys(collectionDate);
    };

    this.setDefaultFieldWorker = function() {
        this.fieldWorkerModalButton.click();
        browser.sleep(1000);
        fw.getElement('fieldworker').click();
        browser.sleep(1000);
    };

    this.getCurrentFieldworker = function() {
        return fw.getElement('currentFieldworker').getAttribute('value');
    };

    this.setHierarchy = function() {
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
        fw.getElement('locationName_input').sendKeys(name);
    };

    this.setLocationExtId = function(extId) {
        fw.getElement('locationExtId_input').sendKeys(extId);
    };

    this.selectLocationType = function(locType) {
        fw.selectOption(locType);
    };

    this.getCurrentLocation = function() {
        return fw.getElement('currentLocationData').getText();
    };
}

exports.BaselinePage = BaselinePage;
