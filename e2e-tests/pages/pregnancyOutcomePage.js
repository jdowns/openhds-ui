var fw = require('./framework.js');

function PregnancyOutcomePage() {
    var mother = fw.getElement('mother_input');
    var father = fw.getElement('father_input');
    var outcomeDate = fw.getElement('outcomeDate_input');
    var submit = fw.getElement("createButton");

    this.doCreate = function(values) {
        mother.sendKeys(values.mother);
        father.sendKeys(values.father);
        outcomeDate.sendKeys(values.date);
        submit.click();
    };
}

exports.PregnancyOutcomePage = PregnancyOutcomePage;
