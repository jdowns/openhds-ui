module.exports = function(config) {
    config.set({
        basePath : './',

        plugins : [
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-junit-reporter',
            'karma-jasmine'
        ],

        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-route/angular-route.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'app/index.js',
            'app/auth/controller/*.js',
            'app/auth/test/*.js',
            'app/domain/**/*.js',
            'test/*.js'
        ],

        frameworks: ['jasmine'],
        browsers: ['Chrome'],
        autoWatch: true,
        reporters: ['progress', 'junit'],

        junitReporter: {
            outputDir: '',
            outputFile: 'testresults.html',
            suite: 'unit',
            useBrowserName: true,
            nameFormatter: undefined,
            classNameFormatter: undefined,
            properties: {}
        }
    });
};
