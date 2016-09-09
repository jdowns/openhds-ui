var fw = require('./framework.js');

function PregnancyResultPage() {

    var resultType = fw.getElement('resultType');
    var childFirstName = fw.getElement('childFirstName_input');
    var childExtId = fw.getElement('childExtId_input');
    var childGender = fw.getElement('gender');
    var submit = fw.getElement("createButton");

    this.doCreate = function(values) {
        fw.selectOption(values.resultType);
        childFirstName.sendKeys(values.childFirstName);
        childExtId.sendKeys(values.childExtId);
        fw.selectOption(values.childGender);
        submit.click();
    };
}

exports.PregnancyResultPage = PregnancyResultPage;
