'use strict';

var LoginPage = require('./pages/loginPage.js').LoginPage;
var BaselinePage = require('./pages/baselinePage.js').BaselinePage;

var fw = require('./framework.js');
var getElement = fw.getElement;
var selectOption = fw.selectOption;

describe('OpenHDS workflows ', function() {

    beforeEach(function() {
        browser.get('/');
    });

    function login() {
        var loginPage = new LoginPage();
        loginPage.doLogin("user", "password");
    }

    it('Displays an error message if login is unsuccessful', function() {
        var loginPage = new LoginPage();
        loginPage.doLogin('bad', 'credentials');

        var usernameAfterLogin = loginPage.username.getAttribute('value');
        var passwordAfterLogin = loginPage.password.getAttribute('value');

        expect(usernameAfterLogin).toEqual('');
        expect(passwordAfterLogin).toEqual('');
    });

    it('Has only one active location', function() {
        login();

        var baselinePage = new BaselinePage();
        baselinePage.setCollectionDate('01-13-2016');
        baselinePage.setDefaultFieldWorker();
        baselinePage.setHierarchy();
        // create a new location
        // verify it's in the table
        // create a new location
        // verify it's the only one in the table
    });

    it('Can create an empty location', function() {
        // fill out baseline
        // create location
        // check empty box
        // click button
        // should be at new baseline page
    });

    it('Displays all selected social groups', function() {
        // fill out baseline
        // click social group
        // create socialgroup
        // select socialgroup
        // verify both are displayed on the table
        // delete both social groups
        // verify table is empty
    });

    it('Creates a baseline census', function() {
        // login with valid credentials
        // "next" button is disabled
        // fill out baseline form
        // push button
        // on new location page
        // "next" button is disabled
        // fill out location form
        // validate it's in the table
        // push button
        // "next" button is disabled
        // fill out social group form
        // validate it's in the table
        // push button
        // fill out individual form
        // validate it's in the table
        // fill out another individual form
        // validate form is empty first
        // validate it's in the table
        // push button
        // "next" button is *enabled*
        // fill out relationship form
        // push button
        // validate baseline page is visible and populated
    });

});
