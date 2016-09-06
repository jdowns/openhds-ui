var fw = require('./framework.js');

function CreateSocialGroupPage() {
    this.groupName = fw.getElement("groupName_input");
    this.externalId = fw.getElement("extId_input");
    this.groupType = fw.getElement("groupType_select");
    this.submit = fw.getElement("createButton");

    this.setGroupName = function(name) {
        this.groupName.sendKeys(name);
    };
    this.setExternalId = function(extId) {
        this.externalId.sendKeys(extId);
    };
    this.setGroupType = fw.selectOption;

    this.createGroup = this.submit.click;

    this.doCreateGroup = function(group) {
        this.setGroupName(group.name);
        this.setExternalId(group.extId);
        this.setGroupType(group.type);
        this.createGroup();
    };
}

exports.CreateSocialGroupPage = CreateSocialGroupPage;
