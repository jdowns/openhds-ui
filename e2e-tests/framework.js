var EC = protractor.ExpectedConditions;

function getElement(id) {
    return element(by.id(id));
}

function selectOption(optionName) {
    element(by.cssContainingText('option', optionName)).click();
}

function waitForElementVisible(id, timeout) {
    if (!timeout) {
        timeout = 5000;
    }
    var e = getElement(id);
    browser.wait(
        EC.visibilityOf(e), timeout
    );
}

function isEnabled(id) {
    var e = getElement(id);
    return e.isEnabled();
}

function click(id) {
    getElement(id).click();
}

function waitForElementClickable(id, timeout) {
    if(!timeout) {
        timeout = 5000;
    }
    var e = getElement(id);
    browser.wait(EC.elementToBeClickable(e), timeout);
}


function waitForElementInvisible(id, timeout) {
    if (!timeout) {
        timeout = 5000;
    }
    var e = getElement(id);
    browser.wait(
        EC.visibilityOf(e), timeout
    );
}

function pauseForBootstrap() {
    browser.sleep(1000);
};

function sendKeys(id, data) {
    getElement(id).sendKeys(data);
}

exports.getElement = getElement;
exports.selectOption = selectOption;
exports.waitForElementVisible = waitForElementVisible;
exports.waitForElementInvisible = waitForElementInvisible;
exports.isEnabled = isEnabled;
exports.click = click;
exports.waitForElementClickable = waitForElementClickable;
exports.pauseForBootstrap = pauseForBootstrap;
exports.sendKeys = sendKeys;
