//TODO: delete me
function dispatcher() {

    var state = {};
    var eventCallbacks = {};
    var dispatcher = {
        register: register,
        dispatch: dispatch,
        state: state,
        callbacks: eventCallbacks
    };

    return dispatcher;

    function register(event, f) {
        if (eventCallbacks[event] != undefined) {
            eventCallbacks[event].push(f);
        } else {
            eventCallbacks[event] = [f];
        }
    }

    function dispatch(event, value) {
        if (eventCallbacks[event] == undefined) {
            console.log("attempting to dispatch on undefined event: " + event);
        } else {
            state = eventCallbacks[event].reduce(
                function(state, f, k, fs) {
                    return f(state, value);
                },
                state
            );
        }
        return state;
    }
}

angular.module('openHDS.core').factory('dispatcher', dispatcher);
// module.exports = dispatcher();
