function getElement(id) {
    return element(by.id(id));
}

function selectOption(optionName) {
    element(by.cssContainingText('option', optionName)).click();
}

exports.getElement = getElement;
exports.selectOption = selectOption;
