module.exports = function(config){
  config.set({

    basePath : './',

    files : [
        'resources/public/app/bower_components/angular/angular.js',
        'resources/public/app/bower_components/angular-route/angular-route.js',
        'resources/public/app/bower_components/angular-mocks/angular-mocks.js',
        'test/framework.js',
        'resources/public/app/app.js',
        'resources/public/app/census/controller/*.js',
        'resources/public/app/auth/controller/*.js',
        'resources/public/app/update/controller/*.js',
        'resources/public/app/census/test/*.js',
        'resources/public/app/auth/test/*.js',
        'resources/public/app/auth/test/*.js',
        'resources/public/app/update/test/*.js',
        'test/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
