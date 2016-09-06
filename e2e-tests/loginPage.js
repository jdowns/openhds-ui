var fw = require('./framework.js');

function LoginPage() {
    this.username = fw.getElement("username_input");
    this.password = fw.getElement("password_input");
    this.submit = fw.getElement("createButton");

    this.validate = function() {
        return this;
    };

    this.setUsername = function(username) {
        this.username.sendKeys(username);
    };
    this.setPassword = function(password) {
        this.password.sendKeys(password);
    };
    this.doLogin = function(username, password) {
        this.setUsername(username);
        this.setPassword(password);
        this.login();
    };

    this.login = this.submit.click;
}

exports.LoginPage = LoginPage;
