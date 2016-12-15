exports.config = {
    allScriptsTimeout: 20000,

    specs: [
	'acceptance_tests.js'
        //'scenarios.js'
        //'*.js'
    ],

    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://localhost:3000',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 60000
    }
};
