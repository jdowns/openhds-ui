angular.module('openhds')
    .directive('extidvalidator', extIdValidator);


function extIdValidator() {
    //var EXTID_REGEX = /[a-z]+-\d+-[a-z]+/;
    return {
        require: 'ngModel',
        link: function(_, _, _, controller) {
            controller.$validators.extidvalidator = function(modelValue, viewValue) {
                return true;
            };
        }
    };
}
