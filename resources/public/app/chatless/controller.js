angular.module('openHDS.view')
    .controller('ChatLessController',
                '$location', '$http', ChatLessController);

var submitRequest = {
    fieldWorkerId: '',
    collectionDateTime, '',
    location: {
        name: '',
        extId, '',
        type, ''
    },
    socialGroup: {

    },
    individuals:[
        {},
        {}
    ],
    relationships:[
        {},
        {}
    ]
};

function getProjectCodes(http) {

}

/* Create new location data */
function ChatLessController($location, $http) {
    var viewModel = this;
    var states = ["newLocation",
                  "newSocialGroup",
                  "newIndividual",
                  "newRelationships",
                  "submitRequest"];

    viewModel.state = 0;
    viewModel.request = {};
    viewModel.loadData = function() {
        // load backend data here...
    };

    viewModel.nextState = function() {
        // increment state
    };
}
