var fw = require('./framework.js');

exports.Page = function() {

    var pregnancyDate = fw.getElement('pregnancyDate_input');
    var deliveryDate = fw.getElement('expectedDeliveryDate_input');
    var submit = fw.getElement("createButton");

    this.doCreate = function(values) {
        pregnancyDate.sendKeys(values.pregnancyDate);
        deliveryDate.sendKeys(values.deliveryDate);

        submit.click();
    };
};
