var fw = require('./framework.js');

function CreateLocationPage() {
    this.locationName = fw.getElement("locationName_input");
    this.externalId = fw.getElement("extId_input");
    this.locationType = fw.getElement("locationType_select");
    this.submit = fw.getElement("createButton");

    this.setLocationName = function(name) {
        this.locationName.sendKeys(name);
    };
    this.setExternalId = function(extId) {
        this.externalId.sendKeys(extId);
    };
    this.setLocationType = fw.selectOption;

    this.createLocation = this.submit.click;

    this.doCreateLocation = function(location) {
        this.setLocationName(location.name);
        this.setExternalId(location.extId);
        this.setLocationType(location.type);
        fw.selectOption(location.path[0]);
        fw.selectOption(location.path[1]);
        fw.selectOption(location.path[2]);
        fw.selectOption(location.path[3]);
        this.createLocation();
    };
}

exports.CreateLocationPage = CreateLocationPage;
