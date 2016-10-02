module.exports = function(config) {

    function getBrowser() {
        if (process.env.TRAVIS) {
            return ['Chrome_travis_ci'];
        }
        return ['Chrome'];
    }

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
        browsers: getBrowser(),
        autoWatch: true,
        reporters: ['progress', 'junit'],

        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },

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
