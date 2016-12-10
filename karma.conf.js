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
            'karma-coverage',
            'karma-jasmine',
            'karma-threshold-reporter'
        ],

        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-route/angular-route.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/i18next/i18next.js',
            'node_modules/angular-ui-tree/dist/angular-ui-tree.js',
            'node_modules/angular-smart-table/dist/smart-table.js',
            'node_modules/angular-sanitize/angular-sanitize.js',
            'node_modules/ng-i18next/dist/ng-i18next.js',
            'app/index.js',
            'app/update/**/*.js',
            'app/baseline/**/*.js',
            'app/audit/**/*.js',
            'app/auth/controller/*.js',
            'app/auth/test/*.js',
            'app/domain/**/*.js',
            'test/*.js'
        ],

        frameworks: ['jasmine'],
        browsers: getBrowser(),
        autoWatch: true,
        reporters: ['progress', 'junit', 'coverage', 'threshold'],

        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },

        preprocessors: {
            'app/**/*.js': ['coverage']
        },

        // optionally, configure the reporter
        coverageReporter: {
            type : 'html',
            dir : 'coverage/'
        },

        junitReporter: {
            outputDir: '',
            outputFile: 'testresults.html',
            suite: 'unit',
            useBrowserName: true,
            nameFormatter: undefined,
            classNameFormatter: undefined,
            properties: {}
        },

        thresholdReporter: {
            statements: 80,
            branches: 80,
            functions: 80,
            lines: 80
        }
    });
};
