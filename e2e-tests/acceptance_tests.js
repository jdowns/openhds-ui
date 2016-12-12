'use strict';

var request = require('request');

function selectDropdownbyNum (element, optionNum) {
    element(by.tagName('option'))
        .then(function(options){
            options[optionNum].click();
        });
};

function LoginPage() {
    return {
        login: function(username, password) {
            var username_input = "username_input",
                password_input = "password_input",
                submit_button = "createButton";

            element(by.id(username_input)).sendKeys(username);
            element(by.id(password_input)).sendKeys(password);
            element(by.id(submit_button)).click();
        }
    };
}

function BaselineInitPage() {
    function openFieldWorkerModal() {
        var fieldWorkerSelectModal_button = "fieldworker-select";
        element(by.id(fieldWorkerSelectModal_button)).click();
        browser.sleep(1000);
    }

    function openHierarchySelectModal() {
        var hierarchySelect_button = "hierarchy-select";
        element(by.id(hierarchySelect_button)).click();
        browser.sleep(1000);
    }

    function openLocationTab() {
        var tab_xpath = '//*[@id="tree-root"]/ol/li/div/ol/li[1]/div/div/div/div[1]/a/span';
        element(by.xpath(tab_xpath)).click();

        tab_xpath = '//*[@id="tree-root"]/ol/li/div/ol/li[1]/div/ol/li[1]/div/div/div/div[1]/a/span';
        element(by.xpath(tab_xpath)).click();
    }

    return {
        setCollectionDate: function(collectionDate) {
            var date_input = "collectionDate_input";

            element(by.id(date_input)).sendKeys(collectionDate);
        },
        setFieldWorker: function(fieldworkerId) {
            var fieldWorkerSelect_button = fieldworkerId;
            openFieldWorkerModal();
            element(by.id(fieldWorkerSelect_button)).click();
            browser.sleep(1000); // Give dom time to hide elements. A timeout won't work yet https://github.com/angular/protractor/issues/2313
        },
        setRegion: function(region) {
            openHierarchySelectModal();
            openLocationTab();
            var region_xpath = '//*[@id="tree-root"]/ol/li/div/ol/li[1]/div/ol/li[1]/div/ol/li[1]/div/div/div/div[2]/a'; // region 0-1-1
            element(by.xpath(region_xpath)).click();
            browser.sleep(1000);

        },
        startLocation: function() {
            element(by.id("next")).click();
        }
    };
}

function BaselineLocationPage() {
    function openNewLocationModal() {
        element(by.id('displayNewLocationModal')).click();
    }

    browser.sleep(1000);
    var extId_input = 'locationExtId_input';
    return {
        openNewLocationModal: function() {
            openNewLocationModal();
            browser.sleep(1000);
        },
        getExternalId: function() {
            return element(by.id(extId_input)).getAttribute('value');
        },
        setExternalId: function(id) {
            var input = element(by.id(extId_input));
            input.clear();
            input.sendKeys(id);
        },
        setLocationName: function(name) {
            var locationName_input = 'locationName_input';
            element(by.id(locationName_input)).sendKeys(name);
        },
        setLocationType: function(typeNum) {
            var select = element(by.id('locationType_select'));
            selectDropdownbyNum(select, typeNum);
        },
        toggleEmptyLocation: function() {
            $('#emptyLocation').click();
        },
        closeLocationModelOK: function() {
            $('#createLocation').click();
            browser.sleep(1000);
        },
        completeEmptyBaseline: function() {
            $('#completeBaselineEmptyLocation').click();
            browser.sleep(1000);
        }

    };
}

describe('OpenHDS', function() {
    beforeEach(function() {
        browser.get('/');
        browser.driver.manage().window().setSize(1440, 900);
    });

    it('creates baseline with empty location', function() {

        /** Login **/
        var loginPage = new LoginPage();
        loginPage.login('user', 'password');

        expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/#!/baseline');

        /** Set up baseline **/
        var baselineInitPage = new BaselineInitPage();
        baselineInitPage.setCollectionDate('01-01-2016');
        baselineInitPage.setFieldWorker("fieldworker");
        baselineInitPage.setRegion();
        baselineInitPage.startLocation();
        expect($('#locationTab').isDisplayed()).toBeTruthy();

        /** Create empty location **/
        var baselineLocationPage = new BaselineLocationPage();
        baselineLocationPage.openNewLocationModal();
        expect(baselineLocationPage.getExternalId()).toMatch(/location-\d/);

        baselineLocationPage.setExternalId('empty-location-test');
        baselineLocationPage.setLocationName('an-empty-location');
        baselineLocationPage.setLocationType(0);
        baselineLocationPage.toggleEmptyLocation();
        baselineLocationPage.closeLocationModelOK();
        baselineLocationPage.completeEmptyBaseline();

        expect($('#collectionDate').isDisplayed()).toBeTruthy();
    });
});
